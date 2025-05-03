import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Header } from './pages-jsx/Header.jsx'
import { Notes } from './pages-jsx/Notes.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Notes />
  </StrictMode>,
)
