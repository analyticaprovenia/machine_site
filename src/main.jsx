import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './themes/candy.css'
import './themes/kids.css'
import './themes/meta.css'
import './themes/arcade.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
