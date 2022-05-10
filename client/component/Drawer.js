import * as React from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// gender toggle button group
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// save button
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Stack from "@mui/material/Stack";
//appbar
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//breeds
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Breeds from './assets/breeds.json'

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  //GENDER ToggleButtonGroup functionality
  const [gender, setGender] = React.useState("");
  const handleChangeGender = (event, chosenGender) => {
    setGender(chosenGender);
  };
  //GENDER END
  //SIZE TOGGLE BUTTON FUNCTIONALITY
  const [size, setSize] = React.useState("");
  const handleChangeSize = (event, chosenSize) => {
    setSize(chosenSize);
  };
  //END TOGGLE BUTTON FUNCTIONALITY
  //AGE TOGGLE BUTTONGROUP
  const [age, setAge] = React.useState("");
  const handleChangeAge = (event, chosenAge) => {
    setAge(chosenAge);
  };
  //END AGE

  //GOOD WITH KIDS
  const [kids, setKids] = React.useState("");
  const handleChangeKids = (event, chosenKids) => {
    //let chosen = chosenKids === "true" ? true : false
    setKids(chosenKids);
  };
  //END GOOD WITH KIDS
  //GOOD WITH DOGS
  const [dogs, setDogs] = React.useState("");
  const handleChangeDogs = (event, chosenDogs) => {
    //let chosen = chosenDogs === "true" ? true : false
    setDogs(chosenDogs);
  };
  //END GOOD WITH DOGS
  const list = (anchor) => (
    <Box sx={{ width: "70vw" }} role="presentation">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            align="center"
          >
            Preferences
          </Typography>
        </Toolbar>
      </AppBar>
      {/* GENDER BUTTON */}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        Gender
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={gender}
        exclusive
        onChange={handleChangeGender}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="male">Male</ToggleButton>
        <ToggleButton value="female">Female</ToggleButton>
      </ToggleButtonGroup>
      {/* END GENDER BUTTON */}

      <Divider></Divider>
      {/* SIZE BUTTON */}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        Size
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={size}
        exclusive
        onChange={handleChangeSize}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="small">small</ToggleButton>
        <ToggleButton value="medium">medium</ToggleButton>
        <ToggleButton value="large">large</ToggleButton>
        <ToggleButton value="xlarge">xlarge</ToggleButton>
      </ToggleButtonGroup>
      {/* END SIZE BUTTON */}
      <Divider></Divider>

      {/* AGE BUTTON GROUP */}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        Age
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={age}
        exclusive
        onChange={handleChangeAge}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="baby">baby</ToggleButton>
        <ToggleButton value="young">young</ToggleButton>
        <ToggleButton value="adult">adult</ToggleButton>
        <ToggleButton value="senior">senior</ToggleButton>
      </ToggleButtonGroup>

      {/* END AGE */}

      <Divider></Divider>
      {/* KIDS BUTTON GROUP */}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        Good with Kids
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={kids}
        exclusive
        onChange={handleChangeKids}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="true">Yes</ToggleButton>
        <ToggleButton value="false">No</ToggleButton>
      </ToggleButtonGroup>

      {/* END KIDS */}
      <Divider></Divider>
      {/* DOGS BUTTON GROUP */}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        Good with Dogs
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={dogs}
        exclusive
        onChange={handleChangeDogs}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="true">Yes</ToggleButton>
        <ToggleButton value="false">No</ToggleButton>
      </ToggleButtonGroup>

      {/* END DOGS */}
      <Divider></Divider>
      {/* BREEDS */}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        Breeds
      </Typography>
      <Autocomplete
      disablePortal={true}
      id="combo-box-demo"
      options={Breeds.breeds}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="select" />}
    />
    {/* END BREEDS */}
      <Stack direction="row" spacing={6}align="center"  style={{ display: "flex", justifyContent: "center" , position: 'relative', top: '20px'}}>
        <Button
          variant="contained"
          endIcon={<SaveAltIcon />}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
console.log(Breeds)
  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <FilterAltIcon onClick={toggleDrawer(anchor, true)} />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
