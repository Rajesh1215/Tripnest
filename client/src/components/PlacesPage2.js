import React, { useState, useEffect } from 'react';
import { TripCard } from "./homecomp/Placessug";
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai'; // Import search icon from react-icons library
import "./PlacesPage2.css";
const tagStatements = {
  famous: {
    heading: 'Discover Your Next Adventure (Famous)',
    description: 'Find exciting trips to famous destinations (Famous).',
    places: null
  },
  mostrated: {
    heading: 'Discover Your Next Adventure (Most Rated)',
    description: 'Find exciting trips to famous destinations (Most Rated).',
    places: null
  },
  // Add more statements for other categories if needed
};
const all = {
  heading: 'Discover Your Next Adventure (All)',
  description: 'Find exciting trips to amazing destinations (All).',
  places: null
};

function PlacesPage() {
  const [Allplaces, setAllplaces] = useState([]);
  const [HighestRatedPlaces, setHighestRatedPlaces] = useState([]);
  const [MostFamousPlaces, setMostFamousPlaces] = useState([]);
  const [AllGenres, setAllGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    return response.data;
  }
  useEffect(() => {
    const fetchData = async () => {
      const tripsData = await gettrips();

      const highestRated = tripsData.slice().sort((a, b) => b.rating - a.rating).slice(0, 20);
      const mostFamous = tripsData.slice().sort((a, b) => b.likes - a.likes).slice(0, 20);
      const allGenres = tripsData.flatMap((trip) => trip.genres);
      const uniqueGenres = [...new Set(allGenres)];
      setAllGenres(uniqueGenres);
      setAllplaces(tripsData);
      setHighestRatedPlaces(highestRated);
      setMostFamousPlaces(mostFamous);
    };

    fetchData();
  }, []);

  all.places = Allplaces;
  tagStatements.famous.places = MostFamousPlaces;
  tagStatements.mostrated.places = HighestRatedPlaces;

  const [visibleCount, setVisibleCount] = useState(52);
  const navigate = useNavigate();
  const PLacedet = (id) => {
    navigate(`/places/${id.id}`)
  };
  const filtered = Allplaces.filter((place) => {
    const searchTerm = searchQuery.toLowerCase();
    const includesSearchTerm = (field) => field.toLowerCase().includes(searchTerm);

    return (
      includesSearchTerm(place.name) ||
      place.activities.some(includesSearchTerm) ||
      place.genres.some(includesSearchTerm)
    );
  });
  console.log(filtered)
  // Update the filtered array
  return (
    <Container>
      <div className="search-main-container">
        <div className="search-bar d-flex ">
        <button className='searchbtn'>
            <AiOutlineSearch size={25} />
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            className='search-field'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {(searchQuery===null || searchQuery=== '')? null:(<span onClick={()=>{setSearchQuery('')}}>X</span>)}
        </div>

        <div className="search-tags">
          {AllGenres.map((tag) => (
            <div key={tag} className="tag" onClick={() => { setSearchQuery(tag) }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {searchQuery === null || searchQuery === '' ? (
        <div>
          {Object.values(tagStatements).map((tag) => (
            <div key={tag}>
              <div className="my-4">
                <h2>{tag.heading}</h2>
                <p>{tag.description}</p>
              </div>
              <div className="d-flex" style={{ overflowX: 'auto' }}>
                {tag.places.map((trip) => (
                  <TripCard key={trip.id} trip={trip} x={1} click={() => { PLacedet({ id: trip.id }) }} />
                ))}
              </div>
            </div>
          ))}
          <Container>
            <h3 className='m-4'>Other Recommended Places</h3>
            <p className='m-4'>Find exciting trips to amazing destinations (All)</p>
            <div className="row">
              {all.places.slice(0, visibleCount).map((trip) => (
                <TripCard key={trip.id} trip={trip} click={() => { PLacedet({ id: trip.id }) }} />
              ))}
            </div>
            {visibleCount < all.places.length && (
              <div className="text-center">
                <Button variant="primary" onClick={() => setVisibleCount((prevCount) => prevCount + 52)}>
                  Load More
                </Button>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <div>
            <h3 className='m-4'>Searched Places for {searchQuery}</h3>
            <div className="row">
              {filtered.map((trip) => (
                <TripCard key={trip.id} trip={trip} click={() => { PLacedet({ id: trip.id }) }} />
              ))}
            </div>
        </div>
      )}

    </Container>
  );

}


export default PlacesPage;
