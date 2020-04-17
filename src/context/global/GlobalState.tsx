import React, { useReducer, useEffect } from 'react';
import { useMachine } from '@xstate/react';

import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';
import GlobalMachine from './GlobalMachine';

export default function GlobalState(pageProps) {
  // properties
  const [currentMachine, sendToMachine] = useMachine(GlobalMachine);

  const initialState = {
    machine: currentMachine,
    sendToMachine,
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // methods
  useEffect(() => {
    dispatch({ type: 'UPDATE_MACHINE', payload: currentMachine });
  }, [currentMachine]);

  const sendEventToMachine = (event) => {
    sendToMachine(event);
    // dispatch({ type: 'SEND_EVENT_TO_MACHINE', payload: event });
  };

  // Provider
  return (
    <GlobalContext.Provider
      value={{
        machine: state.machine,
        sendToMachine,
        sendEventToMachine,
      }}
    >
      {pageProps.children}
    </GlobalContext.Provider>
  );
}
