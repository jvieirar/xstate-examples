import React, { useReducer } from 'react';

import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';

export default function GlobalState(pageProps) {
  // properties
  const initialState = {
    machine: null,
    value: null,
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // methods
  const setValue = (value) => {
    dispatch({ type: 'SET_VALUE', payload: value });
  };

  // Provider
  return (
    <GlobalContext.Provider value={{ machine: state.machine, value: state.value, setValue }}>
      {pageProps.children}
    </GlobalContext.Provider>
  );
}
