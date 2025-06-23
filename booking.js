const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  deleteBooking
} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings);
router.delete('/:id', deleteBooking); // ✅ this line


module.exports = router;
