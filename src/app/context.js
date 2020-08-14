import { createContext } from 'react';


export const InitialFilters = {
  
  stars:10000,
  language:'python',
  keyword:'',
  url:'https://api.github.com/search/repositories?q= stars:>=10000 language:python sort:stars',
  count:0,
  loading:false,
  
  }

const AppContext = createContext(InitialFilters)

export const AppProvider = AppContext.Provider

export default AppContext