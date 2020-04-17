import { Machine, assign } from 'xstate';
import axios from 'axios';
import { auth } from './states/auth';

const storiesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const getStoryDataURL = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchStores = async () => {
  const { data: storiesIds } = await axios.get(storiesUrl);
  console.log({ storiesIds });

  if (storiesIds) {
    const topTen = storiesIds.slice(0, 10);
    const stories = await Promise.all(topTen.map((id) => axios.get(getStoryDataURL(id))));
    // console.log({ stories });
    return stories.map((story) => story.data).sort((a, b) => b.score - a.score);
  } else {
    console.warn('No stories found');
    return [];
  }
};

export default Machine({
  id: 'machine',
  initial: 'init',
  context: {
    user: null,
    error: null,
    stores: [],
  },
  states: {
    init: { on: { RUN: 'running' } },
    running: {},
    auth,
    list: {
      // initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetchStores',
            src: fetchStores,
            onDone: {
              target: 'success',
              actions: assign({ stories: (_context, event) => event.data }),
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
    LOAD_STORIES: {
      target: 'list.loading',
    },
  },
});
