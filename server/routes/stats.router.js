const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET all stats for a specific user
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in stats router');
    const queryText =
        `SELECT COUNT(*), CAST("posts"."date" AS DATE) FROM "users_posts"
        JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
        JOIN "user" ON "users_posts"."user_id" = "user"."id"
        WHERE "users_posts"."action_type" = 'post'
        AND "user"."id" = $1
        AND CAST("posts"."date" AS DATE) > current_date - interval '7 days'
        GROUP BY CAST("posts"."date" AS DATE)
        ORDER BY CAST("posts"."date" AS DATE) ASC;`;

    pool.query(queryText, [req.params.id]).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting stats from DB', err);
        res.sendStatus(500);
    })
});

module.exports = router;