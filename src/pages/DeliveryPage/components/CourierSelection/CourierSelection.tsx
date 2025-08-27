import React, { FC } from 'react';
import { CourierService } from '@/types';
import { COURIER_SERVICES } from '@/data/couriers';
import styles from '@/pages/DeliveryPage/components/CourierSelection/CourierSelection.module.css';

interface CourierSelectionProps {
  selectedCourier: CourierService | null;
  onSelect: (courier: CourierService) => void;
  subtotal: number;
}

const CourierSelection: FC<CourierSelectionProps> = ({ selectedCourier, onSelect, subtotal }) => {
  return (
    <div className={styles.courierSelection}>
      <div className={styles.courierHeader}>
        <h3>🚚 Способ доставки</h3>
        <p className={styles.courierSubtitle}>Выберите удобный для вас способ доставки</p>
      </div>
      
      <div className={styles.courierList}>
        {COURIER_SERVICES.map((courier) => {
          const isSelected = selectedCourier?.id === courier.id;
          const totalWithDelivery = subtotal + courier.price;
          
          return (
            <div 
              key={courier.id}
              className={`${styles.courierCard} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelect(courier)}
            >
              <div className={styles.courierCardContent}>
                <div className={styles.courierInfo}>
                  <div className={styles.courierName}>{courier.name}</div>
                  <div className={styles.courierDescription}>{courier.description}</div>
                  <div className={styles.courierTime}>
                    <span className={styles.timeIcon}>⏱</span>
                    {courier.time}
                  </div>
                </div>
                
                <div className={styles.courierPrice}>
                  <div className={styles.deliveryPrice}>+${courier.price.toFixed(2)}</div>
                  <div className={styles.totalPrice}>${totalWithDelivery.toFixed(2)}</div>
                </div>
              </div>
              
              {isSelected && (
                <div className={styles.selectedIndicator}>
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
