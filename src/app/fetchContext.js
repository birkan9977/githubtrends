import { createContext } from 'react';

export const InitialFetchOptions = {
  fetchOption: 'fetchonchange', //params@ fetchonchange || manual
  hideOption: false,
  manualSubmit: false,
  display: false,
};

export let FetchOptionsLoaded = {
  ...InitialFetchOptions,
  fetchOption: sessionStorage.getItem('fetchOption')
    ? sessionStorage.getItem('fetchOption')
    : InitialFetchOptions.fetchOption,
  hideOption: sessionStorage.getItem('hideOption')
    ? JSON.parse(sessionStorage.getItem('hideOption'))
    : InitialFetchOptions.hideOption,
};

const FetchContext = createContext(FetchOptionsLoaded);
export const FetchProvider = FetchContext.Provider;
export default FetchContext;
