import * as actions from './userreducerActions'  
import { globals } from '../app/usercontext'

const  UserReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {

    case actions.changeUser:
      console.log('reducertest')
     return ChangeUser(state, payload.newUser);
    
    case actions.logoutUser:
     return LogoutUser();
    
    default:
     return state;

}};

export function LogoutUser(){
  return globals

}


export function ChangeUser(prevstate, newUser) {
  //console.log('state',state)
  //console.log(newUser)
  let newState = prevstate
  newState.user.userid=newUser[0]
  newState.user.info = {...newUser[1]}
  newState.user.loggedin=true
  console.log('newstate',newState)
  
  return newState
}

export default UserReducer
