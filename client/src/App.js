import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { FacilityLogin } from './components/login/FacilityLogin'
import { Landing } from './components/landing/Landing'
import { UserDashboard } from './components/user-dashboard/UserDashboard'
import { Bookings } from './components/bookings/Bookings'
import { ManagerDashboard } from './components/manager-dashboard/ManagerDashboard'
import { FacilityMemberList } from './components/manager-dashboard/FacilityMemberList'
import { Account } from './components/account/Account'
import { PasswordForgot } from './components/login/PasswordForgot'
import { PasswordReset } from './components/login/PasswordReset'
import { BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import { PrivateRoute } from './utils/PrivateRoute'
import { ManagerFacilityEdit } from './components/manager-dashboard/ManagerFacilityEdit'
import MsgSnackbar from './utils/MsgSnackbar'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh'
  },
  main: {
      minHeight: '200px',
      flex: 1
  },
  mainContent: {
      marginTop: 30
  }
});

export const Routes = () => {
  const classes = useStyles()
  
  return (
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
                    <Route exact path="/" component={Landing} />

                    <PrivateRoute path="/user-dashboard">
                      <Route component={UserDashboard} />
                    </PrivateRoute>

                    <PrivateRoute path="/manager-dashboard">
                      <Route component={ManagerDashboard} />
                    </PrivateRoute>

                    <PrivateRoute path="/account">
                      <Route component={Account} />
                    </PrivateRoute>

                    <PrivateRoute exact path="/manager-facility-edit/:id">
                      <Route component={ManagerFacilityEdit} />
                    </PrivateRoute>

                    <PrivateRoute exact path="/manager-facility-edit/:id/members">
                      <Route component={FacilityMemberList} />
                    </PrivateRoute>

                    <PrivateRoute path="/bookings">
                      <Route component={Bookings} />
                    </PrivateRoute>

                    <Route path="/password-forgot" component={PasswordForgot} />
                    <Route path="/password-reset/:email/:token" component={PasswordReset} />

                    <Route path="/:id" component={FacilityLogin} />
                    
                  </Switch>

              </Grid>
            </Grid>
          </Box>

          <Footer />
        </Box>
    </ThemeProvider>
  </MuiPickersUtilsProvider>
  )
};

const App = () => {
  return (
      <div>
          <BrowserRouter>
              <Routes/>
          </BrowserRouter>
      </div>
  );
}

export default App;
