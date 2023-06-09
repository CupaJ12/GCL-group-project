const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
// GET route to get single booking by ID

router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('get booking by ID:', req.params.id);
        const id = req.params.id;
        const queryText = `
        SELECT "booking".*, "property"."name" AS "property_name"
        FROM "booking"
        JOIN "property" ON "booking"."property_id" = "property"."id"
        Where "booking"."id" = $1;`;
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

            // Email notification
            // const sgMail = require('@sendgrid/mail');
            // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            // const sendMail = async (msg) => {
            //     try{
            //         await sgMail.send(msg);
            //         console.log("message send!");
            //     }catch (error) {
            //         console.error(error);   // check for env var 
            //     }
            // };

            // sendMail({
            //     to: 'bakarelmi1@gmail.com',
            //     from: 'goldclaimlodge100@gmail.com',
            //     subject: 'New Booking was created!',
            //     text: 'Hello, we are notifying you that we have a new booking created!',
            // });

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
});

// post new comment
router.post('/comments', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `INSERT INTO "comment" (comment, user_id, booking_id) VALUES ($1, $2, $3);`;
        pool.query(queryText, [req.body.comment, req.body.user_id, req.body.booking_id])
            .then(result => {
                res.sendStatus(201);
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log('error with posting new comment: ', err)
            });
    } else {
        res.sendStatus(403);
    }
});

// get comments
router.get('/comments/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('in comments get with id: ', req.params.id);
        const queryText = `
            SELECT "comment".*, "user"."username" FROM "booking"
            JOIN "comment" ON "comment"."booking_id" = "booking"."id"
            JOIN "user" ON "user"."id" = "comment"."user_id"
            WHERE "booking"."id" = $1
            ORDER BY "comment"."id";
        `;
        pool
            .query(queryText, [req.params.id])
            .then((result) => {
                console.log('get comments results: ', result.rows);
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error getting comments', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

// update tenants
router.put('/tenant/:id', (req, res) => {
    console.log('edit tenant route request made', req.body);
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const checkIn = req.body.checkIn;
    const checkOut = req.body.checkOut;
    console.log(firstName);
    const queryText = `UPDATE "booking"
        SET "customer_first_name" = $2, "customer_last_name" = $3, "customer_email" = $4, "customer_phone" = $5, "check_in_date" = $6, "check_out_date" = $7
        WHERE "id" = $1;`;
    pool
        .query(queryText, [id, firstName, lastName, email, phone, checkIn, checkOut])
        .then((result) => res.sendStatus(201))
        .catch((err) => {
            console.log('edit tenant route failed:', err);
        });
});

//update financial
router.put('/financial/:id', (req, res) => {
    console.log('edit financial route request made', req.body);
    const id = req.params.id;
    const costPerNight = req.body.cost_per_night;
    const cleaningFee = req.body.cleaning_fee;
    const petFee = req.body.pet_fee;
    const lodgingTax = req.body.lodging_tax;
    const taxResponsible = req.body.tax_responsible;
    const vendorFee = req.body.vendor_fee;
    const discount = req.body.discount;
    const finalized = req.body.finalized;
    const vendorCommission = req.body.vendor_commission;
    const vendor = req.body.vendor;
    const queryText = `UPDATE "booking"
        SET "cost_per_night" = $2, "cleaning_fee" = $3, "pet_fee" = $4, "lodging_tax" = $5, "tax_responsible" = $6, "vendor_fee" = $7, "discount" = $8, "finalized" = $9, "vendor_commission" = $10, "vendor" = $11
        WHERE "id" = $1 `
    pool
        .query(queryText, [id, costPerNight, cleaningFee, petFee, lodgingTax, taxResponsible, vendorFee, discount, finalized, vendorCommission, vendor])
        .then((result) => res.sendStatus(201))
        .catch((err) => {
            console.log('edit financial route failed:', err);
        });
});

router.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `DELETE FROM "comment" WHERE "id" = $1;`;
    pool.query(queryText, [id])
        .then((result) => res.sendStatus(201))
        .catch((err) => {
            console.log('server error deleting comment: ', err);
        });
});

// search booking
router.get('/search/:query', (req, res) => {
    console.log('search route hit', req.params);
    const query = req.params.query.toLowerCase();
    // console.log(query);
    const queryText = `SELECT "booking".*, "property"."name" AS "property_name"
    FROM "booking"
    JOIN "property" ON "booking"."property_id" = "property"."id"
    WHERE $1 = ANY (ARRAY[LOWER("customer_first_name"), LOWER("customer_last_name"), LOWER("property"."name"), to_char("check_in_date", 'MM/DD/YYYY') ])
    ORDER BY "entry_date"
    DESC;`;
    pool
        .query(queryText, [query])
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log('error with search route', err);
        });
});

module.exports = router;
