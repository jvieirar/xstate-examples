import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import { useGlobalContext } from './context/global';
import PrivateRoute from './components/PrivateRoute';
import styles from './App.module.scss';

interface Props {}

const App = (props: Props) => {
  // properties
  const { machine } = useGlobalContext();

  // methods

  // render
  return (
    <div className={styles.container}>
      <Router>
        <header>STATE MACHINE EXAMPLES</header>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute machine={machine} path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
