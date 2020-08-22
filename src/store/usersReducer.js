import * as actions from './userreducerActions'  
import { globals } from '../app/usercontext'

const  UserReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {

    case actions.changeUser:
      console.log('reducertest')
     return ChangeUser(state, payload.newUser, action.userid);
    
    case actions.logoutUser:
     return LogoutUser();
    
    default:
     return state;

}};

export function LogoutUser(){
  return globals

}


export function ChangeUser(prevstate, newUser, userid) {
    
    console.log('previous state',prevstate)
    console.log('newuser',newUser)

  let newState = prevstate

  newState.user.userid = userid

  //this works too!
  //newState.user.info = {...newUser[user_id]}
      
  newState.user.info = newUser[userid]

  //previous array version
  //newState.user.info = {...newUser[1]}
  
  newState.user.loggedin=true
  console.log('newstate',newState)
  
  return newState
}

export default UserReducer
