const express = require('express');
const router = express.Router();
const { favouriteplaces } = require('../models'); // Import your Sequelize model for favouriteplaces

// CREATE (POST) a new favourite place
router.post('/', async (req, res) => {
    try {
      const { placeid, username } = req.body; // Get placeid and username from the request body
  
      // Check if the favorite place with the same placeid and username already exists
      const existingFavoritePlace = await favouriteplaces.findOne({
        where: { placeid, username },
      });
  
      if (existingFavoritePlace) {
        return res.status(400).json({ error: 'Duplicate record' });
      }
  
      // Create a new favourite place record
      await favouriteplaces.create({ placeid, username });
  
      res.status(201).json({ message: 'Favourite place created successfully.' });
    } catch (error) {
      console.error('Error creating favourite place:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.get('/:username', async (req, res) => {
    try {
      const { username } = req.params; // Get the username from the route parameters
  
      // Retrieve all favorite places that belong to the specified username
      const favoritePlacesForUser = await favouriteplaces.findAll({
        where: { username },
      });
  
      res.json(favoritePlacesForUser);
    } catch (error) {
      console.error('Error retrieving favorite places:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// DELETE a favourite place by placeid and username
router.delete('/:placeid/:username', async (req, res) => {
  try {
    const { placeid, username } = req.params; // Get placeid and username from route parameters

    // Find and delete the favourite place record by placeid and username
    const deletedFavouritePlace = await favouriteplaces.destroy({
      where: { placeid, username },
    });

    if (!deletedFavouritePlace) {
      return res.status(404).json({ error: 'Favourite place not found' });
    }

    res.json({ message: 'Favourite place deleted successfully' });
  } catch (error) {
    console.error('Error deleting favourite place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
