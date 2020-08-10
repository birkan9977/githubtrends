import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout'
import AppProvider from './app/context';

ReactDOM.render(
  <React.StrictMode>

    <AppProvider>

      <Layout />

    </AppProvider>

  </React.StrictMode>,
  
  document.getElementById('root')
);

serviceWorker.unregister();
