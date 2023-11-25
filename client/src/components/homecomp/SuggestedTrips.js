import React, { useState,useEffect } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function TripCard({ trip,x=0,click }) {
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  return (
    <Col sm={6} md={3} xs={6} className={`mb-4 mx-${x}`} >
      <div className="card position-relative h-100" onClick={click}>
        <img
          src={trip.images[0]}
          className="card-img-top h-100"
          alt={trip.title}
        />
        <div className="card-img-overlay text-center">
          <h6 className="card-title text-light position-absolute top-0 w-100">
            {trip.title}
          </h6>
          <h6 className="card-title text-light position-absolute bottom-0 w-100">
            {truncateString(trip.description,25)}
          </h6>
        </div>
        
      </div>
    </Col>
  );
}




function SuggestedTrips() {
  const [suggestedtrips,setsuggestedtrips]=useState([]);

  const navigate=useNavigate();
  const tripdet=({id})=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`Trips/pre/${id}`);
  }
  const Trips=()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`Trips`);
  };
  
  async function gettrips() {
    const response = await axios
      .get(`http://localhost:3010/trips/user/userbyname/Emma`)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.warn('Token is unauthorized. Redirecting to login page...');
          // Redirect to login page or perform other authentication-related actions
        } else {
          console.error('Error sending token to backend:', error);
        }
      });
    return response.data;
  }

  useEffect(() => {
    const fetchData = async () => {
      const tripsData = await gettrips();

      setsuggestedtrips(tripsData);
    };

      fetchData();
  }, []);

  return (
    <Container>
      <div className="my-4">
        <h2>Discover Your Next Adventure</h2>
        <p>Find exciting trips to amazing destinations.</p>
      </div>

      <div className="d-flex" style={{ overflowX: 'auto' }}>
        {suggestedtrips.map((trip) => (
            <TripCard key={trip.TripID} trip={trip} x={1} click={()=>{tripdet({id:trip.TripID})}} />
        ))}
      </div>
      

      <div className="text-center mt-4">
        <Button variant="primary" onClick={Trips} ><b> Explore More</b></Button>
      </div>

    </Container>
  );
}

export default SuggestedTrips;
