import './index.css';

import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

const rootElement = document.querySelector('#root');

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

console.log(window.Html5QrcodeScanner);
