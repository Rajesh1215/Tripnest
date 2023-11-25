const express = require('express');
const router = express.Router();
const { comments, users } = require('../models'); // Import your Sequelize models for comments and users

// CREATE (POST) a new comment
router.post('/make', async (req, res) => {
  try {
    const comment1 = req.body; // Get commentbody and username from the request body
    // Check if the user with the specified username exists
    const user = await users.findOne({ where: { Username: comment1.username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Create a new comment associated with the user
    await comments.create(comment1);

    res.json({ message: 'Comment created successfully.' });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ (GET) all comments
router.get('/', async (req, res) => {
    try {
      // Retrieve all comments and include the associated user's username using the alias 'user'
      const allComments = await comments.findAll({
        include: [
          {
            model: users,
            attributes: ['Username'], // Include only the 'Username' attribute from the user
            as: 'user', // Specify the alias here
          },
        ],
      });
  
      res.json(allComments);
    } catch (error) {
      console.error('Error retrieving comments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // READ (GET) a specific comment by ID
  router.get('/:commentId', async (req, res) => {
    try {
      const { commentId } = req.params;
  
      // Retrieve a specific comment by its ID and include the associated user's username using the alias 'user'
      const comment = await comments.findByPk(commentId, {
        include: [
          {
            model: users,
            attributes: ['Username'], // Include only the 'Username' attribute from the user
            as: 'user', // Specify the alias here
          },
        ],
      });
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.json(comment);
    } catch (error) {
      console.error('Error retrieving comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.get("/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const placeComments = await comments.findAll({
        where: { placeid: id }, // Assuming you have a foreign key 'placeId' in the comments table
      });
  
      res.json({ comments: placeComments });
    } catch (error) {
      console.error("Error retrieving comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// UPDATE (PUT) a specific comment by ID
router.put('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentbody } = req.body; // Get the updated commentbody from the request body

    // Find the comment by its ID and update the commentbody
    const [updatedRowsCount] = await comments.update(
      { commentbody },
      { where: { id: commentId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a specific comment by ID
router.delete('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find and delete the comment by its ID
    const deletedComment = await comments.destroy({ where: { id: commentId } });

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
