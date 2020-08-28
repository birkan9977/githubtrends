import React, { useReducer } from 'react';
import { AppProvider, LoadedFilters } from '../app/context';
import reducer from './reducer';

const Store = (props) => {
  const [filters, dispatch] = useReducer(reducer, LoadedFilters);
  return (
    <AppProvider value={{ filters, dispatch }}>{props.children}</AppProvider>
  );
};

export default Store;
