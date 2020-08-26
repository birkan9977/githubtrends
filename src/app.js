import React, {useContext,useState} from 'react';
import Layout from './components/Layout'
import Store from './store/store'
import userContext from './app/usercontext'


const App = () => {

  return (
    
      
        <Store>

          <Layout/>
      
        </Store>
        
         
      
  );
}

export default App