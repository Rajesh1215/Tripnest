const express = require('express');
const router = express.Router();
const { trip_shares } = require('../models'); // Import your Sequelize model for trip_shares

// CREATE (POST) a new trip share
router.post('/', async (req, res) => {
  try {
    const { username, TripID } = req.body; // Get username and TripID from the request body

    // Check if a trip share with the same username and TripID already exists
    const existingTripShare = await trip_shares.findOne({
      where: { username, TripID },
    });

    if (existingTripShare) {
      return res.status(400).json({ error: 'Trip already shared' });
    }

    // Create a new trip share record
    await trip_shares.create({ username, TripID });

    res.status(201).json({ message: 'Trip shared successfully.' });
  } catch (error) {
    console.error('Error sharing trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a trip share by username and TripID
router.delete('/:username/:TripID', async (req, res) => {
  try {
    const { username, TripID } = req.params; // Get username and TripID from route parameters

    // Find and delete the trip share record by username and TripID
    const deletedTripShare = await trip_shares.destroy({
      where: { username, TripID },
    });

    if (!deletedTripShare) {
      return res.status(404).json({ error: 'Trip share not found' });
    }

    res.json({ message: 'Trip share deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip share:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
