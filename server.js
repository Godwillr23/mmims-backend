const express = require('express');
// const mongoose = require('mongoose');
const sql = require('mssql');
const cors = require('cors');
const sqlConfig = require('./sqlConfig');

//Routes
const userRoutes = require('./routes/userRoate');
const prefieldRoutes = require('./routes/prefieldRoate');
const documentRoutes = require('./routes/checklistRoate');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:4200', 'https://www.mmims-r2m.co.za'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/prefield', prefieldRoutes);
app.use('/api/checklist', documentRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server after connecting to databases
const startServer = async () => {
  try {

    // ✅ Connect to SQL Server
    await sql.connect(sqlConfig);
    console.log('✅ SQL Server connected');

    // ✅ Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on Port:${PORT}`);
    });

  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1); // Exit process if there's an error
  }
};

startServer();
