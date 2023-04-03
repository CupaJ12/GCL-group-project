const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    console.log('in property router: ', req.body);
    if (req.isAuthenticated()) {
        const queryText = `INSERT INTO "property" (name, address) VALUES ($1, $2);`;
        pool.query(queryText, [req.body.propertyName, req.body.propertyAddress])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;