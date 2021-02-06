import React, { useState } from 'react';
import ReactDOM from 'react-dom';
/*
import './index.css';
import App from './App';
*/
import reportWebVitals from './reportWebVitals';
import { Alert, Button, Collapse, Nav } from 'react-bootstrap'
import Navbar from './components/navbar'

const alerts = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
]


const Heading = () => {
  return (
    <div>
      <Navbar variant="dark" bg="dark" title="高校分数线查询系统" />
    </div>
  )
}

const App = ({ alerts }) => {
  return (
    <div>
      <Heading />

    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App alerts={alerts} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
