import React from 'react';

import { useGlobalContext } from '../../context/global';

interface Props {}

const Home = (props: Props) => {
  const { machine, sendEventToMachine } = useGlobalContext();
  const { context: machineContext, value: machineValue } = machine;

  return (
    <div>
      <h1>Home</h1>
      <div>Machine state: {JSON.stringify(machineValue, null, 2)}</div>
      <button
        onClick={() => {
          sendEventToMachine('RUN');
        }}
      >
        Set value to 'HI'
      </button>
    </div>
  );
};

export default Home;
