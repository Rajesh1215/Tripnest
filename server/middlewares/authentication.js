const jwt = require('jsonwebtoken');
const { users }=require("../models");


// Generate a JWT token for a registered user
 function generateToken(user) {
  const payload = {
    username: user.Username,
    // Include any other user-specific data in the payload
  };
  const secretKey = 'your-secret-key'; // Replace with your secret key
  const options = {
    // expiresIn: '10h', // Set an expiration time for the token
  };

  return jwt.sign(payload, secretKey, options);
}

// Middleware for verifying JWT tokens
async function verifyToken (req, res, next) {
  const token = req.body.token; // Get the token from the request headers
  const email=req.body.email;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized',token:token });
  }

  const secretKey = 'your-secret-key'; // Replace with your secret key
  
  try {
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken){
      const user = await users.findOne({
        where: { Email: email } // Specify the username as a search condition
    });
      res.json({authencate:true,Username:user.Username,Email:user.Email});
    }
    else{
      res.json({authencate:true});
    }
    // next(); // Proceed to the protected route
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid'+error });
  }
}

module.exports={generateToken,verifyToken};