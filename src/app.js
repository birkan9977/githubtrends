import React from 'react';
import Store from './store/store';
import Layout from './components/Layout';

const App = () => {
  return (
    <Store>
      <Layout />
    </Store>
  );
};

export default App;
