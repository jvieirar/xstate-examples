import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <header>STATE MACHINE EXAMPLES</header>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
