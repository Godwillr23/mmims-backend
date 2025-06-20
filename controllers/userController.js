const { querySQLServer } = require('../sqlService');
// const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
  const {
    FirstName,
    LastName,
    ProjId,
    UserRole,
    ActiveStatus,
    DateCreated,
    Username,
    Email,
    Password
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);

    await querySQLServer(`INSERT INTO AppUserTable (
       Firstname, Lastname, ProjId, UserRole, ActiveStatus, DateCreated, Username, Email, LogPassword
      ) VALUES (
        '${FirstName}', '${LastName}', '${ProjId}', '${UserRole}', '${ActiveStatus}',
        '${DateCreated}', '${Username}', '${Email}',
        '${hashedPassword}')`);

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const sqlUsers = await querySQLServer(`SELECT * FROM AppUserTable WHERE Username = '${Username}'`);
    if (sqlUsers.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sqlUser = sqlUsers[0];

    // Compare password with stored bcrypt-hashed password in SQL
    const matchSQL = await bcrypt.compare(Password, sqlUser.LogPassword);
    if (!matchSQL) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: sqlUser.ID }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      userId:sqlUser.ID , 
      status: 'success'
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};


// Add Login History
exports.loginHistory = async (req, res) => {
  const {
    UserId,
    ProjId,
    LoginDate,
    LoginTime,
    Longitude,
    Latitude,
  } = req.body;
  try {
    await querySQLServer(`INSERT INTO LoginTrackingTable (
       UserId,ProjId, LoginDate, LoginTime, Longitude, Latitude) VALUES (
        '${UserId}', '${ProjId}', '${LoginDate}', '${LoginTime}', '${Longitude}',
        '${Latitude}')`);

    res.status(201).json({ message: 'User History added successfully' });
  } catch (err) {
    console.error('error:', err);
    res.status(400).json({ error: err.message });
  }
};


// Get user details by ID
exports.getUserDetails = async (req, res) => {
  const userId = req.params.id;

  try {
    const users = await querySQLServer(`SELECT 
      ID,ActiveStatus,Age,CellNo,DateCreated,DurationDrivingExp,Email,EmploymentContract,EmploymentDate,
      FirstName,Gender,HasDriversLicence,ImageURL,LastName,LicenceCode,LicenceExpDate,LicenceIssueDate,
      LicenceNo,MMIMSAllocatedNo,MiddleName,ProjId,TeamLeader,UserRole,Username
      FROM AppUserTable WHERE ID = '${userId}'`);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error('Get user details error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Add ProfileUpdateTable
exports.profileToUpdate = async (req, res) => {
  const {
    UserId,
    ProjId,
    UpdateFor,
    UpdateTo,
    UpdateStatus,
    DateCreated,
  } = req.body;
  try {
    await querySQLServer(`INSERT INTO ProfileUpdateTable (
       UserId,ProjId, UpdateFor, UpdateTo, UpdateStatus, DateCreated) VALUES (
        '${UserId}', '${ProjId}', '${UpdateFor}', '${UpdateTo}', '${UpdateStatus}',
        '${DateCreated}')`);

    res.status(201).json({ 
      message: 'Data Added successfully' ,
      status: 'success'
    });

  } catch (err) {
    console.error('error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Update user details by ID
// exports.updateUser = async (req, res) => {
//   const userId = req.params.id;
//   const {
//     Firstname,
//     Lastname,
//     EmailAddress,
//     CellNo,
//     // add any other fields you want to update
//   } = req.body;

//   try {
//     const updateQuery = `
//       UPDATE AppUserTable SET
//         Firstname = '${Firstname}',
//         Lastname = '${Lastname}',
//         Email = '${EmailAddress}',
//         CellNo = '${CellNo}'
//       WHERE ID = '${userId}'
//     `;

//     const result = await querySQLServer(updateQuery);
//     res.status(200).json({ message: 'Profile updated successfully' });
//   } catch (err) {
//     console.error('Update user error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

