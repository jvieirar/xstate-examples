import { assign } from 'xstate';

const doLogin = async (context, event) => {
  // assign({ user: { username: event.username, password: event.password } });
  const { username, password } = event;
  console.log({ username, password });

  if (username !== 'hello' || password !== '1234') {
    throw new Error('Wrong username or password');
  }

  return { username, password };
};

export const auth = {
  states: {
    started: {
      invoke: {
        id: 'doLogin',
        src: doLogin,
        onDone: {
          target: 'success',
          actions: assign({ user: (_context, event) => event.data }),
        },
        onError: {
          target: 'fail',
          actions: assign({ error: (_context, event) => event.data }),
        },
      },
    },
    success: {},
    fail: {},
  },
};
