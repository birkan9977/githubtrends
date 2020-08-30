import { createContext } from 'react';

export const InitialFetchOptions = {
  fetchOption: 'manuel', //fetchonchange
  hideOption: false,
  manualSubmit: false,
};

const FetchContext = createContext(InitialFetchOptions);
export const FetchProvider = FetchContext.Provider;
export default FetchContext;
