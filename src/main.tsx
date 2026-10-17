import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { colors } from './types/colors'

document.documentElement.style.setProperty('--color-background', colors.background)
document.documentElement.style.setProperty('--color-surface', colors.surface)
document.documentElement.style.setProperty('--color-text', colors.text)
document.documentElement.style.setProperty('--color-text-muted', colors.textMuted)
document.documentElement.style.setProperty('--color-border', colors.border)
document.documentElement.style.setProperty('--color-transparent', colors.transparent)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
