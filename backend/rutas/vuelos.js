const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {

    const query = `
        SELECT *
        FROM vuelos
     
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        vuelos=results;
        console.log("resutados"+results);
        res.json(vuelos);
    });
});

module.exports = router;