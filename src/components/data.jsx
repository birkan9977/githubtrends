import React, { useState, useEffect} from 'react';



export default function DataLoader (props){
  

  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true)
  const[error,setError] = useState(null)
  
  console.log('DataLoader/filterLanguage: ',props.filterlanguage)
  console.log('DataLoader/filterFollowers>: ',props.filterFollowers)
  
  let url = `https://api.github.com/search/repositories?q=followers:>${props.filterFollowers} language:${props.filterlanguage} sort:stars`
  console.log(url)

  useEffect(() => {

      fetch(url, {
        headers: {
          'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
          'Accept': 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => {
            setData(data.items);
            setLoading(false)
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
            console.log('error',err)
          })
  },[url]); 
  
  
  let keyIndex = (function () {
    let counter = 0;
    return function () {counter += 1; return counter}
  })();//closure:)

  let noItem = ''
  function noItemIncrement(){
    noItem ++
    return noItem
  };
  
  function language(codeLanguage){
  if (codeLanguage!=null){
     return (
        <>
        <span>Language</span>
        <p>{codeLanguage}</p>
        </>
       )
  } 
}

function textminimize(text){
  if(text==null)return text
  let len = text.length;
  let maxlen = 150;
  if(len>maxlen){
    let finaltext = text.substr(0,maxlen) + ' ...more'
    return finaltext

  }else{
    return text
  }


}

  return (
    
      
      <div>
        <p>{loading?'Loading Data':null}</p>
        <p>{error?`Error:$(error)`:null}</p>
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
                key = {keyIndex()+'url' + item.id}><a href={item.html_url} target='_blank' rel="noopener noreferrer">{item.html_url}</a></li>
                
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
            ):null}
          </ul>
      </div>

  )
}