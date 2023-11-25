const express= require('express');
const router=express.Router();
const { restaurents } = require('../models');


router.get("/", async (req,res)=>{
    try {
        // Use Sequelize to fetch all records from the "places" model
        const allPlaces = await restaurents.findAll();
        
        // Send the retrieved records as a JSON response
        res.json(allPlaces);
      } catch (error) {
        console.error("Error retrieving places:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});

module.exports=router;