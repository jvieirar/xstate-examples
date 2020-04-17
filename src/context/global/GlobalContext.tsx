import { createContext, useContext } from 'react';

const GlobalContext = createContext();

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('You probably forgot to add <GlobalState> provider');
  } else {
    return context;
  }
};
