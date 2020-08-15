import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app'

// inspired from https://medium.com/@chathuranga94/introduction-to-react-context-api-90f5e4d7a7a9

ReactDOM.render(
  
  <React.StrictMode>

      <App />
    

  </React.StrictMode>,
  
  document.getElementById('root')
);

serviceWorker.unregister();
