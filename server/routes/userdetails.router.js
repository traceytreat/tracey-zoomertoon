const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all replies for a specific post
router.get('/:id', (req, res) => {
    console.log('in userdetails router');
    const queryText =
        `SELECT * FROM "user"
    WHERE "user"."id" = $1;`

    pool.query(queryText, [req.params.id]).then((results) => {
        // console.log('query GET results from DB:', results)
        res.send(results.rows);
    }).catch((err) => {
        console.log('error getting user details from DB', err);
        res.sendStatus(500);
    })
});

module.exports = router;