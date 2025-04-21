const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// CREATE ORDER
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET ALL ORDERS
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// GET SINGLE ORDER
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ message: 'Order not found' });

    res.send(order);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
