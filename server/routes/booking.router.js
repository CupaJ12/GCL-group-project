const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to get single booking by ID

router.get('/:id', (req, res) => {
	if (req.isAuthenticated()) {
		console.log('get booking by ID:', req.params.id);
		const id = req.params.id;
		const queryText = `
	  SELECT * FROM "booking"
	  WHERE "id" = $1;`;
		pool
			.query(queryText, [id])
			.then((result) => {
				res.send(result.rows[0]);
			})
			.catch((error) => {
				console.log('post route booking by ID error: ', error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403); // forbidden status code
	}
});



module.exports = router;
