import { createContext } from 'react';
import urlMaker from '../components/urlmaker'


export const InitialFilters = {
  
  stars:10000,
  language:'Python',
  keyword:'',
  url:'https://api.github.com/search/repositories?q= stars:>=10000 language:python sort:stars',
  count:0,
  loading:true,
  
  }

  export let LoadedFilters = {
    ...InitialFilters,
            language : sessionStorage.getItem('language')?sessionStorage.getItem('language'):InitialFilters.language,
            stars : sessionStorage.getItem('stars')?sessionStorage.getItem('stars'):InitialFilters.stars,
            keyword : sessionStorage.getItem('keyword')?sessionStorage.getItem('keyword'):InitialFilters.keyword,
            count:InitialFilters.count,
            loading:InitialFilters.loading,
          }
          
          const url = urlMaker(LoadedFilters)

          LoadedFilters = {
            ...LoadedFilters,
            url:url
          }


          

console.log(InitialFilters)
const AppContext = createContext(LoadedFilters)

export const AppProvider = AppContext.Provider

export default AppContext