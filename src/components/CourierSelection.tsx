import React, { FC } from 'react';
import { CourierService } from '../types';
import { COURIER_SERVICES } from '../data/couriers';

interface CourierSelectionProps {
  selectedCourier: CourierService | null;
  onSelect: (courier: CourierService) => void;
  subtotal: number;
}

const CourierSelection: FC<CourierSelectionProps> = ({ selectedCourier, onSelect, subtotal }) => {
  return (
    <div className="courier-selection">
      <div className="courier-header">
        <h3>🚚 Способ доставки</h3>
        <p className="courier-subtitle">Выберите удобный для вас способ доставки</p>
      </div>
      
      <div className="courier-list">
        {COURIER_SERVICES.map((courier) => {
          const isSelected = selectedCourier?.id === courier.id;
          const totalWithDelivery = subtotal + courier.price;
          
          return (
            <div 
              key={courier.id}
              className={`courier-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(courier)}
            >
              <div className="courier-card-content">
                <div className="courier-info">
                  <div className="courier-name">{courier.name}</div>
                  <div className="courier-description">{courier.description}</div>
                  <div className="courier-time">
                    <span className="time-icon">⏱</span>
                    {courier.time}
                  </div>
                </div>
                
                <div className="courier-price">
                  <div className="delivery-price">+${courier.price.toFixed(2)}</div>
                  <div className="total-price">${totalWithDelivery.toFixed(2)}</div>
                </div>
              </div>
              
              {isSelected && (
                <div className="selected-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourierSelection;
