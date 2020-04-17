import { Machine, assign } from 'xstate';

const doLogin = async (context, event) => {
  // assign({ user: { username: event.username, password: event.password } });
  const { username, password } = event;
  console.log({ username, password });

  return { username, password };
};

export default Machine({
  id: 'machine',
  initial: 'init',
  context: {
    user: null,
    error: null,
  },
  states: {
    init: { on: { RUN: 'running' } },
    running: {},
    auth: {
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
    },
  },
  on: {
    LOGIN: {
      target: 'auth.started',
    },
  },
});
