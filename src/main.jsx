import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SkyProvider } from './context/SkyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SkyProvider>
      <App />
    </SkyProvider>
  </StrictMode>,
)
