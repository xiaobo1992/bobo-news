import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MyRouter from './router/index.js';
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <MyRouter></MyRouter>
    </BrowserRouter>
  );
}

export default App;
