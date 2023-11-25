import React,{ useState,useEffect } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export function TripCard({ trip,x=0,click }) {
  function formatActivitiesList(activities) {
    const MAX_LENGTH = 30;
  
    if (!activities || activities.length === 0) {
      return 'No activities available';
    }
  
    const formattedString = activities.join(', ');
  
    if (formattedString.length > MAX_LENGTH) {
      return formattedString.slice(0, MAX_LENGTH) + '...';
    }
  
    return formattedString;
  }
  return (
    <Col sm={6} md={3} xs={6} className={`mb-4 mx-${x}`} >
      <div className="card position-relative h-100" onClick={click}>
        <img
          src={trip.images[0]}
          className="card-img-top h-100"
          alt={trip.name}
        />
        <div className="card-img-overlay text-center">
          <h6 className="card-title text-light position-absolute top-0 w-100">
            {trip.name}
          </h6>
          <h6 className="card-title text-light position-absolute bottom-0 w-100">
          {formatActivitiesList(trip.activities)}
          </h6>
        </div>
        
      </div>
    </Col>
  );
}
function Placessug() {
  const [activeplaces, setactiveplaces] = useState([]);

  async function gettrips() {
    const response = await axios
      .get(`http://localhost:3010/places_read`)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.warn('Token is unauthorized. Redirecting to login page...');
          // Redirect to login page or perform other authentication-related actions
        } else {
          console.error('Error sending token to backend:', error);
        }
      });

    return response.data.slice(0,10);
  }

  useEffect(() => {
    const fetchData = async () => {
      const placesdata = await gettrips();
      setactiveplaces(placesdata);
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const PLaceDet = ({ id }) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`places/${id}`);
  };

  const Places = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`places`);
  };

  return (
    <Container>
      <div className="my-4">
        <h2>Discover Your Next Adventure</h2>
        <p>Find exciting Places to amazing destinations.</p>
      </div>

      <div className="d-flex" style={{ overflowX: 'auto' }}>
        {activeplaces && activeplaces.map((trip) => (
          <TripCard key={trip.id} trip={trip} x={1} click={() => { PLaceDet({ id: trip.id }) }} />
        ))}
      </div>

      <div className="text-center mt-4">
        <Button variant="primary" onClick={Places}> <b> Explore More</b></Button>
      </div>
    </Container>
  );
}

export default Placessug;