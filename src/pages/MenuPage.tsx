import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useTelegramUi, useTheme } from '@/hooks/useTelegram';
import { useThemeSync } from '@/hooks/useThemeSync';

const MenuPage: FC = () => {
  const navigate = useNavigate();
  const { cart, total, hasItems, increment, decrement } = useCart();
  const theme = useTheme();

  const handleNavigateToDelivery = () => {
    navigate('/delivery');
  };

  const { isTelegramAvailable } = useTelegramUi(
    cart, 
    total, 
    hasItems, 
    'menu', 
    null,
    handleNavigateToDelivery
  );
  
  useThemeSync(theme);

  const handleCheckout = () => {
    navigate('/delivery');
  };

  return (
    <div className="container">
      <Header />
      <Menu 
        cart={cart}
        onIncrement={increment}
        onDecrement={decrement}
      />
      <Footer total={total} />
    </div>
  );
};

export default MenuPage;
