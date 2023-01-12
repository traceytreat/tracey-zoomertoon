const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// get all awards
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText =
        `SELECT * FROM "awards";`

    pool.query(queryText).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting awards from DB', err);
        res.sendStatus(500);
    })

})

// get users awards
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req params id is', req.params.id);
    const queryText =
        `SELECT * FROM "users_awards"
        JOIN "awards" on "users_awards"."awards_id" = "awards"."id"
        WHERE "user_id" = $1;`

    pool.query(queryText, [req.params.id]).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting specific user\'s awards from DB', err);
        res.sendStatus(500);
    })

})

// post into users awards
router.post('/:id', rejectUnauthenticated, (req, res) => {
    const queryText =
        `INSERT INTO "users_awards" ("user_id", "awards_id")
        VALUES ($1, $2);`
    pool.query(queryText, [req.params.id, req.body.awards_id]).then((results) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log('error posting awards into DB', err);
        res.sendStatus(500);
    })

})

module.exports = router;