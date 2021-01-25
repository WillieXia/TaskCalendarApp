import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider 
    preventDuplicate
    maxSnack={3}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
