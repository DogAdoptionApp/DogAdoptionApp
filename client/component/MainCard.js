import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

/* MainCard State. It is an array of dog objects that are returned from API call and an index pointing to the dog the user is currenlty seeing.
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

export default function ActionAreaCard() {
  const initialState = {
    dogs: [],
    index: 0,
  };
  const [dogs, changeDog] = useState(initialState);

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
          "Contennt-Type": "application/json",
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
      // second call is the query +> pass in access_token and preferences
    },
    [dogs]
    // Consider changing second arg from 'dogs' array to something that chagnes once state.index === 99.
  );
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/55452132/4/?bust=1651865421\u0026width=300"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
