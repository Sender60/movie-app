import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Online, Offline } from 'react-detect-offline';
import { Alert } from 'antd';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Online>
      <App />
    </Online>
    <Offline>
      <Alert type="error" message="You are offline" banner />
    </Offline>
  </React.StrictMode>,
);
