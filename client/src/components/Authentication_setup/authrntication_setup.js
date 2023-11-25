import axios from "axios";
import {useUserContext} from "../context/useauthcontext";

function CheckToken() {
    const { setUserlog,setUsername,setUseremail} = useUserContext();

  const storedToken = sessionStorage.getItem('token');
  const email=sessionStorage.getItem("Usertoken");
    
  // If a token exists, send it to the backend using Axios
  if (storedToken && email ) {
    // Make an API call to your backend using Axios
    axios.post('http://localhost:3010/users/token-ver', { token: storedToken , email:email})
      .then(response => {
        
        setUserlog(response.data.authencate);
        if (response.data.authencate){
            
            setUseremail(response.data.Email);
            setUsername(response.data.Username);
        }

      })
      .catch(error => {
        console.error('Error sending token to backend:', error);


      });
  } else {
    console.warn('No token found in session storage.');
  }
  return null;
}

export default CheckToken;
