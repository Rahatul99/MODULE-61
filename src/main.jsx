import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import { Children } from 'react';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './Loader/cartProductLoader';
import Checkout from './components/Checkout/Checkout';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/AuthProvider/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Shop />
      },
      {
        path: '/',
        element: <Cart />
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: cartProductsLoader
        
      },
      {
        path: 'inventory',
        element: <Inventory />
      },
      {
        path:'checkout',
        element: <Checkout />
      },
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
