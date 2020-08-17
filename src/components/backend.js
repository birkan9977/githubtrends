import React, { useContext, useState, useEffect } from 'react';
import * as actions from '../store/userreducerActions'  
import userContext from '../app/usercontext'
import customData from '../database/data.json'



const Backend = (props) => {

const { users, userDispatch } = useContext(userContext)
const sendtoUsersReducer = (newUser) => {
  const action = {
    type: actions.changeUser,
    payload: { newUser }
    
  };
  userDispatch(action);
};

//console.log(users)
const userlist = customData
//console.log(userlist)
//console.log(props.login,props.password)




useEffect(()=>{

const authorize =()=>{
  let found = false
  let foundItem = Object.entries(userlist).find(([key,value]) => 
  (value.email === props.login) && (value.password===props.password)
  )
  
  if (foundItem!==undefined || null){
    found=true
    sendtoUsersReducer(foundItem)
  }
  //console.log(foundItem)

  console.log('found',found)
  props.error(!found)
  
  
  return found
}
authorize()
props.reset(false)
 


},[props])


  return(
    <>
      
      
    </>
  )


}

export default Backend