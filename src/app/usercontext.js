import {createContext} from 'react'



const activeuser = {
   firstname:'test',
   lastname:'',
   role:'',
   userlogin:'',
   loggedin:false,
   userid:'0'
}

const {firstname,lastname,role,userlogin,loggedin,userid} = activeuser

export const globals = {
  user:{
        loggedin: loggedin,
        info: { 
                firstname:firstname,
                lastname:lastname,
                userlogin:userlogin,
                role:role,
                
              },
            
        userid: userid
        }

}

const userContext = createContext(globals)

export const UserProvider = userContext.Provider
export const UserConsumer = userContext.Consumer
export default userContext