import React, { useState, useEffect } from 'react';
import { TripCard } from "./homecomp/SuggestedTrips";
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useUserContext } from './context/useauthcontext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const trips_cat = {
  Hills: [],
  Beach: [],
  Park: [],
  Historicals: []
}


function TripOptions({ triplist = false, UserTrips }) {
  const navigate = useNavigate()
  const Triplanner = () => {
    navigate("plan")
  }
  return (
    <Row>
      <Col md={6} sm={12}>
        <Card className='home-card2 mb-2'>
          <Card.Body>
            <Card.Title>Make a Trip</Card.Title>
            <Card.Text>
              Start planning your next adventure now!
            </Card.Text>
            <Button onClick={Triplanner} variant="primary">Start Planning</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} sm={12}>
        <TriplistModel triplist={triplist} UserTrips={UserTrips} />


      </Col>
    </Row>
  );
}
function Navsug({ trips_cat }) {
  const [activeGenre, setActiveGenre] = useState('All');
  const navigate = useNavigate();

  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
  };

  const [visibleCount, setVisibleCount] = useState(12);

  const loadMore = () => {
    // Increase the number of visible elements by 8
    setVisibleCount((prevCount) => prevCount + 8);
  };

  // Check if trips_cat is defined before using Object.keys
  const genres = trips_cat ? Object.keys(trips_cat) : [];
  return (
    <div>
      {/* Custom navigation tabs */}
      <ul className="naviii-tabs">
        {genres.map((genre) => (
          <li className="naviii-item" key={genre}>
            <button
              className={`naviii-link ${activeGenre === genre ? 'active' : ''}`}
              onClick={() => handleGenreChange(genre)}
            >
              {genre}
            </button>
          </li>
        ))}
      </ul>

      {/* Render content based on the selected genre */}
      <Container>
        <div className="row">
          {trips_cat && trips_cat[activeGenre] ? (
            trips_cat[activeGenre].slice(0, visibleCount).map((trip) => (
              <TripCard key={trip.TripID} trip={trip} click={() => navigate(`pre/${trip.TripID}`)} />
            ))
          ) : (
            <p>No trips available for the selected genre.</p>
          )}
        </div>
        {visibleCount < (trips_cat && trips_cat[activeGenre] ? trips_cat[activeGenre].length : 0) && (
          <div className="text-center">
            <Button variant="primary" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}


function TripsPage({ triplist = false }) {
  const { user } = useUserContext();
  const [AlltripsData, setAlltripsData] = useState([]);
  async function gettrips({ user }) {
    const response = await axios
      .get(`http://localhost:3010/trips/user/userbyname/${user}`)
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
      const tripsData = await gettrips({ user: "Emma" });
      setAlltripsData(tripsData);
    }
    fetchData();
  }, [user]);

  const tripsPerCategory = Math.floor(AlltripsData.length / 4);

  // Distribute the trips equally among categories
  Object.keys(trips_cat).forEach((category, index) => {
    const startIndex = index * tripsPerCategory;
    const endIndex = (index + 1) * tripsPerCategory;
    trips_cat[category] = AlltripsData.slice(startIndex, endIndex);
  });
  trips_cat.All = AlltripsData;

  return (
    <Container>

      {!user.Logged ? null : (<TripOptions triplist={triplist}  />)}

      {/* Recommended Trips */}
      <Row className="mt-4">
        <Col>
          <h2>Recommended Trips</h2>
          {/* Place your recommended trips component here */}
        </Col>
      </Row>
      <Navsug trips_cat={trips_cat} />
    </Container>
  );
}


function TriplistModel({ triplist = false }) {
  const [show, setShow] = useState(triplist);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    if (triplist === true) {
      navigate(`/trips`)
    }
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className='home-card2 mb-2'>
        <Card.Body>
          <Card.Title>View Trip List</Card.Title>
          <Card.Text>
            See your upcoming and past trips here.
          </Card.Text>
          <Button variant="primary" onClick={handleShow} >View Trips</Button>
        </Card.Body>
      </Card>

      <Modal size='xl' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >Your TripList</Modal.Title>
        </Modal.Header>
        <Modal.Body ><TripList  /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}
function TripList() {
  const navigate = useNavigate();

  const { user } = useUserContext();
  const [UserTrips2, SetUserTrips2] = useState([]);
  async function gettrips({ user }) {
    const response = await axios
      .get(`http://localhost:3010/trips/user/userbyname/${user}`)
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
      const usertrips2Data = await gettrips({ user: user.Username });
      SetUserTrips2(usertrips2Data);
    }
    fetchData();
  }, [user]);
  const deletetrip = async (trip) => {
    await axios
      .delete(`http://localhost:3010/trips/${trip.TripID}`)
      .then(() => {
        // Update the UserTrips2 state with the filtered array
        const updatedUserTrips2 = UserTrips2.filter((t) => t.TripID !== trip.TripID);
        SetUserTrips2(updatedUserTrips2);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.warn('Token is unauthorized. Redirecting to login page...');
          // Redirect to login page or perform other authentication-related actions
        } else {
          console.error('Error sending token to backend:', error);
        }
      });
  };
  

  return (
    <div className="row w-100">
      {UserTrips2.map((trip) => (

        <Col key={trip.TripID} sm={6} md={3} className={`mb-4 mx-0 d-flex flex-column align-items-center`}>
          <div className="card position-relative h-100">
            <img src={trip.images[0]} className="card-img-top h-100" alt={trip.title} />
            <div className="card-img-overlay text-center" onClick={()=>{navigate(`/trips/pre/${trip.TripID}`)}}>
              <h6 className="card-title text-light position-absolute top-10 start-50 translate-middle w-100">
                {trip.title}
              </h6>
              <h6 className="card-title text-light position-absolute bottom-0 start-50 translate-middle w-100">
                {trip.description}
              </h6>
            </div>
          </div>
          <Button className='m-2 btn btn-danger' onClick={() => deletetrip(trip)}>
            Remove <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Col>))}
    </div>
  );
}



export default TripsPage;


