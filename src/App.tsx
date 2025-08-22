import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import DeliveryPage from './pages/DeliveryPage';
import SuccessPage from './pages/SuccessPage';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


