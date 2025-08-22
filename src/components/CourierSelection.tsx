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
      <h3 className="form-title">Выберите способ доставки</h3>
      
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
              <div className="courier-info">
                <div className="courier-name">{courier.name}</div>
                <div className="courier-description">{courier.description}</div>
                <div className="courier-time">⏱ {courier.time}</div>
              </div>
              
              <div className="courier-price">
                <div className="delivery-price">+${courier.price.toFixed(2)}</div>
                <div className="total-price">${totalWithDelivery.toFixed(2)}</div>
              </div>
              
              {isSelected && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourierSelection;
