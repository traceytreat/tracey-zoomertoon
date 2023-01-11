const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// get all loves made by all users (used for calculating points)
router.get('/', rejectUnauthenticated, (req, res) => {
    //console.log('in get all the loves made by all users');
    const queryText =
        `SELECT "users_posts"."posts_id" FROM "users_posts" 
        WHERE "users_posts"."action_type" = 'love';`

    pool.query(queryText).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting users posts from DB', err);
        res.sendStatus(500);
    })

})

module.exports = router;