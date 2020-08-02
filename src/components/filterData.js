import React, {useState} from 'react';
import DataLoader from './data'
import FilterQuery from './filter'
import MyContext from '../myContext'

export default function FilterData(){


return(
  <MyContext.Consumer>
    {context => ( 
      <>
          <FilterQuery 
          
          />

      </>
    
    )}

    
  </MyContext.Consumer>
)
}




export const LoadData = () => {

  return (
    
        <DataLoader filterlanguage={''}/>
    )
}



