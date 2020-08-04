import React from 'react';
import DataLoader from './data'

export default function LoadData(props){
  return(

      <DataLoader 
          filterLanguage={props.filters.language} 
          filterFollowers={props.filters.followers}
          filterKeyword={props.filters.keyword}
      />
  
  )

} 
    









