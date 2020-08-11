import React, { useState, useEffect } from 'react';
import { AppConsumer, InitialFilters } from '../app/context'
import DataLoader from './data'
export default function DataMiddleMan(){
  
  const[url,setUrl]=useState('https://api.github.com/search/repositories?q= stars:>=10000 language:python sort:stars')
  const Filters = InitialFilters

  
  function languageCorrect(){ 

      let filterLanguage = ''
      if(Filters.language==='c++'){
        filterLanguage = 'language:c%2B%2B'
      }else if (Filters.language===''){
        filterLanguage = ''
      } else {
        filterLanguage = `language:${Filters.language}`

      }

      return filterLanguage
  }

  

  const assignValues = (key,value) =>{
    //console.log('assign',key,value)
    
    Filters[key]=value
    
  }
  
  useEffect(() => {
    setUrl(Filters.url)
  })

  return( 
    <>
      <AppConsumer>
        { context =>
        <>
          {assignValues('language',context.language)}        
          {assignValues('stars',context.stars)}
          {assignValues('keyword',context.keyword)}
          
          {assignValues('count',context.count)}
          {assignValues('loading',context.loading)}
          
          {assignValues('url',`https://api.github.com/search/repositories?q=${Filters.keyword} stars:>=${Filters.stars} ${languageCorrect()} sort:stars`)}
          
          {console.log('data/url: ',url)}
          {console.log('dataMid/Filters:',Filters)}
          

        </>
        
        }
      </AppConsumer>
      
      <p>{url}</p>
      <DataLoader url = {url}/>
    </>
      
  )

}







