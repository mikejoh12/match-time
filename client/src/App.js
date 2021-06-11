import { FacilityLogin } from './components/login/FacilityLogin'
import { Landing } from './components/landing/Landing'
import { Dashboard } from './components/dashboard/Dashboard';
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/:id" component={FacilityLogin} />
      </Switch>
    </Router>
  );
}

export default App;
