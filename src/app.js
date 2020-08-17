import React, {useContext,useState} from 'react';
import Layout from './components/Layout'
import Store from './store/store'
import userContext from './app/usercontext'

const App = () => {
  const { users } = useContext(userContext)

  const[user,setUser]=useState('')
console.log('app',users)

const changeUser=(e)=>{
  console.log('userid',e)
  setUser(e)
}
  return (
    
      
        <Store>

          <Layout user={changeUser}/>
      
        </Store>
        
         
      
  );
}

export default App