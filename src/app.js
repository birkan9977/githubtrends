import React from 'react';
import Store from './store/store';
import Layout from './components/Layout';
import FetchStore from './store/fetchStore';
const App = () => {
  return (
    <FetchStore>
      <Store>
        <Layout />
      </Store>
    </FetchStore>
  );
};

export default App;
