import React from 'react';
import ReactDOM from 'react-dom';

import { GlobalState } from './context/global';
import App from './App';

function Index() {
  return (
    <GlobalState>
      <App />
    </GlobalState>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
