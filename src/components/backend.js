import React, { useContext, useState, useEffect } from 'react';
import * as actions from '../store/userreducerActions'  
import userContext from '../app/usercontext'
import customData from '../database/data.json'
import { convertArrayToObject } from '../extraFunctions/dataFunctions'


const Backend = (props) => {
console.log(props)
const { users, userDispatch } = useContext(userContext)
const sendtoUsersReducer = (newUser,userid) => {
  const action = {
    type: actions.changeUser,
    payload: { newUser },
    userid: userid
    
  };
  userDispatch(action);
};

//console.log(users)
const userlist = customData
//console.log(userlist)
//console.log(props.login,props.password) 
let obj3 = Object.entries(userlist)
console.log(obj3)

useEffect(()=>{

const authorize =()=>{
  let found = false
  let foundItem = Object.entries(userlist).find(([key,value]) => 
  (value.email === props.login) && (value.password===props.password))
    
  
  if (foundItem!==undefined){
    found=true

    // Object.find method automatically returns two member array with
    // an index of 0, adding the place of the item to index 0 and the item to
    // index of 1, we use index 0 as db index : 'foundItem[0]'
    // array is then converted to object using user_id as key
    // by converting to object we can call user by user_id if necessary

    let userid = foundItem[1].user_id
    let databaseIndex = foundItem[0]

      console.log(userid, databaseIndex)

    let convertedToObject = convertArrayToObject(foundItem,'user_id',1)
        
        convertedToObject["dataBaseIndex"] = databaseIndex
    
    //console.log('obj',convertedToObject)

      sendtoUsersReducer(convertedToObject,userid)

      props.toggle()
  }

      console.log('found Item:',foundItem)
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