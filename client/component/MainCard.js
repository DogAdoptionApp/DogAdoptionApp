import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';




export default function ActionAreaCard(props) {
  if (props.dog) {
    console.log("Dog in MainCard", props.dog);
    console.log(props.dog.name)
    var {name, age, size, breeds, primary_photo_cropped} = props.dog;
    breeds = breeds.primary;
    if (!primary_photo_cropped){
      // primary_photo_cropped = "https://petguidereviews.com/wp-content/uploads/2019/02/cartoon-dog-names.jpg";
      props.handleNext()
    }
    else if (primary_photo_cropped.hasOwnProperty('medium')) {
      primary_photo_cropped = primary_photo_cropped.medium;
    }
    else if (primary_photo_cropped.hasOwnProperty('small')) {
      primary_photo_cropped = primary_photo_cropped.small;
    }
    else if (primary_photo_cropped.hasOwnProperty('large')) {
      primary_photo_cropped = primary_photo_cropped.large
    }
    else if (primary_photo_cropped.hasOwnProperty('full')) {
      primary_photo_cropped = primary_photo_cropped.full
    }
    }
 else {
   const name = "loading";
   const age = null;
   const size = null;
   const breeds = null;
   const primary_photo_cropped = "https://3.bp.blogspot.com/-5vfOgJMDbPI/XT6ilILoqnI/AAAAAAAAH68/d0gfAlQqflcxwu0QhZh_e3G43Xn0shsMgCLcBGAs/s1600/animated%2Bimage.gif";
 }

 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image= {primary_photo_cropped}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age : {age}
            Size : {size}
            Breed : {breeds}
          </Typography>
          <Stack direction="row" spacing={2}>
      <Button onClick={props.handleLike} variant="contained" startIcon={<DeleteIcon />}>
        Like
      </Button>
      <Button onClick={props.handleNext} variant="contained" endIcon={<SendIcon />}>
        Next
      </Button>
    </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
