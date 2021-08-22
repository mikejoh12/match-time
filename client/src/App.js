import { Header } from './components/header/Header'
import { FacilityLogin } from './components/login/FacilityLogin'
import { Landing } from './components/landing/Landing'
import { UserDashboard } from './components/user-dashboard/UserDashboard'
import { Bookings } from './components/bookings/Bookings'
import { ManagerDashboard } from './components/manager-dashboard/ManagerDashboard'
import { FacilityMemberList } from './components/manager-dashboard/FacilityMemberList'
import { Account } from './components/account/Account'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import { PrivateRoute } from './utils/PrivateRoute'
import { ManagerFacilityEdit } from './components/manager-dashboard/ManagerFacilityEdit'
import MsgSnackbar from './utils/MsgSnackbar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
      margin: '20px'
  }
});

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <MsgSnackbar />
      <Router>
        <Header />
        <div className={classes.root}>
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

          <Route path="/:id" component={FacilityLogin} />

        </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
