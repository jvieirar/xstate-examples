import { Machine, assign } from 'xstate';
import { auth } from './states/auth';

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
    auth,
  },
  on: {
    LOGIN: {
      target: 'auth.started',
    },
  },
});
