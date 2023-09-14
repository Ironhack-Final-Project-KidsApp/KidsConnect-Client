import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";      
import { AuthContext } from "../context/auth.context"
import logo from '../assets/logo2-removebg-preview.png';
import smilelogo from '../assets/logo2justsmile.png';
import { AppBar, Box, Button, Divider, List, ListItemText, SwipeableDrawer, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const anchor = 'right';
  const [state, setState] = useState({right: false,});
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleButton = (text) => {
    if(text === 'Home'){
      navigate(`/`);
    }
    if(text === 'Profile'){
      navigate(`/profile/${user._id}`);
    }
    if(text === 'Create Activity'){
      navigate(`/create-activity`);
    }
    if(text === 'User Tips'){
      navigate("/usertips");
    }
    if(text === 'Logout'){
      logOutUser();
      navigate("/");
    }
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Profile', 'Create Activity'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>handleButton(text)}>
              <ListItemIcon>
                {text === 'Home' && <HomeIcon/>}
                {text === 'Profile' && <PersonIcon/>}
                {text === 'Create Activity' && <CreateIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['User Tips', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>handleButton(text)}>
              <ListItemIcon>
                {text === 'User Tips' && <TipsAndUpdatesIcon/>}
                {text === 'Logout' && <LogoutIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{backgroundColor:'white'}}>
      <Toolbar  sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between'}}>
        <NavLink to="/">
          {!isLoggedIn && <img src={smilelogo} alt="logo" style={{width: '3.5rem'}}/>}
          {isLoggedIn && <img src={logo} alt="logo" style={{height: '4rem'}}/>}
        </NavLink>
        
        {!isLoggedIn && 
          <NavLink to="/login">
            <Button variant="outlined" size="small">
              Log In
            </Button>
          </NavLink>
        }
        {isLoggedIn && 
        <>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon/>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </>
        }
        
      </Toolbar>
    </AppBar>
  );
}
 
export default Navbar;