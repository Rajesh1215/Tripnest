import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { FcGlobe,FcList,FcLandscape,FcAutomotive } from "react-icons/fc";
import {useNavigate} from "react-router-dom";
import { useUserContext } from '../context/useauthcontext';
function PlacestripCard2() {
  const navigate = useNavigate();
  const {user}=useUserContext();
  const PLantrip = () => {
    navigate("/trips/plan");
  };
  const Trippage = () => {
    navigate("/trips");
  };
  const TripList = () => {
    navigate("/trips/triplist");
  };
  const Placespage = () => {
    navigate("/places");
  };
  return (
    <div>
      <Row className='mt-3 my-2'>
        <Col md={6}>
          <Card className='home-card' onClick={PLantrip} >
            <Card.Body>
              <div className='d-flex align-items-center'>
                <div className='mx-3'>
                  <FcGlobe size={30} color='blue' />
                </div>
                <div>
                  <Card.Title className='fs-5'>Plan a Trip</Card.Title>
                  <Card.Text className='fs-6'>
                  Embark on an exciting journey of discovery by planning your next trip with our 
                  user-friendly platform.
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='home-card' onClick={TripList}>
            <Card.Body>
              <div className='d-flex align-items-center'>
                <div className='mx-3'>
                  <FcList size={30} color='blue' />
                </div>
                <div>
                  <Card.Title className='fs-5'>{user.Logged? ("View Triplist"):("Login to make a Triplist")}</Card.Title>
                  <Card.Text className='fs-6' >
                   Keep track of your travel aspirations with Your TripList feature. Compile a personalized list of dream destinations and
                   planned adventures, ensuring your travel goals are always within reach.
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='my-2'>
        <Col md={6}>
          <Card className='home-card' onClick={Trippage}>
            <Card.Body>
              <div className='d-flex align-items-center'>
                <div className='mx-3'>
                  <FcAutomotive size={40} color='blue' />
                </div>
                <div>
                  <Card.Title className='fs-5'>Explore Trips</Card.Title>
                  <Card.Text className='fs-6'>
                  Dive into a world of curated trips designed to offer you the ultimate travel experience.
                   Explore meticulously planned itineraries, each crafted to showcase the best a region has to offer
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='home-card' onClick={Placespage}>
            <Card.Body>
              <div className='d-flex align-items-center'>
                <div className='mx-3'>
                  <FcLandscape size={40} color='blue' />
                </div>
                <div>
                  <Card.Title className='fs-5'>Explore Places</Card.Title>
                  <Card.Text>
                  Immerse yourself in the beauty of diverse destinations as you explore places through our platform
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlacestripCard2;
