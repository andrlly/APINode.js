const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title:'API for VindiTek',
    author: 'Andriy Venglinskiy'
  });
});

module.exports = router;
