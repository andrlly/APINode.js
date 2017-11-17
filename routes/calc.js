const express = require('express');
const router = express.Router();
const calc = require('../models/calc');

router.get('/getAll', (req,res,next) => {

    calc.getAll( (err,rows) => {

    if (err) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    } else {
        // res.json({"status": 200, "error": null, "response": result});
        res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));
    }

    });

});

router.post('/calculate', (req, res, next) => {
        calc.calculate(req.body, res, (err, result) => {
            if(err) {
                res.json(err);
            }
            else {
                res.send('Row added to database with ID: ' + result.insertId);
            }
        });
});

module.exports = router;