import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from './store.ts';
import {Provider} from 'react-redux';
import './index.css';


const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store} >  
      <App />
    </Provider>

  </React.StrictMode>
);
