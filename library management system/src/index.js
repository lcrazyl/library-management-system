import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/antd/dist/antd.css';
import ConfigRouter from './router';
// import '../node_modules/@ant-design/pro-components/dist/components.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ConfigRouter />
  </Router>
);


