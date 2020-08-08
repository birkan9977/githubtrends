import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout'
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>

      <Layout />

    </Provider>

  </React.StrictMode>,
  
  document.getElementById('root')
);

serviceWorker.unregister();
