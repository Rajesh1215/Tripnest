import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
// import { TripCard } from "./homecomp/Placessug";
import Activetrips from './homecomp/ActiveTrips';
import { FaCog } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faKey, faTrash, faCrown } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useUserContext} from "./context/useauthcontext";
import axios from 'axios';
import profileicon from "./profileicon.png"

const changepasswordvalidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function ChangePasswordForm({handleClose}) {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    // You can handle password change logic here.
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={changepasswordvalidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group mb-2">
            <label htmlFor="currentPassword">Current Password:</label>
            <Field type="password" name="currentPassword" id="currentPassword" />
            <ErrorMessage name="currentPassword" component="div" className="error" />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="newPassword">New Password:</label>
            <Field type="password" name="newPassword" id="newPassword" />
            <ErrorMessage name="newPassword" component="div" className="error" />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field type="password" name="confirmPassword" id="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <button type="submit" className='btn btn-primary'>Change Password</button>
        </Form>
      </Formik>
    </div>
  );
}
function UserProfileForm() {
  const { user,setUsername,setUseremail } = useUserContext(); // Assuming you have an updateUser function in your context

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const initialValues = {
    username: user.Username,
    email: user.email,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make an Axios PUT request to update user details
      const response1 = await axios.put(`http://localhost:3010/users/${user.email}/update`, values);
      // Assuming the server responds with updated user data
      const updatedUserData = response1.data;
      if(updatedUserData.status){
      sessionStorage.setItem('Usertoken', values.email);
      const response2= await axios.post(`http://localhost:3010/users/${values.email}/read`);
      setUsername(response2.Username);
      setUseremail(response2.Email);
      }

    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group mb-2">
            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" id="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <button type="submit" className='btn btn-primary'>Save Changes</button>
        </Form>
      </Formik>
    </div>
  );
}

function ProfilePage() {
  const { user} = useUserContext();
  // const all = [{ id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' },];
  // const fav = [{ id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' }, { id: 1, name: 'Place 1', description: 'Description for Place 1' },
  // { id: 2, name: 'Place 2', description: 'Description for Place 2' },];
  // const [visibleCountfav, setVisibleCountfav] = useState(8);
  // const [visibleCount, setVisibleCount] = useState(8);

  // const loadMore = () => {
  //   // Increase the number of visible elements by 8
  //   setVisibleCount((prevCount) => prevCount + 8);
  // };
  // const loadMorefav = () => {
  //   // Increase the number of visible elements by 8
  //   setVisibleCountfav((prevCount) => prevCount + 8);
  // };
  // const navigate=useNavigate();
  // const PlaceDet=(id)=>{
  //   navigate(`/places/${id}`)
  // };
 


  return (
    <Container>
      <Row className='profile mx-2  py-3 my-3'>
        {/* Personal Details */}
        
        <Col  >
          <div className="profile-image">
            <img src={profileicon} alt="Profile" />
          </div>
        </Col>
        <Col className="personal-details d-flex flex-column justify-content-center">
        <h1 className="profile-name">{user.Username}</h1>
          <p className="profile-info">{user.email}</p>
          
        </Col>
        <Col></Col>
        <Col></Col>
        <Col  className="personal-details d-flex flex-column justify-content-start align-items-center">
          <div className='mt-3'>
            <Settings className="settings-profile-icon" /> {/* Pencil icon */}
          </div>
        </Col>
      </Row>

      {/* Liked Places
      <div className="liked-places">
        <h2>Liked Places</h2>
        <div className="row">
          {all.slice(0, visibleCount).map((trip) => (
            <TripCard key={trip.id} trip={trip} click={()=>{PlaceDet(trip.id)}} />
          ))}
        </div>
        {visibleCount < all.length && (
          <div className="text-center">
            <Button variant="primary" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </div> */}

      {/* Favorite Places
      <div className="favorite-places">
        <h2>Favorite Places</h2>
        <div className="row">
          {fav.slice(0, visibleCountfav).map((trip) => (
            <TripCard key={trip.id} trip={trip} click={()=>{PlaceDet(trip.id)}}/>
          ))}
        </div>
        {visibleCount < fav.length && (
          <div className="text-center">
            <Button variant="primary" onClick={loadMorefav}>
              Load More
            </Button>
          </div>
        )}
      </div> */}

      {/* Active Trips */}
      <Activetrips />
    </Container>
  );
}

function Settings() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FaCog onClick={handleShow} className='set-icon' /> {/* Pencil icon */}

      <Modal size='sm' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div>
            <Editdet />
            <Changepassword />
            <DeleteAccount />
            <Upgrade />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

function Editdet() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='settings' onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} className='icon mx-2 my-1' />
        Edit Details
      </div>

      <Modal size='md' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >Edit details</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <UserProfileForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}
function Changepassword() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='settings' onClick={handleShow}>
        <FontAwesomeIcon icon={faKey} className='icon mx-2 my-1'  />
        Change Password
      </div>

      <Modal size='md' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <ChangePasswordForm handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeleteAccount() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='settings' onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} className='icon mx-2 my-1'  />
        Delete Account
      </div>

      <Modal size='md' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div>
          <p>Can't be right now!</p>
          <button className='btn btn-danger mx-3' onClick={handleClose}>Ok</button>
          <button className='btn btn-secondary mx-2' onClick={handleClose} >Cancel</button>

          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}

        </Modal.Footer>
      </Modal>
    </>
  );
}

function Upgrade() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='settings' onClick={handleShow}>
        <FontAwesomeIcon icon={faCrown} className='icon mx-2 my-1' onClick={handleShow} />
        Upgrade to Premium
      </div>

      <Modal size='md' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >Upgrade to Premium</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div>
          Upgrade version Not available
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePage;
