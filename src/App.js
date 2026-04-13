import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
