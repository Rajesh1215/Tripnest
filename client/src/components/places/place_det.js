import { useParams } from 'react-router-dom';
import ImageCarousel from './Imagecorousel';
import React, { useState, useEffect } from 'react';
import Comments from './comments';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/useauthcontext';
// const comments = [
//   { username: 'Rajesh', body: 'This is the first comment.' },
//   { username: 'murali', body: 'Ignoring comment' },
//   { username: 'vinay', body: 'This is the first comment.' },
//   { username: 'vamsi', body: 'Another comment here.' },
//   { username: 'naresh', body: 'last comment' },
//   // Add more comments as needed
// ]


// function DescriptionWithShowMore({ place }) {
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };

//   const placeDescription = place
//     ? `Name: ${place.name}\n
//        Location: ${place.location.latitude}, ${place.location.longitude}\n
//        Rating: ${place.rating}\n
//        Spending: ${place.spending}\n
//        Likes: ${place.likes}\n
//        Activities: ${place.activities.join(', ')}\n
//        Genres: ${place.genres.join(', ')}\n
//        Created At: ${place.createdAt}\n
//        Updated At: ${place.updatedAt}`
//     : '';

//   return (
//     <div className='place-details'>
//       {showFullDescription ? (
//         <div className='full-description'>{placeDescription}</div>
//       ) : (
//         <div className='short-description'>
//           {placeDescription.slice(0, 200)}
//           {placeDescription.length > 200 && '... '}
//         </div>
//       )}

//       {placeDescription.length > 200 && (
//         <button onClick={toggleDescription} className='toggle-button'>
//           {showFullDescription ? 'Show Less' : 'Show More'}
//         </button>
//       )}
//     </div>
//   );
// }



function PlaceDetails() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [comments, setcomments] = useState([]);
  const [placeData, Setplacesdata] = useState([]);
  const [commentBody, setCommentBody] = useState(''); // Move outside of the conditional block
  const [reload,setreload]=useState(true);
  useEffect(() => {
    // Fetch place details
    axios.get(`http://localhost:3010/places_read/${id}`)
      .then(response => {
        Setplacesdata(response.data.place);
        // Handle the place data
      })
      .catch(error => {
        console.error('Error fetching place details:', error);
      });

    axios.get(`http://localhost:3010/comments/${id}/comments`)
      .then(response => {
        setcomments(response.data.comments);
        // Handle the place data
      })
      .catch(error => {
        console.error('Error fetching place details:', error);
      });

    // Fetch comments
  }, [id,reload]);

  if (!placeData) {
    return <div>Place not found</div>;
  }

  const MakeTrip = () => {
    navigate("/trips/plan");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3010/comments/make`, {
        commentbody: commentBody,
        placeid: id,
        username: user.Username,
      });

      // Assuming the server returns the new comment
      // Update the comments section
      setreload((pre) => !pre);

      // Clear the comment input
      setCommentBody('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };


  return (
    <div className='container'>
      <h1 className='my-3 text-center '>{placeData.name}</h1>
      <ImageCarousel images1={placeData.images} />
      <div className='place-buttons row mx-2 mb-3' >
        {/* <Button className='col-2 mx-1' onClick={AddTrips} >Add to Trips</Button> */}
        <Button className='col-lg-2 col-sm-5 col-md-3 mx-1' onClick={MakeTrip} >Start a Trip </Button>
      </div>
      <p>
        {/* < DescriptionWithShowMore place={placeData} /> */}
      </p>
      <div className='comments mt-5'>
        <h3>Comments</h3>
        {user.Logged ?
          (<form onSubmit={handleSubmit}>
            <label htmlFor="commentBody" className='my-3'>Your Comment:</label>
            <div>
              <textarea
                id="commentBody"
                name="commentBody"
                className='w-50'
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>) : null}
        <Comments comments={comments} />

      </div>
      {/* Display comments here */}
    </div>
  );
}

export default PlaceDetails;
