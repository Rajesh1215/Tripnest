import React from 'react';
import logo from "./logo.png";
import { Container,Row, Col } from "react-bootstrap";
import profile from "./profile.jpeg";
import globe from "./globe.png";
import place from "./place.png";
import check from "./checked.png";
import free from "./free.png";


function FeatureCard({ description, imageUrl }) {
  return (
    <div className="feature-card d-flex flex-column align-items-center">
      <img src={imageUrl} alt="Tripnest" height={80} />
      <p className='mt-4 about-des text-center '><b>{description}</b></p>
    </div>
  );
}

function Features() {
  return (
    <Container className="mt-5">
      <h2 className="text-center">Our Main Features</h2>
      <Row className="mt-4">
        <Col sm={12} md={6} lg={3} className="mb-4 text-center feature-bor ">
          <div className="feature">
            <img src={globe} alt="Feature 1" className='h-100 w-100' />
            <h4>Feature 1</h4>
            <p>Embark on a journey of a lifetime with our innovative trip planner website! At Tripnest, we're not just about destinations; 
              we're about creating unforgettable experiences tailored to your preferences.</p>
          </div>
        </Col>
        <Col sm={12} md={6} lg={3} className="mb-4 text-center feature-bor ">
          <div className="feature">
            <img src={place} alt="Feature 2" className='h-100 w-100' />
            <h4>Feature 2</h4>
            <p>Discover the world at your fingertips as you effortlessly plan your dream itinerary. Whether you're a thrill-seeker, culture enthusiast,
               or someone seeking tranquility, our platform ensures every trip is a personalized adventure.</p>
          </div>
        </Col>
        <Col sm={12} md={6} lg={3} className="mb-4 text-center feature-bor ">
          <div className="feature">
            <img src={free} alt="Feature 3"  className='h-100 w-100'/>
            <h4>Feature 3</h4>
            <p>Seamlessly organize your travel dates, choose from a curated list of activities, and explore hidden gems suggested by fellow travelers.
               Our user-friendly interface makes planning enjoyable, allowing you to focus on the excitement of your upcoming adventure.</p>
          </div>
        </Col>
        <Col sm={12} md={6} lg={3} className="mb-4 text-center feature-bor ">
          <div className="feature">
            <img src={check} alt="Feature 4" className='h-100 w-100' />
            <h4>Feature 4</h4>
            <p>Ready to turn your travel dreams into reality? Join [Website Name] today and let the journey begin! Wherever you go, whatever you seek,
               we're here to make your travel experience extraordinary. Start planning, start exploring! </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function MotivationAndBenefits() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className='text-center about-motbe feature-bor'>
          <h3>Motivation</h3>
          <p>
          "Our motivation behind this project stems from a deep desire to address and solve real-world 
          challenges. We believe that by leveraging technology and innovation, we can make a meaningful
           impact on society. Our goal is to create a solution that not only simplifies tasks but also 
           enhances the quality of life for individuals and communities. We are driven by the vision 
           of a better, more connected, and more efficient world, and we are committed to making this
            vision a reality through our project"
          </p>
        </Col>
        <Col md={6} className='text-center about-motbe feature-bor'>
          <h3>Benefits to Society</h3>
          <p>
          "The benefits of our project extend far beyond its immediate applications. By providing a 
          user-friendly and efficient solution, we aim to empower individuals and organizations to achieve
           their goals with ease. Our project is designed to save time, reduce costs, and increase
            productivity, ultimately contributing to the overall well-being of society. It fosters
             convenience, accessibility, and inclusivity, ensuring that everyone can enjoy its advantages.
              Furthermore, our project aligns with environmental sustainability efforts, promoting a
               greener and more eco-conscious future."
          </p>
        </Col>
      </Row>
    </Container>
  );
}


function AboutMe() {
  return (
    <Container className="my-5">
      <Row>
        <Col sm={3} md={3} className="">
          <img
            src={profile}
            alt="King Rajesh"
            fluid
            rounded
            className='h-100 w-100'
          />
        </Col>
        <Col sm={9} md={9} className="">
          <h2>About Me</h2>
          <p>
        👋 Hi, I'm Kammaluri Rajesh, a passionate web developer with expertise in various technologies. 
        I thrive on building engaging websites and have a versatile skill set that includes Flask, Django, 
        Express, React, and PHP for web development, along with Flutter for app development.

        </p>
        🚀 Beyond web and app development, I delve into the exciting realms of data science, machine learning,
         deep learning, computer vision, and natural language processing (NLP).
          My journey in technology is not just about code; it's about crafting solutions that make a 
          meaningful impact.
        <p>
        </p>
        <p>
        💻 Explore my diverse projects on LinkedIn and GitHub to witness the fusion of creativity and technology.
        Feel free to connect with me. Let's innovate, learn, and build together!
        🔍 Curious minds are always seeking new challenges, and I am no exception. I thrive on staying updated with industry trends, experimenting with cutting-edge technologies, and pushing the boundaries of what's possible in the digital landscape.
        
🌐 As a developer, I believe in the power of clean code, seamless functionality, and delightful user experiences. Each line of code is a step toward transforming ideas into reality, and each project is an opportunity to leave a lasting impression.

🌟 My commitment to excellence extends beyond the screen. It's about understanding the unique needs of users, anticipating future trends, and contributing to a tech-driven world that empowers individuals and businesses alike.
        </p>
        </Col>
      </Row>
    </Container>
  );
}


function AboutPage() {
  return (
    <Container>
      <FeatureCard description={`"Discover the world with TripNest, your go-to travel partner.
     Our platform simplifies trip planning, offering a vast array of destinations to explore.
      Dive into unique experiences, curated just for you. With TripNest, your next adventure is just a 
      click away. Start exploring today!"`} imageUrl={logo} />
      <Features/>
      <MotivationAndBenefits/>
      <AboutMe/>
    </Container>
  );
}

export default AboutPage;