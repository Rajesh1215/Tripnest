import React from 'react';
import { Carousel,Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import  Activetrips from "./homecomp/ActiveTrips";
import  Suggestedtrips from "./homecomp/SuggestedTrips";
import Placessug from "./homecomp/Placessug";
import PlacestripCard2 from "./homecomp/PlacestripCard";
// import { Image } from 'react-bootstrap'; // Import Image component
import trip1 from "./trip5.jpg";
import trip2 from "./trip6.jpg";
import trip3 from "./trip7.jpg";
import trip4 from "./trip8.jpg";
import { useUserContext } from './context/useauthcontext';
function HomePage() {
  const {user}=useUserContext();
  return (
    <div>

<Carousel className='custom-carousel'>
        <Carousel.Item className='img-container'>
          {/* Background image for the first slide */}
          <img
            className="d-block w-100 "
            src={trip1}
            alt="First slide"
            
          />
          <Carousel.Caption>
            <h3>Welcome to TripNest</h3>
            <p>"Travel makes one modest. Embark on adventurous forest trips."</p>
            <Link to="trips/plan">
            <Button variant="primary">Plan a Trip</Button></Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='img-container'>
          {/* Background image for the first slide */}
          <img
            className="d-block w-100"
            src={trip2}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to TripNest</h3>
            <p>"Hills stand as silent sentinels, cloaked in emerald greenery and crowned by azure skies, 
              offering a serene escape where one can embrace the tranquil beauty of rolling landscapes."</p>
            <Link to="trips/plan">
            <Button variant="primary">Plan a Trip</Button></Link>
          </Carousel.Caption>
        </Carousel.Item><Carousel.Item className='img-container'>
          {/* Background image for the first slide */}
          <img
            className="d-block w-100"
            src={trip3}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to TripNest</h3>
            <p>"Waterfalls cascade down moss-covered rocks,
               their thunderous beauty and misty allure inviting adventurers to witness nature's captivating spectacle."</p>
            <Link to="trips/plan">
            <Button variant="primary">Plan a Trip</Button></Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='img-container'>
          {/* Background image for the first slide */}
          <img
            className="d-block w-100"
            src={trip4}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to TripNest</h3>
            <p>"The beach beckons with its sun-kissed shores and rhythmic waves,
               creating a haven for sunbathers and surf enthusiasts alike."</p>
            <Link to="trips/plan">
            <Button variant="primary">Plan a Trip</Button></Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <PlacestripCard2/>
      {user.Logged && <Activetrips/>}
      <Suggestedtrips/>
      <Placessug/>
    </div>
  );
}

export default HomePage;
