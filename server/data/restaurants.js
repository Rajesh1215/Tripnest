// const express= require('express');
// const router=express.Router();
// //const { restaurents } = require('../models'); // Import your Sequelize model for restaurents


// // Import the arrays from data.js


// // Generate random latitude and longitude within a 1000 km radius
// function getRandomLocation() {
//     // Center coordinates (e.g., a city)
//     const centerLat = 48.8566; // Example latitude
//     const centerLon = 2.3522;  // Example longitude
  
//     // Radius (in kilometers)
//     const radius = 1000;
  
//     // Convert radius from km to degrees (approximately)
//     const radiusInDegrees = radius / 111.32;
  
//     // Random angle in radians (between 0 and 2 * Math.PI)
//     const randomAngle = Math.random() * 2 * Math.PI;
  
//     // Calculate new latitude and longitude
//     const newLat = centerLat + (radiusInDegrees * Math.cos(randomAngle));
//     const newLon = centerLon + (radiusInDegrees * Math.sin(randomAngle));
  
//     return { latitude: newLat, longitude: newLon };
//   }

//   // Generate a random number within a range
//   function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
  
//   // Generate random restaurant items
//   function getRandomItems() {
//     const items = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Steak', 'Salad', 'Taco', 'Fried Chicken', 'Sushi', 'Noodles'];
//     const numItems = getRandomNumber(1, 5);
//     const randomItems = [];
  
//     for (let i = 0; i < numItems; i++) {
//       const item = items[Math.floor(Math.random() * items.length)];
//       if (!randomItems.includes(item)) {
//         randomItems.push(item);
//       }
//     }
  
//     return randomItems;
//   }
  
//   // Generate fake restaurant details
//   const fakeRestaurents = [];
  
//   for (let i = 1; i <= 200; i++) {
//     const isOpenAtNight = Math.random() < 0.5; 
//     const restaurant = {
//       name: `Restaurant ${i}`,
//       items: getRandomItems(),
//       priceRange: `$${getRandomNumber(10, 50)} - $${getRandomNumber(50, 100)}`,
//       location: getRandomLocation(),
//       residenceNights:isOpenAtNight
//     };
//     fakeRestaurents.push(restaurant);
//   }


//   // router.get("/", async (req, res) => {
//   //   try {
//   //     // Loop through the fakeRestaurents array and insert each restaurant into the database
//   //     for (const fakeRestaurant of fakeRestaurents) {
//   //       console.log(fakeRestaurant);
//   //       await restaurents.create(fakeRestaurant);
        

//   //     }
  
//   //     res.json({ message: "Fake restaurents added to the database successfully." });
//   //   } catch (error) {
//   //     console.error("Error adding fake restaurents to the database:", error);
//   //     res.status(500).json({ error: "Internal server error" });
//   //   }
//   // });

// module.exports=router;
  
// //   // Display the generated fake restaurents
//   // console.log(fakeRestaurents);
  