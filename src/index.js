import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import TokenContextProvider from './Context/TokenContext';
import CartContextProvider from './Context/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from './Context/WishListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <WishListContextProvider>
        <TokenContextProvider>
          <App />
          <Toaster position="top-right"/>
        </TokenContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);