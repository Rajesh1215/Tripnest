// Handle user login
const { users }=require("../models");
const {generateToken}=require("../middlewares/authentication");

const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
  try {
    // Generate a salt (a random value used during hashing)
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("---------------------------------------------");
    console.log(typeof hashedPassword);
    return hashedPassword;
  } catch (error) {
    
    throw error; // Handle errors as needed
  }
}

async function verifyPassword(userPassword, dbHashedPassword) {
  try {
    // Compare the user-provided password with the stored hashed password
    const isMatch = await bcrypt.compare(userPassword, dbHashedPassword);

    return isMatch;
  } catch (error) {
    throw error; // Handle errors as needed
  }
}
async function loginUser(req, res) {
  const { username, password } = req.body; // Get username and password from the request

  // Verify user credentials (e.g., using Sequelize)
  const user = await users.findOne({ where: { Username: username } });

  if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify the user-entered password against the stored hashed password
  const isPasswordValid = await verifyPassword(password, user.Password);

  if (!isPasswordValid) {
      return res.status(401).json({ error: 'Wrong password' });
  }

  // Generate a JWT token for the authenticated user
  const token = generateToken(user);
  updatedUserData = { SID: token };

  // Update the user's SID in the database
  const [updatedRowsCount] = await users.update(updatedUserData, {
      where: { Username: username } // Specify the username as an update condition
  });

  if (updatedRowsCount === 0) {
      // If no user with the specified username is found, return a 404 response
      res.status(404).json({ error: 'User not found' });
      return;
  }

  // Send the token to the client
  res.json({ token: token , User:user });
}

module.exports={loginUser,hashPassword};  