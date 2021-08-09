import { Header } from './components/header/Header'
import { FacilityLogin } from './components/login/FacilityLogin'
import { Landing } from './components/landing/Landing'
import { UserDashboard } from './components/user-dashboard/UserDashboard'
import { Bookings } from './components/bookings/Bookings'
import { ManagerDashboard } from './components/manager-dashboard/ManagerDashboard'
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MsgSnackbar />
      <Router>
        <Header />
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

          <PrivateRoute path="/manager-facility-edit/:id">
            <Route component={ManagerFacilityEdit} />
          </PrivateRoute>

          <PrivateRoute path="/bookings">
            <Route component={Bookings} />
          </PrivateRoute>

          <Route path="/:id" component={FacilityLogin} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
