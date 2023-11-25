const express= require('express');
const router=express.Router();
const { places } = require('../models');

router.get("/", async (req,res)=>{
    try {
        // Use Sequelize to fetch all records from the "places" model
        const allPlaces = await places.findAll();
        
        // Send the retrieved records as a JSON response
        res.json(allPlaces);
      } catch (error) {
        console.error("Error retrieving places:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});
router.get("/:id", async (req, res) => {
  try {
    // Use Sequelize to fetch a specific place by its primary key (id)
    const { id } = req.params;
    const place = await places.findByPk(id);

    if (!place) {
      // If place is not found, send a response with 'found' set to false
      return res.json({ found: false });
    }

    // Send the retrieved place as a JSON response with 'found' set to true
    res.json({ place, found: true });
  } catch (error) {
    console.error("Error retrieving place:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports=router;