const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all replies for a specific post
router.get('/:id', (req, res) => {
    console.log('in reply router');
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

module.exports = router;