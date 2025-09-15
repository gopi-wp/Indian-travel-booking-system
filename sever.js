const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'travel_booking'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// API Routes

// Get all destinations
app.get('/api/destinations', (req, res) => {
  const query = 'SELECT * FROM destinations';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get destination by ID
app.get('/api/destinations/:id', (req, res) => {
  const destinationId = req.params.id;
  const query = 'SELECT * FROM destinations WHERE id = ?';
  db.query(query, [destinationId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Destination not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const {
    destination_id,
    package_type,
    check_in,
    check_out,
    adults,
    children,
    name,
    email,
    phone,
    message
  } = req.body;

  // Calculate total cost based on destination and package type
  const getDestinationPriceQuery = 'SELECT base_price FROM destinations WHERE id = ?';
  db.query(getDestinationPriceQuery, [destination_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).json({ error: 'Destination not found' });
      return;
    }
    
    const basePrice = results[0].base_price;
    let packageMultiplier = 1;
    
    if (package_type === 'standard') packageMultiplier = 1.5;
    if (package_type === 'premium') packageMultiplier = 2;
    
    const totalDays = Math.ceil((new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24));
    const totalPeople = parseInt(adults) + parseInt(children);
    const totalCost = basePrice * packageMultiplier * totalDays * totalPeople;
    
    // Apply discounts for longer stays or more people
    let discount = 0;
    if (totalDays > 7) discount += 0.1; // 10% discount for stays longer than 7 days
    if (totalPeople > 4) discount += 0.05; // 5% discount for groups larger than 4
    
    const finalCost = totalCost * (1 - discount);
    
    // Insert booking into database
    const insertBookingQuery = `
      INSERT INTO bookings 
      (destination_id, package_type, check_in, check_out, adults, children, name, email, phone, message, total_cost, discount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(insertBookingQuery, [
      destination_id,
      package_type,
      check_in,
      check_out,
      adults,
      children,
      name,
      email,
      phone,
      message,
      finalCost,
      discount * 100 // Store as percentage
    ], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({
        message: 'Booking created successfully',
        bookingId: results.insertId,
        totalCost: finalCost,
        discount: discount * 100
      });
    });
  });
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  const query = `
    SELECT b.*, d.name as destination_name 
    FROM bookings b 
    JOIN destinations d ON b.destination_id = d.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
