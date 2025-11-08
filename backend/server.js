const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'atomic_music_1'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database: atomic_music_1');
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Atomic Music API is running' });
});

// Get all tables in the database
app.get('/api/tables', (req, res) => {
  const query = 'SHOW TABLES';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tables:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ tables: results });
  });
});

// Generic route to query any table
app.get('/api/table/:tableName', (req, res) => {
  const { tableName } = req.params;
  const limit = req.query.limit || 100;
  
  const query = `SELECT * FROM ?? LIMIT ?`;
  db.query(query, [tableName, parseInt(limit)], (err, results) => {
    if (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ data: results, count: results.length });
  });
});

// Get buy history
// Get buy history with pagination
app.get('/api/buys', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  
  // Get total count
  const countQuery = 'SELECT COUNT(*) as total FROM buy_history';
  
  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error('Error counting buy records:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);
    
    // Get paginated data
    const dataQuery = 'SELECT * FROM buy_history ORDER BY buy_date DESC LIMIT ? OFFSET ?';
    
    db.query(dataQuery, [limit, offset], (err, results) => {
      if (err) {
        console.error('Error fetching buy history:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      
      res.json({ 
        data: results, 
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalRecords: totalRecords,
          recordsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    });
  });
});

// Get buy statistics
app.get('/api/buys/stats', (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_buys,
      SUM(purchase_amount) as total_purchase_amount,
      SUM(Resale_Amount) as total_resale_amount
    FROM buy_history
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching buy stats:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results[0]);
  });
});


// Get loan history with pagination
app.get('/api/loans', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  
  // Get total count
  const countQuery = 'SELECT COUNT(*) as total FROM loan_history';
  
  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error('Error counting loan records:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);
    
    // Get paginated data
    const dataQuery = 'SELECT * FROM loan_history ORDER BY loan_date DESC LIMIT ? OFFSET ?';
    
    db.query(dataQuery, [limit, offset], (err, results) => {
      if (err) {
        console.error('Error fetching loan history:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      
      res.json({ 
        data: results, 
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalRecords: totalRecords,
          recordsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    });
  });
});

// Get loan statistics
app.get('/api/loans/stats', (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_loans,
      SUM(loan_amount) as total_loan_amount,
      AVG(loan_amount) as avg_loan_amount,
      COUNT(CASE WHEN STATUS = 'I' THEN 1 END) as active_loans
    FROM loan_history
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching loan stats:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results[0]);
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit();
  });
});
