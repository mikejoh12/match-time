import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export const Header = () => {
    const classes = useStyles()
    const history = useHistory()

    const handleLogoClick = () => history.push('/')
    const handleUserDashBoardClick = () => history.push('/user-dashboard')
    const handleBookingsClick = () => history.push('/bookings')
    const handleLoginClick = () => history.push('/login')

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} onClick={handleLogoClick}>
                Calendar Booking App
            </Typography>
            <Button color="inherit" onClick={handleUserDashBoardClick}>Dash Board</Button>
            <Button color="inherit" onClick={handleBookingsClick}>Bookings</Button>
            <Button color="inherit" onClick={handleLoginClick}>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
