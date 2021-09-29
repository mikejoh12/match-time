import React, { Suspense } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme/theme'
import { PrivateRoute } from './utils/PrivateRoute'
import MsgSnackbar from './utils/MsgSnackbar'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, CssBaseline } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

// Dynamically imported components
const FacilityLogin = React.lazy(() => import('./components/login/FacilityLogin'))
const LoginWelcome = React.lazy(() => import('./components/login/LoginWelcome'))
const Landing = React.lazy(() => import('./components/landing/Landing'))
const UserDashboard = React.lazy(() => import('./components/user-dashboard/UserDashboard'))
const Bookings = React.lazy(() => import('./components/bookings/Bookings'))
const ManagerDashboard = React.lazy(() => import('./components/manager-dashboard/ManagerDashboard'))
const ManagerFacilityEdit = React.lazy(() => import('./components/manager-dashboard/ManagerFacilityEdit'))
const FacilityMemberList = React.lazy(() => import('./components/manager-dashboard/FacilityMemberList'))
const Account = React.lazy(() => import('./components/account/Account'))
const PasswordForgot = React.lazy(() => import('./components/login/PasswordForgot'))
const PasswordReset = React.lazy(() => import('./components/login/PasswordReset'))
const ConfirmEmail = React.lazy(() => import('./components/login/ConfirmEmail'))

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    overflow: 'hidden'
  },
  main: {
      minHeight: '200px',
      flex: 1
  },
  mainContent: {
      marginTop: 20
  }
});

export const Routes = () => {
  const classes = useStyles()
  
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
        <MsgSnackbar />
          <Box  display="flex"
                flexDirection="column"
                className={classes.root}>
            
            <Box className={classes.main}>
              <Grid container>
                <Grid item xs={12}>
                  <Header />
                </Grid>
                
                <Grid item 
                      container xs={12}
                      direction="column"
                      alignItems="center"
                      className={classes.mainContent}>

                    <Switch>

                      <Suspense fallback={
                        <Grid item container justifyContent="center">
                          <CircularProgress />
                        </Grid>
                      }>

                        <Route exact path="/" component={Landing} />

                        <PrivateRoute exact path="/user-dashboard">
                          <Route component={UserDashboard} />
                        </PrivateRoute>

                        <PrivateRoute exact path="/manager-dashboard">
                          <Route component={ManagerDashboard} />
                        </PrivateRoute>

                        <PrivateRoute exact path="/account">
                          <Route component={Account} />
                        </PrivateRoute>

                        <PrivateRoute exact path="/manager-facility-edit/:id">
                          <Route component={ManagerFacilityEdit} />
                        </PrivateRoute>

                        <PrivateRoute exact path="/manager-facility-edit/:id/members">
                          <Route component={FacilityMemberList} />
                        </PrivateRoute>

                        <PrivateRoute exact path="/bookings">
                          <Route component={Bookings} />
                        </PrivateRoute>

                        <PrivateRoute exact path="/select-facility">
                          <Route component={LoginWelcome} />
                        </PrivateRoute>


                        <Route exact path="/password-forgot" component={PasswordForgot} />
                        <Route path="/password-reset/:email/:token" component={PasswordReset} />
                        <Route path="/confirm-email/:email/:token" component={ConfirmEmail} />
                        <Route path="/facilities/:id" component={FacilityLogin} />
                      
                      </Suspense>

                    </Switch>

                </Grid>
              </Grid>
            </Box>

            <Footer />
          </Box>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </>
  )
};

const App = () => {
  return (
      <>
        <CssBaseline>
          <BrowserRouter>
              <Routes/>
          </BrowserRouter>
        </CssBaseline>
      </>
  );
}

export default App;
