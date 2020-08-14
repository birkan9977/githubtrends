
export default function urlMaker(filters){
  
  function languageCorrect(){ 

      let filterLanguage = ''
      if(filters.language==='c++'){
        filterLanguage = 'language:c%2B%2B'
      }else if (filters.language===''){
        filterLanguage = ''
      } else {
        filterLanguage = `language:${filters.language}`

      }

      return filterLanguage
  }

  

  const url = (`https://api.github.com/search/repositories?q=${filters.keyword} stars:>=${filters.stars} ${languageCorrect()} sort:stars`)
  

  console.log('dataMid/url',url)
  return url
  
}







