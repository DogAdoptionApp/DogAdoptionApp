import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "./NavBar.js";
import MainCard from "./MainCard.js";

/* MainContainer State. It is an array of dog objects that are returned from API call and an index pointing to the dog the user is currenlty seeing.
state = {
  dogs = [{name: String,
  photo: String,
  size: String,
  breed: String,
  location: String}, ...],
  index = 0,
// purposefully leaving off url 
 */
const key = "eKJj3Ah2YaAIjX8kN4tVDrEIhggmUYduoUgiMzbHYXoZoAS0Zb";
const secret = "gXsPzJRG6kBQIfXUry9fza3PhwiLqzMHI1a7CTbl";

const MainContainer = (props) => {
  let token;

  const initialState = {
    dogs: [],
    index: 0,
    preferences: {
      location: null,
      size_pref: null,
      age_pref: null,
      gender_pref: null,
      breed_pref: null,
      has_dog: null,
      has_kid: null,
    },
  };

  // This hook sets state to initial state.
  const [state, changeState] = useState(initialState);

  // This function makes an API call to petfinder based on user input to preferences. Will run onClick of save button in preferences menu. Then it invokes 'changeDog' which updates the 'dog' array in state.
  const getPreferencesHandleClick = (form) => {
    //send prefernces to server
    getDogsFromApi();
  };
  const getDogsFromApi = () => {
    //get preferences from server if none deafult to all dogs
    fetch("https://api.petfinder.com/v2/animals?type=dog&limit=100", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        changeState({ ...state, dogs: data.animals });
        console.log("New State", dogs);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  // This hook runs once on initial page load (becuase its second arg is an empty array). It makes an API call to petfinder for generic dogs (not based on user prefs).
  useEffect(
    () => {
      // first call is to get token => returns access_token
      const data = {
        grant_type: "client_credentials",
        client_id: key,
        client_secret: secret,
      };

      fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success", data);
          token = data.access_token;
          getDogsFromApi();
        })
        .catch((error) => {
          console.log("Error", error);
        });

      // second call is the query +> pass in access_token and preferences
    },
    []
    // Consider changing second arg from 'dogs' array to something that chagnes once state.index === 99.
  );

  function handleNext() {
    changeState({ ...state, index: state.index + 1 });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          {/* send prefernces handle click to navbar */}
          <Navbar />
          {/* <h1>{state.index}</h1> */}
          <MainCard dog={state.dogs[state.index]} handleNext={handleNext} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default MainContainer;
