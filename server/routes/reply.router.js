const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET all replies for a specific post
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in reply router');
    const queryText =
        `SELECT "users_posts"."posts_id", "users_posts"."user_id", "posts"."path", "posts"."text", "posts"."loves", "posts"."date", "user"."username", "user"."admin", "user"."profilepic", "user"."defaultpic" FROM "users_posts"
    JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
    JOIN "user" ON "users_posts"."user_id" = "user"."id"
    WHERE "posts"."post_type" = 'reply'
    AND "users_posts"."action_type" = 'post'
    AND "users_posts"."reply_to" = $1
    ORDER BY "users_posts"."posts_id" DESC;`;

    pool.query(queryText, [req.params.id]).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting replies from DB', err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('req.body is', req.body);
    //const postFormat = (req.body.path ? req.body.path : req.body.text);
    const addPostQuery = req.body.path ? `
    INSERT INTO "posts" ("path", "post_type")
    VALUES ($1, $2)
    RETURNING "id";` : `
    INSERT INTO "posts" ("text", "post_type")
    VALUES ($1, $2)
    RETURNING "id";`
    pool.query(addPostQuery, [req.body.text, 'reply'])
      .then(result => {
        console.log('new post id:', result.rows[0].id);
        const newPostId = result.rows[0].id;
  
        const usersPostsQuery = `
      INSERT INTO "users_posts" ("user_id", "posts_id", "action_type", "reply_to")
      VALUES ($1, $2, $3, $4);
      `;
        pool.query(usersPostsQuery, [req.body.user_id, newPostId, 'post', req.body.posts_id]).then(result => {
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

module.exports = router;