import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';

function app() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default app;