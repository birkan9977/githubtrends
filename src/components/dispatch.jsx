import React, {useContext, useEffect} from 'react';
import AppContext from '../app/context'


export default function Dispatch (props){
  console.log('dispatch',props.xcount,props.xurl)
  const appfilters = useContext(AppContext)

  useEffect(() => {
    appfilters.setFilter('url',props.xurl)

  },[props.xurl])

  useEffect(() => {

    appfilters.setFilter('count',props.xcount)
  },[props.xcount])

  return(
      <>
          
          {console.log('dispatch',appfilters)} 
      </>
      
  )
}

