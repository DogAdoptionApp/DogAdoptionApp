import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
//accordian
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LikedCard() {
  const initialState = {
    dogs: []
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    //hard coded to user 1 for now
    fetch("/api/like/1")
    .then(data => data.json())
    .then(res => setState({dogs: res}))
    .catch(err => console.log(err))
    
}, [])


  // const deleteDog = (dogId => {
  //   fetch(`/api/delete/${dogId}`, {method: 'DELETE'})
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  // })


  const arrayOfAccordions = [];
  for (const obj in state.dogs) {
    arrayOfAccordions.push(
      <Accordion key={state.dogs[obj]._id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <img src={state.dogs[obj].photo} style={{"height":"100px"}}/> {state.dogs[obj].name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
          <ul>
            <li>Breed: {state.dogs[obj].breed}</li>
            <li>Size: {state.dogs[obj].size}</li>
            <li>Location: {state.dogs[obj].location}</li>
            <li>Gender: {state.dogs[obj].gender}</li>
            <li><a target="_blank" href={state.dogs[obj].petfinder_url}>Click for more info!</a></li>
          </ul>
          <button id={state.dogs[obj]._id}>Delete</button>
      </AccordionDetails>
    </Accordion>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <AppBar position="static">
          <Toolbar>
            <Link to="/" style={{ color: "white" }}>
              <ArrowBackIosIcon />
              <SearchIcon />
            </Link>
            <Typography variant="h6"  sx={{ flexGrow: 1 }} align="center">
            Favorites
          </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          {arrayOfAccordions}
        </Box>
      </Container>
    </React.Fragment>
  );
}
