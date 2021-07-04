import { Header } from './components/header/Header'
import { FacilityLogin } from './components/login/FacilityLogin'
import { Landing } from './components/landing/Landing'
import { UserDashboard } from './components/dashboard/UserDashboard'
import { Bookings } from './components/bookings/Bookings'
import { ManagerDashboard } from './components/dashboard/ManagerDashboard'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { ManagerFacilityEdit } from './components/dashboard/ManagerFacilityEdit'

function App() {
  return (

    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user-dashboard" component={UserDashboard} />
        <Route exact path="/manager-dashboard" component={ManagerDashboard} />
        <Route exact path="/manager-facility-edit/:id" component={ManagerFacilityEdit} />
        <Route exact path="/bookings" component={Bookings} />
        <Route path="/:id" component={FacilityLogin} />
      </Switch>
    </Router>
  );
}

export default App;
