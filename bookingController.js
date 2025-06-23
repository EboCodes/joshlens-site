const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const bookingsFile = path.join(__dirname, '..', 'data', 'bookings.json');

// CREATE booking
exports.createBooking = (req, res) => {
  const { name, email, date, package } = req.body;

  if (!name || !email || !date || !package) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newBooking = {
    id: uuidv4(), // ✅ unique ID
    name,
    email,
    date,
    package
  };

  try {
    let bookings = [];

    if (fs.existsSync(bookingsFile)) {
      const data = fs.readFileSync(bookingsFile, 'utf-8');
      bookings = JSON.parse(data || '[]');
    }

    bookings.push(newBooking);

    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

    res.status(201).json({ message: 'Booking submitted successfully!', booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save booking.' });
  }
};

// GET all bookings
exports.getBookings = (req, res) => {
  try {
    const data = fs.readFileSync(bookingsFile, 'utf-8');
    const bookings = JSON.parse(data || '[]');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load bookings.' });
  }
};

// DELETE booking by ID
exports.deleteBooking = (req, res) => {
  const bookingId = req.params.id;
  console.log("🗑️ Deleting ID:", bookingId);

  try {
    const data = fs.readFileSync(bookingsFile, 'utf-8');
    let bookings = JSON.parse(data || '[]');

    const exists = bookings.find(b => b.id === bookingId);
    if (!exists) {
      console.log("❌ Booking ID not found:", bookingId);
      return res.status(404).json({ error: 'Booking not found.' });
    }

    const filtered = bookings.filter(b => b.id !== bookingId);
    fs.writeFileSync(bookingsFile, JSON.stringify(filtered, null, 2));

    console.log("✅ Booking deleted successfully.");
    res.json({ success: true, message: 'Booking deleted.' });
  } catch (err) {
    console.error("❌ Error deleting booking:", err.message);
    res.status(500).json({ error: 'Failed to delete booking.' });
  }
};

if (!exists) {
  console.log("❌ Booking ID not found. Existing IDs:", bookings.map(b => b.id));
}
