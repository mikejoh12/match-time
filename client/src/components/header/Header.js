import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const theme = useTheme();
    const showMenuButtons = useMediaQuery(theme.breakpoints.up('md'))


    const handleLogoClick = () => history.push('/')
    const handleUserDashBoardClick = () => history.push('/user-dashboard')
    const handleBookingsClick = () => history.push('/bookings')
    const handleLoginClick = () => history.push('/')
  
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {( !showMenuButtons &&
            <div>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
              >
                  <MenuItem onClick={handleUserDashBoardClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleBookingsClick}>Bookings</MenuItem>
                  <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              </Menu>
            </div> )}
            <Typography variant="h6" className={classes.title} onClick={handleLogoClick}>
                Calendar Booking App
            </Typography>
            {( showMenuButtons &&
              <div>
                <Button color="inherit" onClick={handleUserDashBoardClick}>Dash Board</Button>
                <Button color="inherit" onClick={handleBookingsClick}>Bookings</Button>
                <Button color="inherit" onClick={handleLoginClick}>Login</Button>
              </div> )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
