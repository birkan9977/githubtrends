import React from 'react';
import DataLoader from './data'

export default function LoadData(props){
  {console.log('Loaddata/Language:',props.filters.language)}
  {console.log('Loaddata/Followers:',props.filters.followers)}
  return(

      <DataLoader 
      filterlanguage={props.filters.language} 
      filterFollowers={props.filters.followers}
      />
  
  )

} 
    









