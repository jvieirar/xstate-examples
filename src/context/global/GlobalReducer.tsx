// TODO import types

export default function GlobalReducer(state, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, value: action.payload };

    default:
      return state;
  }
}
