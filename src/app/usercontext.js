import {createContext} from 'react'



const activeuser = {
   firstname:'test-first-name',
   lastname:'test-last-name',
   role:'test-role',
   email:'test@test',//email
   loggedin:false,
   userid:'0'
}

const {firstname,lastname,role,email,loggedin,userid} = activeuser

export const globals = {
  user:{
        loggedin: loggedin,
        info: { 
                firstname:firstname,
                lastname:lastname,
                email:email,
                role:role,
                
              },
            
        userid: userid
        }

}

const userContext = createContext(globals)

export const UserProvider = userContext.Provider
export const UserConsumer = userContext.Consumer
export default userContext