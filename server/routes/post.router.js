const express = require('express');
const pool = require('../modules/pool');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s/g, ''))
  }
})

const upload = multer({ storage: storage })
const router = express.Router();

/**
 * GET route for getting posts for the main feed
 */
router.get('/', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "posts"."path", "posts"."text", "posts"."flagged", "users_posts"."user_id", "user"."username", "user"."profilepic", "user"."defaultpic", "user"."admin", "posts"."date" FROM "users_posts" 
  JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
  JOIN "user" ON "users_posts"."user_id" = "user"."id"
  WHERE "posts"."post_type" = 'post' 
  AND "users_posts"."action_type" = 'post'
  ORDER BY "posts"."id" DESC;`;

  pool.query(queryText).then((results) => {
    //console.log('query GET results from DB:', results.rows)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting posts from DB', err);
    res.sendStatus(500);
  })
});

// get all flagged posts
router.get('/admin', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "users_posts"."user_id", "users_posts"."reply_to", "posts"."path", "posts"."text", "posts"."post_type", "user"."username", "posts"."date"  FROM "users_posts"
    JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
    JOIN "user" ON "users_posts"."user_id" = "user"."id"
    WHERE "posts"."flagged" = true
    ORDER BY "posts"."id" DESC;`;

  pool.query(queryText).then((results) => {
    // console.log('query GET results from DB:', results)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting flagged posts from DB', err);
    res.sendStatus(500);
  })
});

// GET specific post from post id
router.get('/:id', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "users_posts"."user_id", "posts"."path", "posts"."text", "posts"."loves", "posts"."date", "user"."username", "user"."admin", "user"."profilepic", "user"."defaultpic" FROM "users_posts" 
  JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
  JOIN "user" ON "users_posts"."user_id" = "user"."id"
  WHERE "users_posts"."posts_id" = $1
  AND "users_posts"."action_type" = 'post';`

  pool.query(queryText, [req.params.id]).then((results) => {
    // console.log('query GET results from DB:', results)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting specific post from DB', err);
    res.sendStatus(500);
  })
});

// GET all posts by a specific user
router.get('/user/:id', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "users_posts"."user_id", "posts"."path", "posts"."text", "posts"."post_type", "user"."username", "posts"."date", "users_posts"."reply_to" FROM "users_posts" 
  JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
  JOIN "user" ON "users_posts"."user_id" = "user"."id"
  WHERE "users_posts"."action_type" = 'post'
  AND "users_posts"."user_id" = $1
  ORDER BY "posts"."id" DESC;`;

  pool.query(queryText, [req.params.id]).then((results) => {
    // console.log('query GET results from DB:', results)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting users posts from DB', err);
    res.sendStatus(500);
  })

})

/**
 * POST route for adding a post
 */
router.post('/', (req, res) => {
  console.log('req.body is', req.body);
  const postFormat = (req.body.path ? req.body.path : req.body.text);
  const addPostQuery = req.body.path ? `
  INSERT INTO "posts" ("path", "post_type")
  VALUES ($1, $2)
  RETURNING "id";` : `
  INSERT INTO "posts" ("text", "post_type")
  VALUES ($1, $2)
  RETURNING "id";`
  pool.query(addPostQuery, [postFormat, req.body.post_type])
    .then(result => {
      console.log('new post id:', result.rows[0].id);
      const newPostId = result.rows[0].id;

      const usersPostsQuery = `
    INSERT INTO "users_posts" ("user_id", "posts_id", "action_type")
    VALUES ($1, $2, $3);
    `;
      pool.query(usersPostsQuery, [req.body.user_id, newPostId, 'post']).then(result => {
        res.sendStatus(201);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })

});

/**
 * POST route for uploading a picture
 */
router.post('/upload', upload.single('drawing'), (req, res) => {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file);
  if (req.file) {
    console.log("Uploaded");
    // Refresh the page
    // res.redirect("back");
    res.sendStatus(204).end();
  } else {
    console.log("Failed");
    res.send("failed");
  }

});

// delete a post
router.delete('/:id', (req, res) => {
  console.log('in router delete');
  console.log('req.params.id is', req.params.id);
  const deleteQuery = 
  `DELETE FROM "users_posts"
  WHERE "posts_id" = $1`;
  pool.query(deleteQuery, [req.params.id])
  .then(result => {
    const deleteQuery2 =
    `DELETE FROM "posts"
    WHERE "id" = $1`;
    pool.query(deleteQuery2, [req.params.id])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

// add flag
router.put('/flag/:id', (req, res) => {
  console.log('in router put');
  console.log('req.params.id is', req.params.id);
  const flag = (req.body.action == 'remove' ? false : true);
  console.log('flag value is', flag);
  const queryText = 
  `UPDATE "posts"
  SET "flagged" = $1
  WHERE "id" = $2`;
  pool.query(queryText, [flag, req.params.id])
  .then(result => {
    res.sendStatus(200);
  }).catch(err => {
    console.log('Error with put request', err);
    res.sendStatus(500);
  })
})

module.exports = router;
