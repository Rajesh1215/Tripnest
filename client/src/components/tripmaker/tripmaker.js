import React, { useState,useEffect } from 'react';
// import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./tripmaker.css";
import axios from 'axios';
import { useUserContext } from '../context/useauthcontext';
import { useNavigate } from 'react-router-dom';


function SearchingPla({ addPlaceToPlanned, plannedPlaces }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:3010/places_read'); // Adjust the URL accordingly
        setPlacesData(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const filteredPlaces = placesData.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='search-container p-4'>
    <input
      type="text"
      className="w-100 select-text-field"
      placeholder="Search for places..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value)}}
    />
      <div className="place-container row m-3">
        {filteredPlaces.map((place) => (
          <div key={place.id} className="place-item col-md-6 col-lg-4 col-sm-12">
            <PlaceCard place={place} onAddToPlanned={addPlaceToPlanned} plannedPlaces={plannedPlaces} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannedPla({ plannedPlaces, del,clr }) {
  return (
    <div className='whole-planner'>
      <div className='p-4 planner-container'>
        {plannedPlaces.length !== 0 ? (
          <div className='my-2 row w-100 d-flex flex-column align-items-center'>
            {plannedPlaces.map((place, index) => (
              <div className='d-flex flex-column align-items-center' key={index}>
                <div key={index} className=' d-flex col-10 m-3 border-1 rounded-2 shadow p-2 px-4 placeinplan justify-content-between'>
                  <div> {place.name}</div> <FontAwesomeIcon icon={faTrash} className='placeinplan-del' onClick={() => del(index)} />
                </div>
                <FontAwesomeIcon icon={faArrowDown} className='mx-2' />
              </div>
            ))}
            <div className="col-10 text-center border-1 rounded-2 shadow p-2 px-4"> Done </div>
          </div>
        ) : (
          <div className='d-flex w-100 h-100 align-items-center justify-content-center select-text'>Select places beside ---{'>'}</div>
        )}
      </div>
      <div className='planner-buttons  row'>
        <div className='col-5'></div>
        {/* <Button variant="primary" className='col-3 mx-2'>Shortest route</Button> */}
        <Button variant="warning" className={`col-2 ${plannedPlaces.length === 0 ? 'disabled' : ''}`} onClick={clr} disabled={plannedPlaces.length === 0}>Clear</Button>
      </div>
    </div>
  );
}

function Tripmaker() {
  const navigate = useNavigate();
  const [plannedPlaces, setPlannedPlaces] = useState([]);
  const [plannedPlacesID, setPlannedPlacesID] = useState([]);
  const {user}=useUserContext();
  const addPlaceToPlanned = (place) => {
    setPlannedPlaces((prevPlannedPlaces) => [...prevPlannedPlaces, place]);
    setPlannedPlacesID((prevPlannedPlacesID) => [...prevPlannedPlacesID, place.id]);
  };

  const delPlaceToPlanned = (placeindex) => {
    setPlannedPlaces((prevPlannedPlaces) =>
      prevPlannedPlaces.filter((_, index) => index !== placeindex)
    );
    setPlannedPlacesID((prevPlannedPlacesID) =>
      prevPlannedPlacesID.filter((_, index) => index !== placeindex)
    );
  }
  const ClearPlannedplaces=()=>{
    setPlannedPlaces([]);
    setPlannedPlacesID([]);
  }
  const schema = yup.object({
    Title: yup.string().required(),
    Description: yup.string(),
  });

  

  const handleSubmit = async (values) => {
    try {

      // Make an Axios POST request to your Express backend
      const response = await axios.post('http://localhost:3010/trips', {
        trip: {
          username: user.Username, // Replace with the actual username or get it from your authentication system
          places: plannedPlacesID,
          images: [
            "https://organiser.org/wp-content/uploads/2023/08/first-hindu-temple-in-abu-dhabi.jpg",
            "https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg?size=626&ext=jpg",
            "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_216983110_20200116124725.jpg",
            "https://e0.pxfuel.com/wallpapers/180/786/desktop-wallpaper-artwork-nature-rain-grass.jpg"
          ],
          title: values.Title,
          description: values.Description,
        },
      });
      navigate("/trips/triplist");
      // Handle the response as needed
      console.log(response.data);

      // Clear the form or perform any other actions after successful submission
      ClearPlannedplaces();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors, show error messages, etc.
    }
  };

  return (
    <div>
      <div className="container d-flex flex-column align-items-center">
        <h2 className='my-5'>Your Planner Board</h2>
        <Formik
          initialValues={{
            Title: "",
            Description: "",

          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form className="trip-plannerform w-100 d-flex flex-column align-items-center">
            <div className="form-group w-100">
              <Field name="Title" type="text" placeholder="Enter Title here" className="title-field"/>
              <ErrorMessage name="Title" component="div" className="error" />
            </div>
            <div className="form-group w-100">
              <Field name="Description" type="text" placeholder="Enter Description" className="des-field" />
              <ErrorMessage name="Description" component="div" className="error" />
            </div>

            <div className="row main-container">
              <div className="col-6 " >
                <PlannedPla plannedPlaces={plannedPlaces} del={delPlaceToPlanned} clr={ClearPlannedplaces}/>
              </div>
              <div className="col-6">
                <SearchingPla addPlaceToPlanned={addPlaceToPlanned} plannedPlaces={plannedPlaces}/>
              </div>
            </div>
            <Button type={"submit"} className={`submit-button ${plannedPlacesID.length === 0 ? 'disabled' : ''}`} >Submit</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

const PlaceCard = ({ place, onAddToPlanned,plannedPlaces }) => {
  const imageSize = 150; // Adjust image size as needed
  const smallTextSize = '12px';
  const count = plannedPlaces.reduce((acc, currentValue) => {
    return currentValue === place ? acc + 1 : acc;
  }, 0);

  return (
    <div className="place-card d-flex flex-column align-items-center my-2 mx-1">
      <img
        src={place.images[0]}
        alt={place.name}
        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
      />
      <div className="place-name" style={{ fontSize: smallTextSize }}>
        {place.name}
      </div>
      <div className="place-country" style={{ fontSize: smallTextSize }}>
        {place.country}
      </div>
      <Button type='button' className='btn btn-primary select-place-add-btn' onClick={() => onAddToPlanned(place)}>Add {`${count === 0 ? '': count +1}`}</Button>
    </div>
  );
}

export default Tripmaker;
