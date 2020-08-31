import React, { useReducer } from 'react';
import { FetchProvider, FetchOptionsLoaded } from '../app/fetchContext';
import FetchOptionsReducer from './fetchReducer';

const FetchStore = (props) => {
  const [fetchOptions, dispatchFetchOptions] = useReducer(
    FetchOptionsReducer,
    FetchOptionsLoaded
  );
  return (
    <FetchProvider value={{ fetchOptions, dispatchFetchOptions }}>
      {props.children}
    </FetchProvider>
  );
};

export default FetchStore;
