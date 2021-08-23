import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
