const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // GET route code here
    const queryText = `SELECT * FROM `;
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows)
      }).catch((error) => {
        console.log('There is an error in BOOKINGS ROUTER GET request', error);
        res.sendStatus(500);
      });
  });

  module.exports = router