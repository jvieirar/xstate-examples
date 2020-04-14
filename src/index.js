import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  // properties
  const [counter, setCounter] = useState(0);

  // methods
  const handleClick = () => {
    setCounter((currCounter) => currCounter + 1);
  };

  // render
  return (
    <div>
      <h2>This is react</h2>
      <span>Counter: {counter}</span>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
