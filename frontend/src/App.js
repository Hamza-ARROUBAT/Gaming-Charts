import Charts from 'pages/Charts';
import Home from 'pages/Home';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import AppLayout from 'AppLayout';

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/charts">
            <Charts />
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
}
