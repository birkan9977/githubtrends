import React, { useContext } from 'react'
import userContext, { UserConsumer } from '../app/usercontext'

const UserInfo = () => {
  
  const { users } = useContext(userContext)

  const isLoggedin = users.user.loggedin

  const firstname = isLoggedin?users.user.info.firstname:null
  const lastname = isLoggedin?users.user.info.lastname:null
  const email = isLoggedin?users.user.info.email:null

return(
        <>

            <h2>{firstname}</h2>
            <h3>{lastname}</h3>
            <h3>{email}</h3>

        </>
       
)
}

export default UserInfo

