import './App.css';
import './App.sass';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  
  return (
    <Router>
      <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;