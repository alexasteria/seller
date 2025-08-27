import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTelegram';
import { useThemeSync } from '@/hooks/useThemeSync';

const SuccessPage: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  useThemeSync(theme);

  const handleNewOrder = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <Header />
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '32px 16px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ marginBottom: '16px' }}>Заказ оформлен!</h2>
        <p style={{ color: 'var(--hint)', marginBottom: '24px' }}>
          Ваш заказ отправлен в обработку
        </p>
        <button 
          className="btn primary"
          onClick={handleNewOrder}
        >
          Новый заказ
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
