import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextMinimize,
  ItemIncrement,
  keyIndex,

 } from '../extraFunctions/dataFunctions'

import {
  resultCount,
  filteredUrl,
  loadingFunc,
  selectLanguage,
  selectStars,
  selectKeyword,
  selectCount,


} from '../app/filterslice'

export default function DataLoader (){
  const globCount = useSelector(selectCount);
  const globStars = useSelector(selectStars);
  const globLanguage = useSelector(selectLanguage);
  const globkeyword = useSelector(selectKeyword);

  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true)
  const[error,setError] = useState(null)

  const dispatch = useDispatch()

  console.log('Data/filterLanguage: ',globLanguage)
  //console.log('Data/filterStars>: ',globStars)
  //console.log('Data/filterKeyword>: ',reduxloading)

  let filterLanguage = ''
  if(globLanguage==='c++'){
    filterLanguage = 'language:c%2B%2B'
  }else if (globLanguage===''){
    filterLanguage = ''
  } else {
    filterLanguage = `language:${globLanguage}`

  }

  let url = `https://api.github.com/search/repositories?q=${globkeyword} stars:>=${globStars} ${filterLanguage} sort:stars`

  

  const setReadMoreEmpty = () => []
  

  useEffect(() => {

    const itemsCount = (len) => dispatch(resultCount(len))

    setLoading(true)

    setReadMoreEmpty()

    setError(null)

      fetch(url, {
        headers: {
          'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
          'Accept': 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => {
            setData(data.items)
            setLoading(false)
        
            itemsCount(data.items.length)
           
          })
          .catch((err) => {
            setError(err);
            console.log('error',err)
          })

          dispatch(loadingFunc(false))
          dispatch(filteredUrl(url))
          
  },[url,dispatch]); 
  
  
 
  
  
  

  

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







function displayresults(){
  let displaytext=''

    if(loading){
      displaytext = 'Loading Data Please Wait...'
    }else{
      if(globCount>0){
        displaytext =  `Displaying ${globCount} results.`
      } else {
        displaytext = 'Change Search Criteria'
      }
    }
    return displaytext
}

//console.log(readMore)
function textMin(text,keyNo){
    return(
      <TextMinimize keyNo={keyNo} text={text} setEmpty={setReadMoreEmpty}/>
    )
}

const ItemIncrement = (function () {
  let counter = 0
  return function () {counter += 1; return counter}
})();//closure with self invoked function:)


  return (
      <div>
        <p>{displayresults()}</p>
        <p>{error?`Error: ${error}`:null}</p>
          <ul>
            
            {data?data.map((item,index) =>
            <>
            <div id='repo-items'>
              <div id='repo-list-items'>
                <div id='order-number'>
                {ItemIncrement()}
                </div>

                <li id='repo-list-items-name' 
                key = {keyIndex()+'id'+item.id}>{item.name}</li>
                {/*console.log(keyIndex())*/}
                <li id='repo-list-items-description' 
                key = {keyIndex()+'des' + item.id}>{textMin(item.description,(index+1))}</li>
                
                
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
