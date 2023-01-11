const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, (Date.now() + file.originalname).replace(/\s/g, ''))
  }
})

const upload = multer({ storage: storage })

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const profilepic = req.body.profilepic;
  const defaultpic = req.body.defaultpic;

  const queryText = `INSERT INTO "user" (username, password, email, profilepic, defaultpic)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, email, profilepic, defaultpic])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//Edit user info
router.put('/', rejectUnauthenticated, (req, res) => {
  //console.log('in put request');
  //console.log('req.user is', req.user);
  const email = req.body.email;
  const linkedin = req.body.linkedin;
  const website = req.body.website;

  const queryText =
    `UPDATE "user"
  SET "email" = $1, "linkedin" = $2, "website" = $3
  WHERE "id" = $4`;
  pool.query(queryText, [email, linkedin, website, req.user.id])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('Error with put request', err);
      res.sendStatus(500);
    })
});

//upload drawing post
router.post('/upload/post', upload.single('drawing'), rejectUnauthenticated, (req, res) => {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file);
  console.log('req.user is', req.user)
  if (req.file) {
    const newPath = './' + req.file.path.slice(7);
    console.log(newPath);
    console.log("Uploaded drawing post");
    console.log("Now adding to posts");
    const queryText =
      `INSERT INTO "posts" ("path", "post_type")
    VALUES ($1, $2)
    RETURNING id;`;
    pool.query(queryText, [newPath, 'post'])
      .then(result => {
        const newPostId = result.rows[0].id;
        const queryText2 = `INSERT INTO "users_posts" ("user_id", "posts_id", "action_type")
      VALUES ($1, $2, $3)`;
        pool.query(queryText2, [req.user.id, newPostId, 'post'])
          .then(result => {
            //location.href('/#/feed');
            res.sendStatus(204);
          }).catch(err => {
            console.log('error in second query', err);
            res.sendStatus(500)
          })
      }).catch(err => {
        console.log('error in first query', err);
        res.sendStatus(500)
      })
    // Refresh the page
    // res.redirect("back");

  } else {
    console.log("Failed to upload drawing");
    res.sendStatus(500);
  }
});

//upload post reply (drawing)

router.post('/upload/drawingreply', upload.single('drawing'), rejectUnauthenticated, (req, res) => {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log('req.body of upload reply is', req.body);
  console.log(req.file);
  console.log('req.user is', req.user)
  if (req.file) {
    const newPath = './' + req.file.path.slice(7);
    console.log(newPath);
    console.log("Uploaded drawing reply");
    console.log("Now adding to posts");
    const queryText =
      `INSERT INTO "posts" ("path", "post_type")
    VALUES ($1, $2)
    RETURNING id;`;
    pool.query(queryText, [newPath, 'reply'])
      .then(result => {
        console.log('In the second query now');
        const newPostId = result.rows[0].id;
        const queryText2 = `INSERT INTO "users_posts" ("user_id", "posts_id", "action_type", "reply_to")
        VALUES ($1, $2, $3, $4)`;
        pool.query(queryText2, [req.user.id, newPostId, 'post', req.body.posts_id])
          .then(result => {
            console.log('both queries worked');
            //location.href('/#/feed');
            res.sendStatus(204);
          }).catch(err => {
            console.log('error in second query', err);
            res.sendStatus(500)
          })
      }).catch(err => {
        console.log('error in first query', err);
        res.sendStatus(500)
      })
    // Refresh the page
    // res.redirect("back");

  } else {
    console.log("Failed to upload drawing");
    res.sendStatus(500);
  }
});


//upload profile pic
router.post('/upload/profilepic', upload.single('pic'), rejectUnauthenticated, (req, res) => {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file);
  console.log('req.user is', req.user)
  if (req.file) {
    const newPath = './' + req.file.path.slice(7);
    console.log(newPath);
    console.log("Uploaded profile pic");
    console.log("Now updating user info");
    const queryText =
      `UPDATE "user"
    SET "profilepic" = $1
    WHERE "id" = $2;`
    pool.query(queryText, [newPath, req.user.id])
      .then(result => {
        res.sendStatus(200);
      }).catch(err => {
        console.log('error in user router adding profile pic', err);
        res.sendStatus(500)
      })
    // Refresh the page
    // res.redirect("back");

  } else {
    console.log("Failed to upload profile pic");
    res.sendStatus(500);
  }
});

//reset profile pic
router.put('/profilepic', rejectUnauthenticated, (req, res) => {
  const queryText =
    `UPDATE "user"
    SET "profilepic" = $1
    WHERE "id" = $2;`
  pool.query(queryText, ['./images/profilepics/default.svg', req.user.id])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('error in user router updating profile pic', err);
      res.sendStatus(500)
    })
})
module.exports = router;