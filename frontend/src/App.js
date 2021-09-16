import Charts from "pages/Charts";
import Home from "pages/Home";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from 'react-router';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/charts">
          <Charts />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
