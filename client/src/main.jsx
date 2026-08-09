import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'; 
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ProductContextProvider } from './context/ProductContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <App />
          <ToastContainer /> 
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>

)
