import React from 'react';

import { useGlobalContext } from '../../context/global';

interface Props {}

const Home = (props: Props) => {
  const { machine, sendToMachine, sendEventToMachine } = useGlobalContext();

  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>{JSON.stringify(machine, null, 2)}</li>
        <li>{machine.value}</li>
      </ul>
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
