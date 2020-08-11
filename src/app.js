import React, { useState } from 'react';
import { InitialFilters, AppProvider } from './app/context'
import Layout from './components/Layout'



const App = () => {


  const setFilter = (key,value) => {
    console.log(key,value)
    setFilters(prevState=>({ ...prevState, [key]:value }));
    
  }
  
  const [filters,setFilters]=useState({...InitialFilters, setFilter: setFilter})

  return (
      <AppProvider value={filters}>
          <Layout />
          {console.log({filters})}
      </AppProvider>
  );
}

export default App