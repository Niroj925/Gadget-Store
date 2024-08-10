import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@mantine/core/styles.css';
import Navbar from './components/layout/Navbar.jsx';
import { createTheme, MantineProvider } from '@mantine/core';
import "./global.style.css"

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles>
      <Navbar />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
