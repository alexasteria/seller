import React, { FC, useState, useEffect } from 'react';
import { DeliveryAddress, CourierService, DeliveryInfo } from '../types';
import DeliveryAddressForm from './DeliveryAddressForm';
import CourierSelection from './CourierSelection';

interface DeliveryScreenProps {
  subtotal: number;
  onBack: () => void;
  onConfirm: (deliveryInfo: DeliveryInfo) => void;
  onDeliveryInfoChange?: (deliveryInfo: DeliveryInfo | null) => void;
}

const DeliveryScreen: FC<DeliveryScreenProps> = ({ 
  subtotal, 
  onBack, 
  onConfirm, 
  onDeliveryInfoChange 
}) => {
  const [address, setAddress] = useState<DeliveryAddress>({
    city: '',
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
    comment: ''
  });
  
  const [selectedCourier, setSelectedCourier] = useState<CourierService | null>(null);

  const isFormValid = address.city.trim() && address.street.trim() && address.house.trim() && selectedCourier;

  // Обновляем информацию о доставке для Telegram
  useEffect(() => {
    if (isFormValid && selectedCourier && onDeliveryInfoChange) {
      const deliveryInfo: DeliveryInfo = {
        address,
        courier: selectedCourier,
        totalWithDelivery: subtotal + selectedCourier.price
      };
      onDeliveryInfoChange(deliveryInfo);
    } else if (onDeliveryInfoChange) {
      onDeliveryInfoChange(null);
    }
  }, [address, selectedCourier, subtotal, isFormValid, onDeliveryInfoChange]);

  const handleConfirm = () => {
    if (!isFormValid || !selectedCourier) return;
    
    const deliveryInfo: DeliveryInfo = {
      address,
      courier: selectedCourier,
      totalWithDelivery: subtotal + selectedCourier.price
    };
    
    onConfirm(deliveryInfo);
  };

  return (
    <div className="delivery-screen">
      <header className="delivery-header">
        <button className="back-btn" onClick={onBack}>
          ← Назад к меню
        </button>
        <h2>Доставка</h2>
      </header>

      <div className="delivery-content">
        <DeliveryAddressForm 
          address={address}
          onChange={setAddress}
        />
        
        <CourierSelection
          selectedCourier={selectedCourier}
          onSelect={setSelectedCourier}
          subtotal={subtotal}
        />
      </div>

      <footer className="delivery-footer">
        <div className="delivery-summary">
          <div className="summary-row">
            <span>Сумма заказа:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {selectedCourier && (
            <div className="summary-row">
              <span>Доставка ({selectedCourier.name}):</span>
              <span>+${selectedCourier.price.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Итого к оплате:</span>
            <strong>${(subtotal + (selectedCourier?.price || 0)).toFixed(2)}</strong>
          </div>
        </div>
        
        {/* <button 
          className={`confirm-btn ${isFormValid ? 'active' : 'disabled'}`}
          onClick={handleConfirm}
          disabled={!isFormValid}
        >
          Перейти к оплате
        </button> */}
      </footer>
    </div>
  );
};

export default DeliveryScreen;
