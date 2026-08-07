import '@fontsource/abel'
import '@fontsource/bebas-neue'
import '@fontsource/anton'
import '@fontsource/space-mono'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './client/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
