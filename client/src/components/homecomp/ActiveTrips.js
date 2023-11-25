import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/useauthcontext';
import axios from 'axios';

function Activetrips() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [activeTrips, setactiveTrips] = useState([]);

  async function gettrips({ user }) {
    const response = await axios
      .get(`http://localhost:3010/trips/user/userbyname/${user.Username}`)
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
      const tripsData = await gettrips({ user });

      // Sort trips based on createdAt (assuming createdAt is a Date object)
      const sortedTrips = tripsData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Select top three
      const topThreeTrips = sortedTrips.slice(0, 3);

      // Add statuscol based on index
      const tripsWithStatus = topThreeTrips.map((trip, index) => {
        let statuscol;
        switch (index) {
          case 0:
            statuscol = 'Nearby';
            break;
          case 1:
            statuscol = 'Latest';
            break;
          default:
            statuscol = 'Other';
        }
        return { ...trip, statuscol };
      });
      setactiveTrips(tripsWithStatus);
    };

    if (user.Logged) {
      fetchData();
    }
  }, [user]);

  const TripView = ({ id }) => {
    navigate(`/trips/pre/${id}`);
  };

  const TrplistView = () => {
    navigate(`/trips/triplist`);
  };

  // Helper function to get the appropriate footer text based on statuscol
  const getFooterText = (statuscol) => {
    switch (statuscol) {
      case 'Nearby':
        return 'danger';
      case 'Latest':
        return 'primary';
      case 'Other':
        return 'warning';
      default:
        return '';
    }
  };

  return (
    <Container >
      {/* Quote */}
      <Row>
        <Col md={8}>
          <blockquote>
            <p className='fw-bold fs-5'>Active Trips</p>
          </blockquote>
        </Col>
      </Row>

      {/* Active Trips */}
      <Row>
        {activeTrips.slice(0, 3).map((trip) => (
          <Col key={trip.TripID} sm={6} md={4} className='m-0 my-1'>
            <Card
              onClick={() => {
                TripView({ id: trip.TripID });
              }}
            >
              <Card.Body>
                <Card.Title>{trip.title}</Card.Title>
                <Card.Text>{trip.description}</Card.Text>
                <p
                  className={`border-0 m-0 text-end text-${getFooterText(trip.statuscol)}`}
                >
                  &#8226; {trip.statuscol}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* See More Button */}
      <Row className='mt-4'>
        <Col className='text-end'>
          <Button onClick={TrplistView} variant='primary'>
            See More
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Activetrips;
