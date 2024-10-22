import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TicketContextProvider } from './context/TicketContext.tsx';
import { SearchContextProvider } from './context/SearchContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchContextProvider>
      <TicketContextProvider>
        <App />
      </TicketContextProvider>
    </SearchContextProvider>
  </StrictMode>
);
