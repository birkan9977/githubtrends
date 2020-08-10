import {createContext} from 'react';


export const Filters = {
  stars:'10000',
  language:'python',
  keyword:'',
  url:'',
  count:0,
  loading:false,
  setFilter: () => {},
}

const AppContext = createContext(Filters)

export const AppProvider = AppContext.Provider

export const AppConsumer = AppContext.Consumer

export default AppContext