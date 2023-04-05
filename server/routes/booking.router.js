const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    console.log('in booking router');
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
            pet_fee,
            cost_per_night,
            vendor_commission,
            vendor_fee,
            discount,
            lodging_tax,
            finalized
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;
        pool.query(queryText, [
            req.body.customer_first_name, 
            req.body.customer_last_name,
            req.body.customer_email,
            req.body.customer_phone,
            req.body.vendor,
            req.body.check_in_date,
            req.body.check_out_date,
            req.body.tax_responsible,
            req.body.pet_fee,
            req.body.cost_per_night,
            req.body.vendor_commission,
            req.body.vendor_fee,
            req.body.discount,
            req.body.lodging_tax,
            req.body.finalized
        ])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;