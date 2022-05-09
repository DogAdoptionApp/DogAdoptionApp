import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";

export default function ActionAreaCard(props) {
  if (props.dog) {
    console.log("Dog in MainCard", props.dog);
    console.log(props.dog.name);
    var { name, age, size, breeds, primary_photo_cropped } = props.dog;
    breeds = breeds.primary;
    if (!primary_photo_cropped) {
      // primary_photo_cropped = "https://petguidereviews.com/wp-content/uploads/2019/02/cartoon-dog-names.jpg";
      props.handleNext();
    } else if (primary_photo_cropped.hasOwnProperty("medium")) {
      primary_photo_cropped = primary_photo_cropped.medium;
    } else if (primary_photo_cropped.hasOwnProperty("small")) {
      primary_photo_cropped = primary_photo_cropped.small;
    } else if (primary_photo_cropped.hasOwnProperty("large")) {
      primary_photo_cropped = primary_photo_cropped.large;
    } else if (primary_photo_cropped.hasOwnProperty("full")) {
      primary_photo_cropped = primary_photo_cropped.full;
    }
  } else {
    const name = "loading";
    const age = null;
    const size = null;
    const breeds = null;
    const primary_photo_cropped =
      "https://3.bp.blogspot.com/-5vfOgJMDbPI/XT6ilILoqnI/AAAAAAAAH68/d0gfAlQqflcxwu0QhZh_e3G43Xn0shsMgCLcBGAs/s1600/animated%2Bimage.gif";
  }

  return (
    <Card sx={{ Width: "100vw", minHeight: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" height="400" image={primary_photo_cropped} />
        <CardContent>
          <Grid
            container
            alignItems="center"
            flex-wrap="nowrap"
            direction="column"
          >
            <h1 style={{ fontSize: "3em" }}>{name}</h1>
            <h2>{breeds}</h2>
            <h2>{age}</h2>
            <h2>{size} </h2>
          </Grid>
          <Grid container justifyContent="space-evenly">
            <Button
              onClick={props.handleLike}
              variant="contained"
              startIcon={<FavoriteIcon style={{ fontSize: "1em" }} />}
              style={{
                minWidth: "40%",
                minHeight: "5%",
                fontSize: "2em",
                marginTop: "1em",
              }}
            >
              Like
            </Button>
            <Button
              onClick={props.handleNext}
              variant="contained"
              endIcon={<ArrowForwardIosIcon style={{ fontSize: "1em" }} />}
              style={{
                minWidth: "40%",
                minHeight: "5%",
                fontSize: "2em",
                marginTop: "1em",
              }}
            >
              Next
            </Button>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
