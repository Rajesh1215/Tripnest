import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
// import { Button } from 'react-bootstrap';
import axios from 'axios';

function PlannedPla({ plannedPlaces }) {
    const [placesData, setPlacesData] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
      const fetchPlacesData = async () => {
        try {
          const promises = plannedPlaces.map(async (placeId) => {
            const response = await axios.get(`http://localhost:3010/places_read/${placeId}`);
            return response.data.place; // Assuming your API response has a 'place' property
          });
  
          const places = await Promise.all(promises);
          setPlacesData(places);
        } catch (error) {
          console.error('Error fetching places data:', error);
        }
      };
  
      fetchPlacesData();
    }, [plannedPlaces]);
    console.log(placesData)
    return (
      <div className='whole-planner'>
        <div className='p-4 planner-container'>
          {placesData.length !== 0 ? (
            <div className='my-2 row w-100 d-flex flex-column align-items-center'>
              {placesData.map((place, index) => (
                <div className='d-flex flex-column align-items-center' key={index} onClick={()=>{navigate(`/places/${place.id}`)}}>
                  <div
                    key={index}
                    className=' d-flex col-10 m-3 border-1 rounded-2 shadow p-2 px-4 placeinplan justify-content-between'
                  >
                    <div>{place.name}</div>
                    {/* Replace 'name' with the actual property of the place you want to display */}
                  </div>
                  <FontAwesomeIcon icon={faArrowDown} className='mx-2' />
                </div>
              ))}
              <div className='col-10 text-center border-1 rounded-2 shadow p-2 px-4'> Done </div>
            </div>
          ) : (
            <div className='d-flex w-100 h-100 align-items-center justify-content-center select-text'>
              No places selected
            </div>
          )}
        </div>
      </div>
    );
  }
  

function TripDetails() {
  const [tripData, setTripData] = useState({ found: false });
  const { id } = useParams();

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        // Make an Axios GET request to retrieve trip details based on TripID
        const response = await axios.get(`http://localhost:3010/trips/${id}`);
        // Set the retrieved trip data in the state
        setTripData(response.data);
      } catch (error) {
        console.error('Error retrieving trip details:', error);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (!tripData.found) {
    return <div>Trip not found.</div>;
  }

  const trip = tripData.trip;
  return (
    <div className='trip-details'>
      <h1 className='title my-5'>{trip.title}</h1>

      <div className='trip-plan row'>
        <div className='col-5'>
          <PlannedPla plannedPlaces={trip.places} />
        </div>
        <div className='trip-description col-6 my-3'>
          <h2>Description</h2>
          <p>{trip.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
