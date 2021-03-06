import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// A wrapper for <Route> that redirects to the Login
// screen if you're not yet authenticated

export default function PrivateRoute({ children, machine, ...rest }) {
  const { user } = machine.context;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
}
