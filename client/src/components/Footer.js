import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

function About() {
  return (
    <div >
      <div className="my-4">
        <h2>About the Website</h2>
        <p>Discover the world with TripNest, your go-to travel partner. Our platform simplifies trip planning, offering a vast array of destinations to explore. Dive into unique experiences, curated just for you. With TripNest, your next adventure is just a click away. Start exploring today!"</p>
      </div>

      <Row className="text-center">
        <Col xs={12} sm={6} md={4}>
          <a
            href="https://www.linkedin.com/in/kammalurirajesh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-3x"></i>
          </a>
          <p>LinkedIn</p>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <a
            href="https://github.com/rajeshkammaluri"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github fa-3x"></i>
          </a>
          <p>GitHub</p>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <a
            href="https://twitter.com/rajeshkammaluri"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-3x"></i>
          </a>
          <p>Twitter</p>
        </Col>
      </Row>

      <footer className="py-3 my-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4}>
            <Button variant="link" className="nav-link ">
              Home
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button variant="link" className="nav-link ">
              Features
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button variant="link" className="nav-link ">
              Pricing
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button variant="link" className="nav-link ">
              FAQs
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button variant="link" className="nav-link ">
              About
            </Button>
          </Col>
        </Row>
        <p className="text-center ">&copy; 2022 Company, Inc</p>
      </footer>
    </div>
  );
}

export default About;
