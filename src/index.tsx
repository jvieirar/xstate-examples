import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';

import VideoPlayer from './VideoPlayer';
// @ts-ignore
import styles from './index.module.scss';

const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const perPage = 10;

// @ts-ignore
const dataMachine = Machine({
  id: 'dataMachine',
  initial: 'loading',
  context: {
    data: [],
  },
  states: {
    loading: {
      invoke: {
        id: 'dataLoader',
        src: (context, _event) => {
          return (callback, _onEvent) => {
            setTimeout(() => {
              const { data } = context;
              const newData = allData.slice(data.length, data.length + perPage);
              const hasMore = newData.length === perPage;
              if (hasMore) {
                callback({ type: 'DONE_MORE', newData });
              } else {
                callback({ type: 'DONE_COMPLETE', newData });
              }
              // on real call will catch error and callback to fail event
            }, 1000);
          };
        },
      },
      on: {
        DONE_MORE: {
          target: 'more',
          actions: assign({
            // data: (context, event) => [...context.data, ...event.newData],
            data: ({ data }, { newData = [] }) => [...data, ...newData],
          }),
        },
        DONE_COMPLETE: {
          target: 'complete',
          actions: assign({
            // data: (context, event) => [...context.data, ...event.newData],
            data: ({ data }, { newData = [] }) => [...data, ...newData],
          }),
        },
        FAIL: 'failure',
      },
    },
    more: {
      on: {
        LOAD: 'loading',
      },
    },
    complete: {
      type: 'final',
    },
    failure: {
      type: 'final',
    },
  },
});

const App = () => {
  // properties
  const [current, send] = useMachine(dataMachine);
  const { data } = current.context;

  // methods

  // render
  return (
    <main className={styles.main}>
      <div>
        <h2>XState</h2>
        <h3>State: {current.value}</h3>
        <ul>
          {data.map((row) => (
            <li key={row}>{row}</li>
          ))}
          {current.matches('loading') && <li>...loading</li>}
          {current.matches('more') && (
            <li>
              <button
                onClick={() => {
                  send('LOAD');
                }}
              >
                Load More
              </button>
            </li>
          )}
        </ul>
      </div>
      {/* <VideoPlayer /> */}
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
