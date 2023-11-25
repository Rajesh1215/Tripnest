const express = require('express');
const app = express();

// Middleware 1: Logging
app.use((req, res, next) => {
  console.log('Middleware 1: Logging');
  next(); // Pass control to the next middleware
});
app.get('/api/resource', (req, res) => {
    console.log('Middleware 3: Request Handling');
    // Handle the request here
    res.json({ message: 'Resource accessed successfully' });
  });
// Middleware 2: Authentication
app.use((req, res, next) => {
  console.log('Middleware 2: Authentication');
  // Check authentication logic here
  // If authentication fails, you can respond with an error and skip the next middleware
  // For example:
  // if (!authenticated) {
  //   return res.status(401).json({ error: 'Authentication failed' });
  // }
  next(); // Move to the next middleware if authentication succeeds
});

// Middleware 3: Request Handling
app.get('/api/resource', (req, res) => {
  console.log('Middleware 3: Request Handling');
  // Handle the request here
  res.json({ message: 'Resource accessed successfully' });
});

// Middleware 4: Error Handling (Error handler middleware should be defined after other middleware and routes)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
