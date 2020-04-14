import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './index.module.scss';

const App = () => {
  // properties
  const [counter, setCounter] = useState<number>(0);

  // methods
  const handleClick = () => {
    setCounter((currCounter) => currCounter + 1);
  };

  // render
  return (
    <main className={styles.main}>
      <h2>This is react</h2>
      <span>Counter: {counter}</span>
      <button onClick={handleClick}>Increase</button>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
