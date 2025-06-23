const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
console.log("🔐 Loaded password:", process.env.ADMIN_PASSWORD); // this should now show the value

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'snapshotSecret',
  resave: false,
  saveUninitialized: false
}));

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Routes
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');

app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Root test route
app.get('/', (req, res) => {
  res.send('📸 Snapshot API is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
