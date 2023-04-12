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


router.post('/', (req, res) => {
    console.log('in booking router post request with: ', req.body);
    if (req.isAuthenticated()) {
        const queryText = `INSERT INTO "booking" (
            customer_first_name, 
            customer_last_name,
            customer_email,
            customer_phone,
            vendor,
            check_in_date,
            check_out_date,
            tax_responsible,
            cleaning_fee,
            pet_fee,
            cost_per_night,
            vendor_commission,
            vendor_fee,
            discount,
            lodging_tax,
            finalized,
            property_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING id;`;
        pool.query(queryText, [
            req.body.customer_first_name, 
            req.body.customer_last_name,
            req.body.customer_email,
            req.body.customer_phone,
            req.body.vendor,
            req.body.check_in_date,
            req.body.check_out_date,
            req.body.tax_responsible,
            req.body.cleaning_fee,
            req.body.pet_fee,
            req.body.cost_per_night,
            req.body.vendor_commission,
            req.body.vendor_fee,
            req.body.discount,
            req.body.lodging_tax,
            req.body.finalized,
            req.body.property_id,
        ])
        .then((query) => {
            //query to add comment with new booking id that was just created
                pool.query(`INSERT INTO "comment" (comment, user_id, booking_id) VALUES ($1, $2, $3);`, [req.body.comment, req.user.id, query.rows[0].id])

            .then(result => {
                res.sendStatus(201);
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log('error: ', err)
            });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log('error: ', err)
        });
    } else {
        res.sendStatus(403);
    }
});

// get all from booking
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "booking" ORDER BY "check_in_date" DESC;`;
        pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
			
		})
		.catch((error) => {
			console.log('Error completing get query', error);
			res.sendStatus(500);
		});
    } else {
        res.sendStatus(403);
    }
})

router.put('/tenant/:id', (req, res) => {
    console.log('edit tenant route request made', req.body);
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const queryText = `UPDATE "booking"
        SET "customer_first_name" = $2, "customer_last_name" = $3, "customer_email" = $4, "customer_phone" = $5
        WHERE "id" = $1;`;
    pool
        .query(queryText, [id, firstName, lastName, email, phone])
        .then ((result) => res.sendStatus(201))
        .catch((err) => {
            console.log('edit tenant route failed:', err);
        });
})


module.exports = router;
