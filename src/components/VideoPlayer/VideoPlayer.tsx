import React, { useRef } from 'react';
import { useMachine } from '@xstate/react';
import { Machine, assign, actions } from 'xstate';

import { percentage, minutes, seconds } from './utils';

interface Props {}

const workoutVideo = document.getElementById('workoutVideo');
console.log({ workoutVideo });

const videoMachine = Machine({
  id: 'video',
  initial: 'loading',

  context: {
    video: null,
    duration: 0,
    elapsed: 0,
  },

  states: {
    loading: {
      on: {
        LOADED: {
          target: 'ready',
          actions: ['setVideo'],
        },
        FAIL: 'failure',
      },
    },
    ready: {
      initial: 'paused',
      states: {
        paused: {
          on: {
            PLAY: {
              target: 'playing',
              actions: ['setElapsed', 'playVideo'],
            },
          },
        },
        playing: {
          on: {
            TIMING: {
              target: 'playing',
              actions: 'setElapsed',
            },
            PAUSE: {
              target: 'paused',
              actions: ['setElapsed', 'pauseVideo'],
            },
            END: 'ended',
          },
        },
        ended: {
          on: {
            PLAY: {
              target: 'playing',
              actions: 'restartVideo',
            },
          },
        },
      },
    },
    failure: {
      type: 'final',
    },
  },
});

/**
 * Action functions
 */

const setVideo = assign({
  video: (_context, event) => event.video,
  duration: (_context, event) => event.video.duration,
});

const setElapsed = assign({
  elapsed: (context, _event) => context.video.currentTime,
});

const playVideo = (context, _event) => {
  const { video } = context;
  video.play();
};

const pauseVideo = ({ video }, _event) => {
  video.pause();
};

const restartVideo = ({ video }, _event) => {
  video.currentTime = 0;
  video.play();
};

const VideoPlayer = (props: Props) => {
  // properties
  const videoRef = useRef(null);
  const [current, send] = useMachine(videoMachine, {
    actions: { playVideo, pauseVideo, restartVideo, setVideo, setElapsed },
  });
  const { duration, elapsed } = current.context;

  // methods

  // render
  return (
    <div>
      <video
        width="640"
        height="320"
        controls
        ref={videoRef}
        onCanPlay={() => send('LOADED', { video: videoRef.current })}
        onError={() => send('FAIL')}
        onTimeUpdate={() => send('TIMING')}
        onEnded={() => send('END')}
      >
        <source src={workoutVideo.currentSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <ElapsedBar elapsed={elapsed} duration={duration} />
        <Buttons current={current} send={send} />
        <Timer elapsed={elapsed} duration={duration} />
      </div>
    </div>
  );
};

const Buttons = ({ current, send }) => {
  if (current.matches({ ready: 'playing' })) {
    return (
      <button
        onClick={() => {
          send('PAUSE');
        }}
      >
        Pause
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        send('PLAY');
      }}
    >
      Play
    </button>
  );
};

const ElapsedBar = ({ elapsed, duration }) => (
  <div className="elapsed">
    <div className="elapsed-bar" style={{ width: `${percentage(duration, elapsed)}%` }} />
  </div>
);

const Timer = ({ elapsed, duration }) => (
  <span className="timer">
    {minutes(elapsed)}:{seconds(elapsed)} of {minutes(duration)}:{seconds(duration)}
  </span>
);

export default VideoPlayer;
