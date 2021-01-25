import React, { useState } from 'react'

// Material imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import axios from 'axios';

import { useSnackbar } from 'notistack'

import ListDrawer from './ListDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

function Navbar(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleTheme = () => {
    const darkMode = !props.darkMode
    localStorage.setItem('darkMode', darkMode)
    props.setDarkMode(darkMode)
  }

  const handleLogout = () => {
    axios.post(process.env.REACT_APP_API_URL + 'auth/logout', {}, {
      withCredentials: true
    })
    .then(res => {
      handleClose()
      enqueueSnackbar(res.data.msg, {
        variant: 'info'
      })
      props.onLogout()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleAccount = () => {
    // TODO: open modal to edit account
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} color="inherit">
            Progress
          </Typography>
          <div>
            <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={toggleTheme}>
              {props.darkMode && <Brightness7Icon />}
              {!props.darkMode && <Brightness4Icon />}
            </IconButton>
            <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleClick}>
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleAccount}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <ListDrawer 
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      />
    </div>
  )

}

export default Navbar 