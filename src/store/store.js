import React, { useReducer } from 'react'
import { AppProvider, InitialFilters } from '../app/context'
import reducer from './reducer'

const Store = props => {
  const [filters, dispatch] = useReducer(reducer, InitialFilters);
  return (
    <AppProvider value={{ filters, dispatch }}>
      {props.children}
    </AppProvider>
  )
}

export default Store