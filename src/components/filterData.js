import React from 'react';
import DataLoader from './data'

export default function LoadData(props){

  return(

      <DataLoader 
          filterLanguage={props.filters.language} 
          filterStars={props.filters.stars}
          filterKeyword={props.filters.keyword}
          filteredUrl={props.filteredUrl}
          
      />
  
  )

} 
    









