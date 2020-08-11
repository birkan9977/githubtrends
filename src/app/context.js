import {createContext} from 'react';


export const InitialFilters = {
  stars:10000,
  language:'python',
  keyword:'',
  url:'',
  count:0,
  loading:false,
  setFilter: () => {},
}

const AppContext = createContext(InitialFilters)

export const AppProvider = AppContext.Provider

export const AppConsumer = AppContext.Consumer

export default AppContext