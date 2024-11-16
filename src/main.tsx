// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  //removing strict mode for testing
  // <StrictMode> 
    <App />
  // </StrictMode>,
)
