import React, { useState, useEffect, useContext } from 'react';
import {
  TextMinimize,
  keyIndex,
 } from '../extraFunctions/dataFunctions'

import AppContext from '../app/context';
import { changeFilter } from '../store/reducerActions'


export default function DataLoader (){
  
  
  const[data,setData] = useState([]);
  const[error,setError] = useState(null)
  const { filters, dispatch } = useContext(AppContext)

  const setReadMoreEmpty = () => []

  const sendtoReducer = (filterName,filterValue) => {
    const action = {
      type: changeFilter,
      payload: {
        filterName: filterName,
        filterValue: filterValue
        
      }
    }
    dispatch(action);
  }

  
  //console.log(filters)

  const headers = {
    headers: {
      'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
      'Accept': 'application/json'
    }
  }

  useEffect(() => {

    setReadMoreEmpty()

    setError(null)

    sendtoReducer ('loading',true)

  async function getDataAsync(url)

        {
          let response = await fetch(url, headers)

          let data = await response.json()

          return data
            
        }

  getDataAsync(filters.url)
  //getDataAsync('test')
          
          .then(data => {
            setData(data.items)
           
            //global
           if(data.items)sendtoReducer ('count',data.items.length)
            sendtoReducer ('loading',false)

          })
          .catch((err) => {
            setError(err);
            console.log('error',err)
          })

    //set to session storage at every mutation
    
    const setSessionStorage=()=>{
      sessionStorage.setItem('language',filters.language)
      sessionStorage.setItem('stars',filters.stars)
      sessionStorage.setItem('keyword',filters.keyword)
    }
    
    setSessionStorage()

            //clean up after unmount
            return ()=>{
              
            }

            
        
      
  },[filters.url]); 
  


  function displayresults(){
    let displaytext=''

      if(filters.loading){
        displaytext = 'Loading Data Please Wait...'
      }else{
        if(filters.count>0){
          displaytext =  `Displaying ${filters.count} results.`
        } else {
          displaytext = 'Search Filters returned no results. Try changing search filters.'
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
                {/*console.log(keyIndex())*/}
                <li id='repo-list-items-name' 
                key = {keyIndex()+'id'+item.id}>{item.name}</li>
                {/*console.log(keyIndex())*/}
                <li id='repo-list-items-description' 
                key = {keyIndex()+'des' + item.id}>{textMin(item.description,(index+1))}</li>
                
                
                <li id='repo-list-items-url' 
                key = {keyIndex()+'url' + item.id}><a href={item.html_url} target='_blank' rel="noopener">GitHub Link</a></li>
                {/*console.log(keyIndex()+'url' + item.id)*/}
                
                <li id='repo-list-items-stars' 
                key = {keyIndex()+'star' + item.id}>{item.stargazers_count} Stars</li>
                
              </div>
                
            <div id= 'repo-user-items'>
              <div id = 'repo-list-items-img'>
                <li id='repo-list-items-img-list' 
                key = {keyIndex()+'lan' + item.id}>
                {item.language?item.language:null}
                
                
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
