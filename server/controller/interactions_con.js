const express = require('express');
const router = express.Router();
const { interactions } = require('../models'); // Import your Sequelize model for interactions

// Helper function to create a new interaction if it doesn't exist
async function createOrUpdateInteraction(placeid, username, updateData) {
  let interaction = await interactions.findOne({
    where: { placeid: placeid, Username: username },
  });
  console.log({ placeid, username });
  if (!interaction) {
    interaction = await interactions.create({
      placeid: placeid,
      Username: username,
    });
  }

  await interaction.update(updateData);

  return interaction;
}

// Like or create an interaction by placeid and username
router.put('/like/:placeid/:username', async (req, res) => {
  try {
    const { placeid, username } = req.params;
    
    // Update the 'Liked' field to true
    const interaction = await createOrUpdateInteraction(
      placeid,
      username,
      { Liked: true }
    );

    res.json({ message: 'Interaction liked successfully', interaction });
  } catch (error) {
    console.error('Error liking interaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:username', async (req, res) => {
    try {
      const { username } = req.params;
      
      // Update the 'Liked' field to true
      const liked_pl=await interactions.findAll({where:{Username:username}});
  
      res.json(liked_pl);
    } catch (error) {
      console.error('Error liking interaction:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Dislike or create an interaction by placeid and username
router.put('/dislike/:placeid/:username', async (req, res) => {
  try {
    const { placeid, username } = req.params;

    // Update the 'Liked' field to false
    const interaction = await createOrUpdateInteraction(
      placeid,
      username,
      { Liked: false }
    );

    res.json({ message: 'Interaction disliked successfully', interaction });
  } catch (error) {
    console.error('Error disliking interaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update the rating of an interaction by placeid and username
router.put('/rate/:placeid/:username', async (req, res) => {
  try {
    const { placeid, username } = req.params;
    const { Rating } = req.body; // Get the updated rating from the request body

    // Validate the rating (assume it should be between 1 and 5)
    if (Rating < 1 || Rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    // Update the 'Rating' field
    const interaction = await createOrUpdateInteraction(
      placeid,
      username,
      { Rating }
    );

    res.json({ message: 'Rating updated successfully', interaction });
  } catch (error) {
    console.error('Error updating interaction rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
