import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Drawer from './Drawer';
import { Link } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Drawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
          <PetsIcon style={{position: 'relative', top: '3px', right: "4px"}}/>
            Puppy Love 
          </Typography>
            <Link to="/likedCard" style={{ color: 'white' }}><FavoriteIcon /><ArrowForwardIosIcon/></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}