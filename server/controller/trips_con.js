const express = require('express');
const router = express.Router();
const { trips } = require('../models'); // Import your Sequelize model for trips

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


// CREATE (POST) a new trip
router.post('/', async (req, res) => {
  try {
    const { trip } = req.body; // Get the trip object from the request body

    // Create a new trip record
    const newTrip = await trips.create(trip);

    res.status(201).json({ message: 'Trip created successfully.', trip: newTrip });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// const names = ["Alice", "Bob", "Charlie", "David", "Emma", /* ... add more names */];
// const placesList = [
//   [2,4,10,49],[12,14,110,149],[7,9,15,9,21],[34,42,99,165,178,190],[66,90,26,96,199],[1,2,3,4,5],[6,7,8,9,10],
//   [11,12,13,14,15],[16,17,18,19,20]
//   // Add more place lists as needed
// ];

// router.get('/hi', async (req, res) => {
//   try {
//     const tripsToCreate = 50;
//     const createdTrips = [];

//     for (let i = 0; i < tripsToCreate; i++) {
//       const randomName = names[Math.floor(Math.random() * names.length)];
//       const randomPlacesList = placesList[Math.floor(Math.random() * placesList.length)];
//       const randomImages = [
//         images[Math.floor(Math.random() * images.length)],
//         images[Math.floor(Math.random() * images.length)],
//         images[Math.floor(Math.random() * images.length)],
//       ];

//       const newTrip = await trips.create({
//         username: randomName,
//         places: randomPlacesList,
//         images: randomImages,
//       });

//       createdTrips.push(newTrip);
//     }

//     res.status(201).json({ message: 'Trips created successfully.', trips: createdTrips });
//   } catch (error) {
//     console.error('Error creating trips:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// READ (GET) all trips
router.get('/', async (req, res) => {
  try {
    // Retrieve all trips
    const allTrips = await trips.findAll();

    res.json(allTrips);
  } catch (error) {
    console.error('Error retrieving trips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/user/userbyname/:username', async (req, res) => {
  const username = req.params.username;
  try {
    // Find all trips associated with the given Username
    const userTrips = await trips.findAll({
      where: { username  : username }, // Filter by Username
    });

    res.json(userTrips);
  } catch (error) {
    console.error('Error retrieving user trips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ (GET) a single trip by TripID
router.get('/:TripID', async (req, res) => {
  try {
    const { TripID } = req.params; // Get TripID from route parameters

    // Find a trip by TripID
    const trip = await trips.findByPk(TripID);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found',found:false });
    }

    res.json({trip,found:true});
  } catch (error) {
    console.error('Error retrieving trip:', error);
    res.status(500).json({ error: 'Internal server error',found:false });
  }
});

// UPDATE (PUT) a trip by TripID
router.put('/:TripID', async (req, res) => {
  try {
    const { TripID } = req.params; // Get TripID from route parameters
    const { username, places } = req.body; // Get updated values from the request body

    // Find the trip by TripID
    const trip = await trips.findByPk(TripID);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Update the trip with new values
    trip.username = username;
    trip.places = places;
    await trip.save();

    res.json({ message: 'Trip updated successfully.', trip });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Import your 'trips' model here


  

// DELETE a trip by TripID
router.delete('/:TripID', async (req, res) => {
  try {
    const { TripID } = req.params; // Get TripID from route parameters

    // Find and delete the trip by TripID
    const deletedTrip = await trips.destroy({
      where: { TripID },
    });

    if (!deletedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
