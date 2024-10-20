import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TicketContextProvider } from './context/TicketContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TicketContextProvider>
      <App />
    </TicketContextProvider>
  </StrictMode>
);
