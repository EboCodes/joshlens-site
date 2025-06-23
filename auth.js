const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log("💡 Received password:", req.body.password);
  console.log("🔐 Expected password:", process.env.ADMIN_PASSWORD);

  if (req.body.password === process.env.ADMIN_PASSWORD) {
    req.session.authenticated = true;
    console.log("✅ Authenticated.");
    return res.json({ success: true });
  }

  console.log("❌ Invalid password");
  res.status(401).json({ error: 'Invalid password' });
});

router.get('/check', (req, res) => {
  res.json({ authenticated: req.session.authenticated === true });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

module.exports = router;
