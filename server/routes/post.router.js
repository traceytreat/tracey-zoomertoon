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
  ORDER BY "posts"."id" DESC;`;

  pool.query(queryText).then((results) => {
    // console.log('query GET results from DB:', results)
    res.send(results.rows);
  }).catch((err) => {
    console.log('error getting posts from DB', err);
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
