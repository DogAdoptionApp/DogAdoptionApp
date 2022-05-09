import * as React from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// gender toggle button group
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// save button
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Stack from '@mui/material/Stack';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({left: false});

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

//gender ToggleButtonGroup functionality
  const [gender, setGender] = React.useState('');
  const handleChangeGender = (event, chosenGender) => {
    setGender(chosenGender);
  };
//gender END


  const list = (anchor) => (
    <Box sx={{ width: '75vw' }} role="presentation">
    <ToggleButtonGroup
      color="primary"
      value={gender}
      exclusive
      onChange={handleChangeGender}
    >
      <ToggleButton value="male">Male</ToggleButton>
      <ToggleButton value="female">Female</ToggleButton>
      {/* <ToggleButton value="ios">Both</ToggleButton> */}
    </ToggleButtonGroup>
    <Divider></Divider>
    <Stack direction="row" spacing={6}>

      <Button variant="contained" endIcon={<SaveAltIcon />}  onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
        Save
      </Button>
    </Stack>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <FilterAltIcon onClick={toggleDrawer(anchor, true)}/>
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


