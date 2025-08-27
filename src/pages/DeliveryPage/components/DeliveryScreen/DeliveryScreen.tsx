import React, { FC, useState, useEffect } from "react";
import { DeliveryAddress, CourierService, DeliveryInfo } from "@/types";
import DeliveryAddressForm from "@/pages/DeliveryPage/components/DeliveryAddressForm/DeliveryAddressForm";
import CourierSelection from "@/pages/DeliveryPage/components/CourierSelection/CourierSelection";
import CartDisplay from "@/pages/DeliveryPage/components/CartDisplay/CartDisplay";
import { useCart } from "@/contexts/CartContext";
import styles from "@/pages/DeliveryPage/components/DeliveryScreen/DeliveryScreen.module.css";

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
  onDeliveryInfoChange,
}) => {
  const { cartMap, cart } = useCart();
  const [address, setAddress] = useState<DeliveryAddress>({
    city: "",
    street: "",
    house: "",
    apartment: "",
    entrance: "",
    floor: "",
    comment: "",
  });

  // const [selectedCourier, setSelectedCourier] = useState<CourierService | null>(
  //   null,
  // );
  //
  // const isFormValid =
  //   address.city.trim() &&
  //   address.street.trim() &&
  //   address.house.trim() &&
  //   selectedCourier;

  // Обновляем информацию о доставке для Telegram
  // useEffect(() => {
  //   if (isFormValid && selectedCourier && onDeliveryInfoChange) {
  //     const deliveryInfo: DeliveryInfo = {
  //       address,
  //       courier: selectedCourier,
  //       totalWithDelivery: subtotal + selectedCourier.price,
  //     };
  //     onDeliveryInfoChange(deliveryInfo);
  //   } else if (onDeliveryInfoChange) {
  //     onDeliveryInfoChange(null);
  //   }
  // }, [address, selectedCourier, subtotal, isFormValid, onDeliveryInfoChange]);

  // const handleConfirm = () => {
  //   if (!isFormValid || !selectedCourier) return;
  //
  //   const deliveryInfo: DeliveryInfo = {
  //     address,
  //     courier: selectedCourier,
  //     totalWithDelivery: subtotal + selectedCourier.price,
  //   };
  //
  //   onConfirm(deliveryInfo);
  // };

  return (
    <div className={styles.deliveryScreen}>
      <header className={styles.deliveryHeader}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Назад к меню
        </button>
        <h2>Доставка</h2>
      </header>

      <CartDisplay cart={cart} cartMap={cartMap} />

      <div className={styles.orderConfirmationInfo}>
        <p>Пожалуйста, внимательно проверьте ваш заказ.</p>
        <p>
          После подтверждения с вами свяжется менеджер для уточнения деталей по
          телефону.
        </p>
      </div>

      {/*<div className={styles.deliveryContent}>*/}
      {/*  <DeliveryAddressForm address={address} onChange={setAddress} />*/}

      {/*  /!*<CourierSelection*!/*/}
      {/*  /!*  selectedCourier={selectedCourier}*!/*/}
      {/*  /!*  onSelect={setSelectedCourier}*!/*/}
      {/*  /!*  subtotal={subtotal}*!/*/}
      {/*  /!*/
      /*/}
      {/*</div>*/}

      <footer className={styles.deliveryFooter}>
        <div className={styles.deliverySummary}>
          <div className={styles.summaryRow}>
            <span>Сумма заказа:</span>
            <span>{subtotal.toFixed(2)}₽</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка курьером:</span>
            <span>0.00₽</span>
          </div>
          {/*{selectedCourier && (*/}
          {/*  <div className="summary-row">*/}
          {/*    <span>Доставка ({selectedCourier.name}):</span>*/}
          {/*    <span>+${selectedCourier.price.toFixed(2)}</span>*/}
          {/*  </div>*/}
          {/*)}*/}
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Итого к оплате:</span>
            <strong>
              {/*${(subtotal + (selectedCourier?.price || 0)).toFixed(2)}*/}
              {subtotal.toFixed(2)}₽
            </strong>
          </div>
        </div>

        {/* <button
          className={`${styles.confirmBtn} ${isFormValid ? styles.active : styles.disabled}`}
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
