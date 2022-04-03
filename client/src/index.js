import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './router';
import "./assets/styles/main.scss";
// import { StateProvider } from './contexts';

ReactDOM.render(
  // <StateProvider>
  <Routers />
  // </StateProvider>
  ,
  document.getElementById('root')
);
