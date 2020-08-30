import { createContext } from 'react';

export const InitialFetchOptions = {
  fetchOption: 'manual', //fetchonchange
  hideOption: false,
  manualSubmit: false,
  display: false,
};

const FetchContext = createContext(InitialFetchOptions);
export const FetchProvider = FetchContext.Provider;
export default FetchContext;
