import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import Home from './components/Home';
import { GlobalState } from './context/global';

function App() {
  return (
    <GlobalState>
      <Router>
        <header>STATE MACHINE EXAMPLES</header>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </GlobalState>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
