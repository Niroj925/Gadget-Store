import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import theme from './theme/index.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </MantineProvider>
    </React.StrictMode>
);


