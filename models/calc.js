const connection = require('../config/dbconnection');

let Calc = {
    getAll: callback => {
        let sql = "SELECT * FROM EE_class ORDER BY created_at DESC";
        return connection.query(sql, callback );
    },
    calculate: (req, res, callback ) => {
        let weight = Number(req.weight);
        let cotwo = Number(req.cotwo);

        if (!weight || !cotwo) {
            return res.status(400).send({ error:true, message: 'Please provide weight or CO2' });
        }

        let co2RefValue = Number(36.59079) + Number(0.08987) * weight;
        let deviation = (cotwo - (co2RefValue)) / co2RefValue * 100;

        let sql = "INSERT INTO EE_class (weight, co2, co2RefValue, deviation ) VALUES ?";
        let values = [
            [weight, cotwo, co2RefValue, deviation]
        ];
        return connection.query(sql, [values], callback );
    }
};
module.exports = Calc;