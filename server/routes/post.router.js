const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for getting posts for the main feed
 */
router.get('/', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "posts"."path", "posts"."text", "posts"."flagged", "users_posts"."user_id", "user"."username", "user"."admin", "posts"."date" FROM "users_posts" 
  JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
  JOIN "user" ON "users_posts"."user_id" = "user"."id"
  WHERE "posts"."post_type" = 'post' 
  AND "users_posts"."action_type" = 'post'
  ORDER BY "posts"."id" DESC;`;

  pool.query(queryText).then((results) => {
    // console.log('query GET results from DB:', results)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting posts from DB', err);
    res.sendStatus(500);
  })
});

// GET specific post from post id
router.get('/:id', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "users_posts"."user_id", "posts"."path", "posts"."text", "posts"."loves", "posts"."date", "user"."username", "user"."admin", "user"."profilepic", "user"."defaultpic" FROM "users_posts" 
  JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
  JOIN "user" ON "users_posts"."user_id" = "user"."id"
  WHERE "users_posts"."posts_id" = $1;`;

  pool.query(queryText, [req.params.id]).then((results) => {
    // console.log('query GET results from DB:', results)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting specific post from DB', err);
    res.sendStatus(500);
  })
});

// GET all replies for a specific post
router.get('/replies/:id', (req, res) => {
  const queryText =
    `SELECT "users_posts"."posts_id", "users_posts"."user_id", "posts"."path", "posts"."text", "posts"."loves", "posts"."date", "user"."username", "user"."admin", "user"."profilepic", "user"."defaultpic" FROM "users_posts"
  JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
  JOIN "user" ON "users_posts"."user_id" = "user"."id"
  WHERE "posts"."post_type" = 'reply'
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;