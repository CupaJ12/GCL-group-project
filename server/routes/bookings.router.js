const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // GET route code here
  const queryText =
    `SELECT * FROM "booking"
    ORDER BY "check_in_date" DESC
    LIMIT 10`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows)
    }).catch((error) => {
      console.log('There is an error in BOOKINGS ROUTER GET request', error);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  // GET route code here
  const id = req.params.id;
  const queryText =
    `SELECT * FROM "booking" WHERE "id" = $1;`;
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows[0]);
    }).catch((error) => {
      console.log('There is an error in BOOKINGS ROUTER GET request', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  // GET route code here
  const deleteBookingById = req.params.id;
  const queryText =
    `DELETE FROM "booking"
    WHERE "id" = $1`;
  pool.query(queryText, [deleteBookingById])
    .then(() => {
      console.log('in my BOOKINGS ROUTER DELETE request');
      res.sendStatus(200);
    }).catch((error) => {
      console.log('There is an error in your BOOKINGS ROUTER DELETE request', error);
      res.sendStatus(500);
    })
});


module.exports = router