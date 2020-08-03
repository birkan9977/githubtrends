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
  
  
  let keyIndex = 100;
  function keyIndexIncrement(){
    keyIndex ++
    return keyIndex
  };
  

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
            {data?data.map((item,index) =>
            <>
            <div id='repo-items'>
                <div id='repo-list-items'>
                <div id='order-number'>
                {noItemIncrement()}
                </div>
                <li id='repo-list-items-name' key = {index+keyIndexIncrement()+'id'+item.id}>{item.name}</li>
                {/*console.log(keyIndex)*/}
                <li id='repo-list-items-description' key = {index+keyIndexIncrement()+'des' + item.id}>{textminimize(item.description)}</li>
                {/*console.log(keyIndex)*/}
                <li id='repo-list-items-url' key = {index+keyIndexIncrement()+'url' + item.id}><a href={item.html_url} target='_blank' rel="noopener">{item.html_url}</a></li>
                {/*console.log(keyIndex)*/}
                <li id='repo-list-items-stars' key = {index+keyIndexIncrement()+'star' + item.id}>{item.stargazers_count} Stars</li>
                {/*console.log(keyIndex)*/}
                </div>
            <div id= 'repo-user-items'>
              <div id = 'repo-list-items-img'>
                <li id='repo-list-items-img-list' 
                key = {index+keyIndexIncrement()+'lan' + item.id}>
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