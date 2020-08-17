import React, { useReducer } from 'react'
import { UserProvider, globals } from '../app/usercontext'
import UserReducer from './usersReducer'

const UsersStore = props => {
  const [users, userDispatch] = useReducer(UserReducer, globals);
  return (
    <UserProvider value={{ users, userDispatch }}>
      {props.children}
    </UserProvider>
  )
}

export default UsersStore