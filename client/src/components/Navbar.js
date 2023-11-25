import React,{ useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "../index.css";
import { Image } from 'react-bootstrap'; // Import Image component
import logo from './logo.png'; // Import the image using the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Assuming you want to use the solid user icon
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"
import {useUserContext} from "./context/useauthcontext";


function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="login_signup">
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center w-100'>Login Here!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm/>  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}
function SignupModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="login_signup">
        SignUp
      </Button>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center' >SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body><SignUpForm/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}


function AppNavbar() {
  // const [Authunticated,setAuthunticated]=useState(true);
  // const Loggin=()=>{
  //   setAuthunticated(true);
  // };
  const { user,setUserlog,setUsername,setUseremail} = useUserContext();
  return (
    <Navbar variant="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand><Image src={logo} height={200} width={200} alt="Logo" fluid /> </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="w-100 mt-4 mx-5">
            <LinkContainer to="/">
              <Nav.Link className='mainnav'>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/places">
              <Nav.Link className='mainnav'>Places</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Trips">
              <Nav.Link className='mainnav'>Trips</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/About">
              <Nav.Link className='mainnav'>About</Nav.Link>
            </LinkContainer>
            <div className="  d-flex align-items-center marginleft justify-content-between"> {/* Create a flex container for right-aligned items */}
             {  !user.Logged ?
             // {/* Authenticated */} 
              (<><LoginModal/>
              <SignupModal/></>):(<>
              <LinkContainer to="/dashboard">
                <Nav.Link className='d-flex'>
              <div className="mx-2"> {/* Add some margin to separate items */}
              <FontAwesomeIcon icon={faUser} className='profile-icon'/> {/* Profile icon */}
              </div>
                </Nav.Link>
              </LinkContainer>
              <div>
              <FontAwesomeIcon icon={faSignOutAlt} className="profile-icon" onClick={async ()=>{
                setUseremail(null);
                setUserlog(false);
                setUsername(null);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('Usertoken');
              }} /> {/* Logout icon */}
              </div></>)}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



// Main component


export default AppNavbar;
