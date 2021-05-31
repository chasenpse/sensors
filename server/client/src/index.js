import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ControlsProvider } from './components/Header/Controls/ControlsContext';

ReactDOM.render(
  <React.StrictMode>
    <ControlsProvider>
        <App />
    </ControlsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);