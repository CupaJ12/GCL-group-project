const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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