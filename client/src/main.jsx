import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@mantine/core/styles.css';
import Navbar from './components/layout/Navbar.jsx';
import { MantineProvider } from '@mantine/core';
import "./global.style.css"
import theme from './theme/theme.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles>
    <QueryClientProvider client={queryClient}>
        <Navbar/>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
