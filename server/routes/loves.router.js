const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// add a love
router.post('/', (req, res) => {
    //console.log('req.body for post is', req.body);
    const queryText = `
    INSERT INTO "users_posts" ("user_id", "posts_id", "action_type")
      VALUES ($1, $2, $3);`
    pool.query(queryText, [req.body.user_id, req.body.posts_id, 'love'])
        .then(result => {
            const queryText2 = `
            UPDATE "posts"
            SET "loves" = "loves" + 1
            WHERE "id" = $1;`
            pool.query(queryText2, [req.body.posts_id])
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

});

// remove a love
router.delete('/:id/:postid', (req, res) => {
    //console.log('req.params for delete is', req.params);
    const queryText = `
    DELETE FROM "users_posts"
      WHERE "user_id" = $1
      AND "posts_id" = $2`
    pool.query(queryText, [req.params.id, req.params.postid])
        .then(result => {
            const queryText2 = `
            UPDATE "posts"
            SET "loves" = "loves" - 1
            WHERE "id" = $1;`
            pool.query(queryText2, [req.params.postid])
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

});

// select all posts/replies that a user has loved
router.get('/:id', (req, res) => {
    //console.log('user id in get is', req.params.id);
    const queryText = `
    SELECT "users_posts"."posts_id"  FROM "users_posts" --get the post id
    JOIN "posts" ON "users_posts"."posts_id" = "posts"."id"
    WHERE "users_posts"."action_type" = 'love'
    AND "users_posts"."user_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log(result);
            res.send(result.rows);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

// get all the posts made by a user (this is used for calculating the total points)
router.get('/user/:id', (req, res) => {
    const queryText =
        `SELECT "users_posts"."posts_id" FROM "users_posts" 
    WHERE "users_posts"."action_type" = 'post'
    AND "users_posts"."user_id" = $1;`

    pool.query(queryText, [req.params.id]).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting users posts from DB', err);
        res.sendStatus(500);
    })

})
module.exports = router;