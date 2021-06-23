import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';

import './index.css';
import { App } from './App';

const rootElement = document.querySelector('#root');

render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  rootElement
);

console.log(window.Html5QrcodeScanner);
