import React from 'react';

import { useGlobalContext } from '../../context/global';

interface Props {}

const Home = (props: Props) => {
  const { machine, value, setValue } = useGlobalContext();

  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>{machine}</li>
        <li>{value}</li>
      </ul>
      <button onClick={() => setValue('HI')}>Set value to 'HI'</button>
    </div>
  );
};

export default Home;
