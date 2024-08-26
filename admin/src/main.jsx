import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import theme from './theme/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles>
        <App />
    </MantineProvider>
  </React.StrictMode>
);
