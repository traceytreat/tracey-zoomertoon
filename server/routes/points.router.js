const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    const queryText =
      `SELECT COUNT(*) FROM "users_posts" 
    WHERE "users_posts"."action_type" = 'post'
    AND "users_posts"."user_id" = $1;`
  
    pool.query(queryText, [req.params.id]).then((results) => {
      //console.log('query points GET results from DB:', results.rows)
      res.send(results.rows);
    }).catch((err) => {
      console.log('error getting points from DB', err);
      res.sendStatus(500);
    })
  
  })

module.exports = router;