const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // GET route code here
    const queryText =
    `SELECT * FROM "booking"
    ORDER BY "id" DESC
    LIMIT 10`;
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows)
      }).catch((error) => {
        console.log('There is an error in BOOKINGS ROUTER GET request', error);
        res.sendStatus(500);
      });
  });

  // router.get('/', (req, res) => {
  //   // GET route code here
  //   const queryText =
  //   // needs work for sql.
  //   `SELECT "property"."name" AS FROM "booking"
  //   JOIN "property" ON "property".id = "booking".
  //   WHERE "property_id";`;
  //   pool.query(queryText)
  //     .then((result) => {
  //       res.send(result.rows)
  //     }).catch((error) => {
  //       console.log('There is an error in BOOKINGS ROUTER GET request', error);
  //       res.sendStatus(500);
  //     });
  // });

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


  module.exports = router