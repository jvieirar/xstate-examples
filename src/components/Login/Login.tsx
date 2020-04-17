import React, { useRef } from 'react';

import { useGlobalContext } from '../../context/global';

interface Props {}

const Login = (props: Props) => {
  // properties
  const { machine, sendEventToMachine, sendToMachine } = useGlobalContext();
  const { context: machineContext, value: machineValue } = machine;
  const userRef = useRef(null);
  const pwdRef = useRef(null);

  // methods
  const handleLoginClick = () => {
    const username = userRef.current.value;
    const pwd = pwdRef.current.value;
    console.log({ username, pwd });
    sendToMachine('LOGIN', { username, password: pwd });
  };

  // render
  return (
    <div>
      <h1>Login</h1>
      <div>{JSON.stringify(machineValue, null, 2)}</div>
      <div>
        <input type="text" placeholder="username" ref={userRef} />
      </div>
      <div>
        <input type="password" placeholder="password" ref={pwdRef} />
      </div>
      <div>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
