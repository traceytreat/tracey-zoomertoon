const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for getting posts for the main feed
 */
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "posts" WHERE "post_type" = 'post';`;

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
