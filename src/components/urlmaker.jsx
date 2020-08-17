
export default function urlMaker(filters){
  
  function languageCorrect(){ 

      let filterLanguage = ''
      if(filters.language==='C++'){
        filterLanguage = 'language:C%2B%2B'
      }else if(filters.language==='C#'){
        filterLanguage = 'language:C%23'
      }else if (filters.language==='All'){
        filterLanguage = ''
      } else {
        filterLanguage = `language:${filters.language}`

      }

      return filterLanguage
  }

  

  const url = (`https://api.github.com/search/repositories?q=${filters.keyword} stars:>=${filters.stars} ${languageCorrect()} sort:stars`)
  

  //console.log('urlMaker',url)
  return url
  
}







