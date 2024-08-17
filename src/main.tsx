import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import './index.css'

const rootNode = createRoot(document.getElementById('root')!)

rootNode.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
