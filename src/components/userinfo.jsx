import React, { useContext } from 'react'
import userContext, { UserConsumer } from '../app/usercontext'

const UserInfo = () => {
  
  const { users } = useContext(userContext)

  const loggedin = users.user.loggedin


return(
  
<UserConsumer>
        {value => 
        
        <>

            <h2>{loggedin?value.users.user.info.firstname:null}</h2>
            <h3>{loggedin?value.users.user.info.lastname:null}</h3>
            <h3>{loggedin?value.users.user.info.email:null}</h3>

        </>
        }
</UserConsumer>
)
}

export default UserInfo

