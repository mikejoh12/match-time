import { FacilityLogin } from './components/login/FacilityLogin'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (

    <Router>
      <Switch>
        <Route path="/:id" component={FacilityLogin} />
      </Switch>
    </Router>
  );
}

export default App;
