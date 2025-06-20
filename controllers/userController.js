const { querySQLServer } = require('../sqlService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login user
exports.login = async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const sql = `SELECT * FROM AppUserTable WHERE Username = @Username`;
    const users = await querySQLServer(sql, [{ name: 'Username', value: Username }]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    const match = await bcrypt.compare(Password, user.LogPassword);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.ID, role: user.UserRole },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user.ID, status: 'success' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Add Login History
exports.loginHistory = async (req, res) => {
  const { UserId, ProjId, Longitude, Latitude } = req.body;

  const loginDate = new Date(); // current date/time

  const sql = `
    INSERT INTO LoginTrackingTable (UserId, ProjId, LoginDate, LoginTime, Longitude, Latitude)
    VALUES (@UserId, @ProjId, @LoginDate, @LoginTime, @Longitude, @Latitude)
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'LoginDate', value: loginDate.toISOString().split('T')[0] },
    { name: 'LoginTime', value: loginDate.toISOString().split('T')[1].slice(0, 8) },
    { name: 'Longitude', value: Longitude },
    { name: 'Latitude', value: Latitude },
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Login history recorded' });
  } catch (err) {
    console.error('Login history error:', err);
    res.status(400).json({ error: err.message });
  }
};



// Get user details by ID
exports.getUserDetails = async (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const sql = `SELECT * FROM AppUserTable WHERE ID = @UserId`;
  const params = [{ name: 'UserId', value: userId }];

  try {
    const users = await querySQLServer(sql, params);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error('Get user details error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add ProfileUpdateTable
exports.profileToUpdate = async (req, res) => {
  const { UserId, ProjId, UpdateFor, UpdateTo, UpdateStatus } = req.body;
  const DateCreated = new Date().toISOString();

  const sql = `
    INSERT INTO ProfileUpdateTable (
      UserId, ProjId, UpdateFor, UpdateTo, UpdateStatus, DateCreated
    ) VALUES (
      @UserId, @ProjId, @UpdateFor, @UpdateTo, @UpdateStatus, @DateCreated
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'UpdateFor', value: UpdateFor },
    { name: 'UpdateTo', value: UpdateTo },
    { name: 'UpdateStatus', value: UpdateStatus },
    { name: 'DateCreated', value: DateCreated },
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Data added successfully', status: 'success' });
  } catch (err) {
    console.error('Error:', err);
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

