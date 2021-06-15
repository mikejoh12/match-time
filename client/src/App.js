import { Header } from './components/header/Header'
import { FacilityLogin } from './components/login/FacilityLogin'
import { Landing } from './components/landing/Landing'
import { UserDashboard } from './components/dashboard/UserDashboard'
import { ManagerDashboard } from './components/dashboard/ManagerDashboard'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (

    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user-dashboard" component={UserDashboard} />
        <Route exact path="/manager-dashboard" component={ManagerDashboard} />
        <Route path="/:id" component={FacilityLogin} />
      </Switch>
    </Router>
  );
}

export default App;
