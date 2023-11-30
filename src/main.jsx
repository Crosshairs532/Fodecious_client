import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './router/Router'
import { RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProdiver from './AuthProvider/AuthProdiver'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProdiver>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router}></RouterProvider>
      </QueryClientProvider>
    </AuthProdiver>
  </React.StrictMode>,
)
