
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'

const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />)
} else {
  createRoot(rootElement).render(

    <StrictMode>
      <App />
    </StrictMode>

  )
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
)
