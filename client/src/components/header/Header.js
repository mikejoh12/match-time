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
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { UserRegisterDialog } from '../login/dialogs/UserRegisterDialog';
import { UserLoginDialog } from '../login/dialogs/UserLoginDialog';
import { logout } from '../../features/auth/authUserSlice';
import { selectFacilityIsLoaded, selectFacility } from '../../features/current-facility/currentFacilitySlice'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth'
import { openLoginDialog, openRegisterDialog, showSnackbar } from '../../features/ui/uiSlice';
import { Grid } from '@material-ui/core';
import { useLogoutClearCookieMutation } from '../../services/api';

const font = "'Rubik', sans-serif;";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    topMsgBar: {
      backgroundColor: theme.palette.primary.dark,
    },
    topMsg: {
      color: theme.palette.common.white,
      padding: 2
    },
    appBar: {
      backgroundColor: theme.palette.primary.light,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: 'pointer',
      fontFamily: font,
      color: theme.palette.common.logo
     },
  }));

export const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [ logoutClearCookie ] = useLogoutClearCookieMutation()

    const handleOpenUserRegister = () => {
      dispatch(openRegisterDialog());
      setAnchorEl(null);
    }

    const handleOpenUserLogin = () => {
      dispatch(openLoginDialog());
      setAnchorEl(null);
    }

    const { user } = useAuth()
    const facilityIsLoaded = useSelector(selectFacilityIsLoaded)
    const facility = useSelector(selectFacility)

    const handleUserLogout = () => {
      dispatch(logout())
      logoutClearCookie()
      dispatch(showSnackbar({
        message: `User has been logged out`,
        severity: 'success'
        })
      )
      history.push('/')
    }

    const theme = useTheme();
    const showMenuButtons = useMediaQuery(theme.breakpoints.up('md'))

    const handleLogoClick = () => history.push('/')
    
    const handleSelectFacilityClick = () => {
      history.push('/select-facility');
      setAnchorEl(null);
    }

    const handleUserDashBoardClick = () => {
      history.push('/user-dashboard');
      setAnchorEl(null);
    }

    const handleManageClick = () => {
      history.push('/manager-dashboard');
      setAnchorEl(null);
    }

    const handleBookingsClick = () => {
      history.push('/bookings');
      setAnchorEl(null);
    }

    const handleAccountClick = () => {
      history.push('/account');
      setAnchorEl(null);
    }

    const handleMenu = event => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null);

    return (
      <div className={classes.root}>
        <Grid className={classes.topMsgBar}
              container
              direction="column"
              alignItems="center">
          <Grid item>
            { user ?
            <Typography variant="subtitle1" className={classes.topMsg}>
              { `${user.email} - `} { facility?.name ? facility?.name : 'No facility selected'} 
            </Typography>
          :    
            <Typography variant="subtitle2" align="center" className={classes.topMsg}>
              Log in to gain access to manager/member features
            </Typography>
            }
          </Grid>
        </Grid>
        <AppBar position="static" className={classes.appBar}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="h4" className={classes.title} onClick={handleLogoClick}>
                  MATCHTIME
              </Typography>
              {( showMenuButtons &&
                <>
                  { user ?
                    <Button data-testid='logout-button' color="inherit" size="medium" onClick={handleUserLogout}>Logout</Button>
                    :
                    <Button data-testid='login' color="inherit" size="medium" onClick={handleOpenUserLogin}>Login</Button>
                  }
                  { !user && <Button color="inherit" size="medium" onClick={handleOpenUserRegister}>Register</Button> }
                  { user && <Button color="inherit" size="medium" onClick={handleSelectFacilityClick}>Select Facility</Button>}
                  { (user && facilityIsLoaded) && <Button color="inherit" size="medium" onClick={handleUserDashBoardClick}>Schedule</Button> }
                  { user && <Button data-testid='manage-nav-button' color="inherit" size="medium" onClick={handleManageClick}>Manage</Button>}
                  { user && <Button data-testid='bookings-nav-button'color="inherit" size="medium" onClick={handleBookingsClick}>Bookings</Button> }
                  { user && <Button data-testid='account-nav-button' color="inherit" size="medium" onClick={handleAccountClick}>Account</Button> }

                </> )}
              {( !showMenuButtons &&
              <>
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
                    { user ?
                    <MenuItem data-testid='logout-button' onClick={handleUserLogout}>Logout</MenuItem>
                    :
                    <MenuItem data-testid='login' onClick={handleOpenUserLogin}>Login</MenuItem>
                    }
                    { !user && <MenuItem onClick={handleOpenUserRegister}>Register</MenuItem> }
                    { user && <MenuItem onClick={handleSelectFacilityClick}>Select Facility</MenuItem> }
                    { (user && facilityIsLoaded) && <MenuItem onClick={handleUserDashBoardClick}>Schedule</MenuItem> }
                    { user && <MenuItem data-testid='manage-nav-button' onClick={handleManageClick}>Manage</MenuItem>}
                    { user && <MenuItem  data-testid='bookings-nav-button' onClick={handleBookingsClick}>Bookings</MenuItem> }
                    { user && <MenuItem data-testid='account-nav-button' onClick={handleAccountClick}>Account</MenuItem> }
                </Menu>
              </> )}
            </Toolbar>
          </Container>
        </AppBar>
        <UserRegisterDialog />
        <UserLoginDialog />
      </div>
    );
  }
