// TODO import types

export default function GlobalReducer(state, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'UPDATE_MACHINE':
      return { ...state, machine: action.payload };
    // case 'SEND_EVENT_TO_MACHINE':
    //   const { sendToMachine } = state;
    //   const event = action.payload;
    //   const returnedMachine = sendToMachine(event);
    //   return { ...state, machine: returnedMachine };
    default:
      return state;
  }
}
