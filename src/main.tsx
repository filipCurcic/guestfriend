import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TicketContextProvider } from './context/TicketContext.tsx'
import { SearchContextProvider } from './context/SearchContext.tsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SearchContextProvider>
            <TicketContextProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </TicketContextProvider>
        </SearchContextProvider>
    </StrictMode>
)
