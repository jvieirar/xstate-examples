import React, { useEffect } from 'react';

import { useGlobalContext } from '../../context/global';

interface Props {}

const Home = (props: Props) => {
  // properties
  const { machine, sendToMachine } = useGlobalContext();
  const { context: machineContext, value: machineValue } = machine;
  const { stories } = machineContext;

  // methods
  useEffect(() => {
    sendToMachine('LOAD_STORIES');
  }, []);

  // render
  return (
    <div>
      <h1>Home</h1>
      <div>Machine state: {JSON.stringify(machineValue, null, 2)}</div>
      <button
        onClick={() => {
          sendToMachine('RUN');
        }}
      >
        Set value to 'HI'
      </button>
      {stories &&
        stories.map((story) => (
          <div key={story.id}>
            {story.score}, {story.title}
          </div>
        ))}
    </div>
  );
};

export default Home;
