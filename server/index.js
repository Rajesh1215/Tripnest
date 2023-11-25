const express = require('express');
const app = express();
const port = 3010; // You can change this to your desired port
const cors = require('cors');

// const placesdata = require('./data/places.js');
// const restaurantsdata = require('./data/restaurants.js');
const db=require('./models');
const comments_con=require("./controller/comments_con.js");
const fav_pla_con=require("./controller/fav_pla_con.js");
const interactions_con=require("./controller/interactions_con.js");
const places__con=require("./controller/places__con.js");
const restaurents_con=require("./controller/restaurents_con.js");
const trip_shares_con=require("./controller/trip_shares_con.js");
const trips_con=require("./controller/trips_con.js");
const users_con=require("./controller/users_con.js");

app.use(cors());

app.use(express.json());

// ... (Code for generating 'fakePlaces' array goes here)

// Define a route to send 'fakePlaces' as JSON response
// app.use('/places',placesdata);
// app.use('/restaurants',restaurantsdata);
app.use('/comments',comments_con);
app.use('/fav_pla',fav_pla_con);
app.use('/interactions',interactions_con);
app.use('/places_read',places__con);
app.use('/restaurants_read',restaurents_con);
app.use('/trip_shares',trip_shares_con);
app.use('/trips',trips_con);
app.use('/users',users_con);

db.sequelize.sync().then( ()=>{
  app.listen(port,()=>{
      console.log("running yah");
  });
}
);