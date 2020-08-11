import React from 'react';
import { AppConsumer } from '../app/context'


export default function Dispatch (props){
  console.log('dispatch')
  return(
  <AppConsumer>
      { context =>
      <>
          {context.setFilter(props.key,props.value)} 
          {console.log('dispatch')} 
          {console.log(context)} 
      </>
      }
  </AppConsumer>
  )
}

