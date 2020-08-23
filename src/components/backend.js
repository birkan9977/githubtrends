import React, { useContext, useEffect } from 'react';
import * as actions from '../store/userreducerActions'  
import userContext from '../app/usercontext'
import customData from '../database/data.json'
import { convertArrayToObject } from '../extraFunctions/dataFunctions'


  const Backend = (props) => {

      const { userDispatch } = useContext(userContext)

      const sendtoUsersReducer = (newUser) => {
            
            const action = {
              type: actions.changeUser,
              payload: { newUser },
            };

            userDispatch(action);
      };

      //json file changed as suggested to array of objects
      const userList = customData

// by converting to object we call user by user_id (??as in nosql dbs)
// According to below link, object search with key is the fastest
// https://www.andygup.net/fastest-way-to-find-an-item-in-a-javascript-array/

  // converts array to object using 'email' as key
      const dbConvertedToObject = convertArrayToObject(userList,'email')

  //console.log('objectDB',dbConvertedToObject)

      let loginSuccessful = false

    useEffect(()=>{

      
      let foundItem = dbConvertedToObject[props.login]

      loginSuccessful = foundItem?props.password === foundItem['password']:null
        
      if (foundItem && loginSuccessful){

          sendtoUsersReducer(foundItem)

          props.toggle()
      }

          props.error(!loginSuccessful)
      
          props.reset(false)
 


    },[props])


  return(
    <>
      {loginSuccessful?<p>Login Success!</p>:null}
      
    </>
  )


}

export default Backend