const express = require('express');
const jwt = require('jsonwebtoken');
const PortfolioItem = require('../models/PortfolioItem');

const router = express.Router();

function isAdmin(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.redirect('/login.html');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== 'admin') return res.status(403).send('Access denied.');
    req.user = decoded;
    next();
  });
}

router.get('/', isAdmin, (req, res) => {
  res.redirect('/admin.html');
});

router.post('/create', isAdmin, async (req, res) => {
  const { title, description, images } = req.body;
  try {
    const item = new PortfolioItem({
      title,
      description,
      images: images.split(','),
      createdBy: req.user.id,
    });
    await item.save();
    res.redirect('/admin.html');
  } catch (error) {
    res.status(500).send('Error creating portfolio item.');
  }
});

router.post('/update/:id', isAdmin, async (req, res) => {
  const { title, description, images } = req.body;
  try {
    await PortfolioItem.findByIdAndUpdate(req.params.id, {
      title,
      description,
      images: images.split(','),
      updatedAt: new Date(),
    });
    res.redirect('/admin.html');
  } catch (error) {
    res.status(500).send('Error updating portfolio item.');
  }
});

router.post('/delete/:id', isAdmin, async (req, res) => {
  try {
    await PortfolioItem.findByIdAndDelete(req.params.id);
    res.redirect('/admin.html');
  } catch (error) {
    res.status(500).send('Error deleting portfolio item.');
  }
});

module.exports = router;
