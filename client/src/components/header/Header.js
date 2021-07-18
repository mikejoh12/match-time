import React, { useState} from 'react';
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
import { UserRegisterDialog } from '../login/UserRegisterDialog';
import { UserLoginDialog } from '../login/UserLoginDialog';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: 'pointer'
     }
  }));

export const Header = () => {
    const classes = useStyles()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [openUserRegister, setOpenUserRegister] = useState(false)
    const handleOpenUserRegister = () => setOpenUserRegister(true)
    const handleCloseUserRegister = () => setOpenUserRegister(false)

    const [openUserLogin, setOpenUserLogin] = useState(false)
    const handleOpenUserLogin = () => setOpenUserLogin(true)
    const handleCloseUserLogin = () => setOpenUserLogin(false)

    const theme = useTheme();
    const showMenuButtons = useMediaQuery(theme.breakpoints.up('sm'))

    const handleLogoClick = () => history.push('/')
    const handleUserDashBoardClick = () => history.push('/user-dashboard')
    const handleBookingsClick = () => history.push('/bookings')
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" className={classes.title} onClick={handleLogoClick}>
                Calendar Booking App
            </Typography>
            {( showMenuButtons &&
              <div>
                <Button color="inherit" size="large" onClick={handleOpenUserLogin}>Login</Button>
                <Button color="inherit" size="large" onClick={handleOpenUserRegister}>Register</Button>
                <Button color="inherit" size="large" onClick={handleUserDashBoardClick}>Dash Board</Button>
                <Button color="inherit" size="large" onClick={handleBookingsClick}>Bookings</Button>

              </div> )}
            {( !showMenuButtons &&
            <div>
              <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                <MenuIcon fontSize="large" />
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
                  <MenuItem onClick={handleOpenUserLogin}>Login</MenuItem>
                  <MenuItem onClick={handleOpenUserRegister}>Register</MenuItem>
                  <MenuItem onClick={handleUserDashBoardClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleBookingsClick}>Bookings</MenuItem>
              </Menu>
            </div> )}
          </Toolbar>
        </AppBar>
        <UserRegisterDialog open={openUserRegister} handleClose={handleCloseUserRegister} />
        <UserLoginDialog open={openUserLogin} handleClose={handleCloseUserLogin} />
      </div>
    );
  }
