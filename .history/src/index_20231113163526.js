import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './Usercontext';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>  
    </BrowserRouter>,
  document.getElementById("root")
);