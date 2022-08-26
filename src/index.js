import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import './index.scss';
import App from './components/App';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
