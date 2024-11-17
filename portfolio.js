const express = require('express');
const PortfolioItem = require('../models/PortfolioItem');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await PortfolioItem.find();
  res.redirect('/portfolio.html');
});

module.exports = router;
