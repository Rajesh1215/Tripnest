// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index";
import AppNavbar from "./components/Navbar";
import HomePage from './components/HomePage';
import PlacesPage2 from './components/PlacesPage2';
import DashboardPage from './components/DashboardPage';
import TripsPage from './components/TripsPage';
import AboutPage from './components/AboutPage';
import Footer from "./components/Footer";
import PlaceDetails from './components/places/place_det';
import TripDetails from "./components/trips/trips_det";
import Tripmaker from "./components/tripmaker/tripmaker";
// import {UserProvider} from "./components/context/useauthcontext";
import Checktoken from "./components/Authentication_setup/authrntication_setup";
import { useUserContext } from './components/context/useauthcontext';

function CustomLayout({ showNavbar=true, children} ) {

  return (
    
    <div>
      {showNavbar && <AppNavbar />}
      {children}
    </div>
  );
}

function App() {
  const {user}=useUserContext();

  return (
    // <UserProvider>
      <div>
      <Checktoken/>
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <CustomLayout showNavbar={true}>
                  <HomePage />
                </CustomLayout>
              }
            />
            <Route
              path="/places"
              element={
                <CustomLayout showNavbar={true}>
                  <PlacesPage2 />
                </CustomLayout>
              }
            />
            <Route
              path="/places/:id"
              element={
                <CustomLayout >
                  <PlaceDetails />
                </CustomLayout>
              }
            />
            
            <Route
              path="/Trips"
              element={
                <CustomLayout showNavbar={true}>
                  <TripsPage />
                </CustomLayout>
              }
            />
            <Route
              path="/About"
              element={
                <CustomLayout showNavbar={true}>
                  <AboutPage />
                </CustomLayout>
              }
              />

            <Route
              path="/Trips/Pre/:id"
              element={
                <CustomLayout showNavbar={true}>
                  <TripDetails />
                </CustomLayout>
              }
            />
            {/* below routes only logged users */ }
            {user.Logged ? (
                <>
            
            <Route
              path="/Trips/plan"
              element={
                <CustomLayout showNavbar={true}>
                  <Tripmaker />
                </CustomLayout>
              }
            />
            <Route
              path="/trips/triplist"
              element={
                <CustomLayout showNavbar={true}>
                  <TripsPage triplist={true} />
                </CustomLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <CustomLayout showNavbar={true}>
                  <DashboardPage />
                </CustomLayout>
              }
            />
            </>):(<Route
              path="/dashboard"
              element={
              (<div className='h-50'>
                <h1>You need to Login first!</h1>
              </div>)}/>
            )}
            {/* other than these any links then it must redirected to homepage */ }
            <Route
                  path="/*"
                  element={<Navigate to="/" replace />}
                />
              
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
    </div>
    // </UserProvider>
  );
}

export default App;
