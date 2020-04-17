import { Machine } from 'xstate';

export default Machine({
  id: 'machine',
  initial: 'init',
  context: {
    user: null,
  },
  states: {
    init: { on: { RUN: 'running' } },
    running: {},
    auth: {
      states: {
        started: {},
        success: {},
        fail: {},
      },
    },
  },
});
