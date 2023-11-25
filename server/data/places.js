// const express= require('express');
// const router=express.Router();
// const { places } = require('../models'); // Import your Sequelize model for restaurents

// const images=["https://hips.hearstapps.com/hmg-prod/images/red-hot-air-balloons-over-jungle-nyaung-u-mandalay-royalty-free-image-1693419727.jpg",
//             "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/05/08123739/lake-como-1-1600x900.jpeg",
//             "https://media.cntraveler.com/photos/595e64a1adb18c52fbb13a98/16:9/w_1920,c_limit/GettyImages-106583184.jpg",
//             "https://www.americanrivers.org/wp-content/uploads/2022/08/Untitled-design-43-2-1536x864.png",
//             "https://zurich.swissphotoclub.com/wp-content/uploads/2019/06/Matterhorn-Stellisee-I-1.jpg",
//             "https://gumlet.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fexplore%2Ftemple.jpg",
//             "https://organiser.org/wp-content/uploads/2023/08/first-hindu-temple-in-abu-dhabi.jpg",
//             "https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg?size=626&ext=jpg",
//             "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_216983110_20200116124725.jpg",
//             "https://e0.pxfuel.com/wallpapers/180/786/desktop-wallpaper-artwork-nature-rain-grass.jpg"];

// // Import the arrays from data.js
// const [genres, activities] = require('./data.js');

// function selectRandomStrings() {
//     const selectedStrings = [];
//     const numberOfStrings = Math.floor(Math.random() * 2) + 3; // Randomly choose between 4 and 5 strings
//     allStrings = [...images]
//     for (let i = 0; i < numberOfStrings; i++) {
//       const randomIndex = Math.floor(Math.random() * allStrings.length);
//       selectedStrings.push(allStrings[randomIndex]);
//       allStrings.splice(randomIndex, 1); // Remove the selected string to avoid duplicates
//     }
  
//     return selectedStrings;
//   }

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
  
  

//   function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
  
//   // Function to shuffle an array randomly
//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = getRandomNumber(0, i);
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }
  
//   // Generate 200 fake places
//   const fakePlaces = [];
  
//   for (let i = 1; i <= 200; i++) {
//     const place = {
//       id: i,
//       name: `Place ${i}`,
//       location: getRandomLocation(),
//       likes: getRandomNumber(100, 1000),
//       spending: getRandomNumber(10, 100),
//       rating: Math.random() * 5, // Random rating between 0 and 5
//       activities: [],
//       genres: [],
//       images: [],
//     };
  
//     // Randomly allocate activities
//     shuffleArray(activities);
//     const numActivities = getRandomNumber(1, 5); // Choose 1 to 5 random activities
//     place.activities = activities.slice(0, numActivities);
  
//     // Randomly allocate genres
//     shuffleArray(genres);
//     const numGenres = getRandomNumber(1, 3); // Choose 1 to 3 random genres
//     place.genres = genres.slice(0, numGenres);

//     //random allocation of imges
//     place.images = selectRandomStrings();
  
//     fakePlaces.push(place);
//   }
  
//   // Now you have an array of 200 fake places with random activities and genres.
//   console.log(fakePlaces);
  
// // Now you can use the genres and activities arrays in your code
// // console.log('Genres:', genres);
// // console.log('Activities:', activities);

// router.get("/", async (req, res) => {
//   try {
//     // Loop through the fakeRestaurents array and insert each restaurant into the database
//     for (const fakePlace of fakePlaces) {
//       console.log(fakePlace);
//       await places.create(fakePlace);

//     }
//     console.log("hi")
//     res.json([{ message: "Fake restaurents added to the database successfully." },{fakePlaces}]);
//   } catch (error) {
//     console.error("Error adding fake restaurents to the database:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports=router;