import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/index.tsx'
import { SWRConfig } from 'swr'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={{
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
)
