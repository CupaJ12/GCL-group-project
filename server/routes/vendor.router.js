const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('in vendor post with: ', req.body.vendorName);
    if (req.isAuthenticated()) {
      const queryText = `INSERT INTO "vendor" (name)
      VALUES ($1);`;
      pool.query(queryText, [req.body.vendorName])
      .then(() => res.sendStatus(201))
      .catch((err) => {
          res.sendStatus(500);
      });
    } else {
      res.sendStatus(403);
    }
  });

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const queryText = 'SELECT * FROM "vendor" ORDER BY "name" ASC;';
      pool.query(queryText)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(403);
    }
  });

  module.exports = router;