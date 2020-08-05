import React, { useState, useEffect} from 'react';



export default function DataLoader (props){
  

  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true)
  const[error,setError] = useState(null)

  console.log('Data/filterLanguage: ',props.filterLanguage)
  console.log('Data/filterStars>: ',props.filterStars)
  console.log('Data/filterKeyword>: ',props.filterKeyword)

  let filterLanguage = props.filterLanguage?`language:${props.filterLanguage}`:''

  let url = `https://api.github.com/search/repositories?q=${props.filterKeyword} stars:>${props.filterStars} ${filterLanguage} sort:stars`

  

  useEffect(() => {
    setLoading(true, props.loading(loading))
      fetch(url, {
        headers: {
          'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
          'Accept': 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => {
            setData(data.items, props.resultCount(data.items.length));
            setLoading(false, props.loading(loading))
          })
          .catch((err) => {
            setError(err);
            setLoading(false, props.loading(loading));
            console.log('error',err)
          })

          props.filteredUrl(url)
          props.loading(loading)
        
  },[url]); 
  

  
  let noItem = 0
  function noItemIncrement(){
    noItem ++

    return noItem
  };

  

  function language(codeLanguage){
  if (codeLanguage!=null){
     return (
        <>
        {/*<span>Language</span>*/}
        <p>{codeLanguage}</p>
        </>
       )
  } 
}

let keyIndex = (function () {
  let counter = 0
  return function () {counter += 1; return counter}
})();//closure:)


function textminimize(text){
  if(text==null)return text
  let len = text.length;
  let maxlen = 100;
  if(len>maxlen){
    let finaltext = text.substr(0,maxlen) + ' ...more'
    return finaltext

  }else{
    return text
  }


}


function displayresults(){
  let displaytext=''

    if(loading){
      displaytext = 'Loading Data Please Wait...'
    }else{
      if(props.count>0){
        displaytext =  `Displaying ${props.count} results.`
      } else {
        displaytext = 'Change Search Criteria'
      }
    }
    return displaytext
}



  return (
      
      <div>
        <p>{displayresults()}</p>
        <p>{error?console.log(`Error: ${error}`):null}</p>
          <ul>
            {data?data.map((item) =>
            <>
            <div id='repo-items'>
              <div id='repo-list-items'>
                <div id='order-number'>
                {noItemIncrement()}
                </div>

                <li id='repo-list-items-name' 
                key = {keyIndex()+'id'+item.id}>{item.name}</li>
                
                <li id='repo-list-items-description' 
                key = {keyIndex()+'des' + item.id}>{textminimize(item.description)}</li>
                
                
                <li id='repo-list-items-url' 
                key = {keyIndex()+'url' + item.id}><a href={item.html_url} target='_blank' rel="noopener">GitHub Link</a></li>
                
                
                <li id='repo-list-items-stars' 
                key = {keyIndex()+'star' + item.id}>{item.stargazers_count} Stars</li>
                
              </div>
                
            <div id= 'repo-user-items'>
              <div id = 'repo-list-items-img'>
                <li id='repo-list-items-img-list' 
                key = {keyIndex()+'lan' + item.id}>
                {language(item.language)}
                
                
                </li>

                <figure id='repo-img-figure'><img src={item.owner.avatar_url} alt={item.login}></img>
                <figcaption id= 'repo-img-caption'>{item.owner.login}</figcaption>
                </figure>
              </div>
            </div>
                
            </div>
            </>
            ):<p>{console.log('no data')}Search Filters returned no results. Try changing search filters.</p>}
          </ul>
      </div>

  )
}