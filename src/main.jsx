import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/global.scss'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
