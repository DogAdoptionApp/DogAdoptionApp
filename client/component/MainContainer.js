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
  const updatePreferencesHandleClick = (data) => {
    //fetch patch to db for user preferences. ONLY send data to database.
    //call set prefernces function
  };
  //get preferences FUNCTION will get preferences from db and set to state. THEN in promise call Get dogs API

  const getDogsFromApi = () => {
    //get prefercnes from state and concat a string to send as a url if all NULL send default string for all dogs

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
          //get prerfernces function on page load to set state from db.
          //getDogsFromApi(); remove this goes INSIDE the set-preferences function
        })//. within th erpe promise        .catch((error) => {
          console.log("Error", error);
        });

      // second call is the query +> pass in access_token and preferences
    },
    []
    // Consider changing second arg from 'dogs' array to something that chagnes once state.index === 99.
  );

  function handleNext() {
    let currentIndex = state.index + 1;
    if (currentIndex > 99) {
      currentIndex = 0;
    }
    changeState({ ...state, index: currentIndex });
  }

  function handleLike() {
    const photo = state.dogs[state.index].primary_photo_cropped;
    let likePhoto;
    if (photo.hasOwnProperty("medium")) {
      likePhoto = photo.medium;
    } else if (photo.hasOwnProperty("small")) {
      likePhoto = photo.small;
    } else if (photo.hasOwnProperty("large")) {
      likePhoto = photo.large;
    } else if (photo.hasOwnProperty("full")) {
      likePhoto = photo.full;
    }
    // const { petfinder_id, petfinder_url, name, photo, gender, size, breed, location } = req.body;
    const data = {
      petfinder_id: state.dogs[state.index].id,
      petfinder_url: state.dogs[state.index].url,
      name: state.dogs[state.index].name,
      photo: likePhoto,
      gender: state.dogs[state.index].gender,
      size: state.dogs[state.index].size,
      breed: state.dogs[state.index].breeds.primary,
      location: state.dogs[state.index].contact.address.postcode,
    };
    fetch("/api/like/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    handleNext();
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          {/* send prefernces handle click to navbar */}
          <Navbar />
          {/* <h1>{state.index}</h1> */}
          <MainCard
            dog={state.dogs[state.index]}
            handleNext={handleNext}
            handleLike={handleLike}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default MainContainer;
