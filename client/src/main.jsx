import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext.jsx'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
