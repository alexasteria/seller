import React, { FC, useState, useEffect } from "react";
import { DeliveryAddress, CourierService, DeliveryInfo } from "../types";
import DeliveryAddressForm from "./DeliveryAddressForm";
import CourierSelection from "./CourierSelection";
import { useCart } from "../contexts/CartContext";

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

  const [selectedCourier, setSelectedCourier] = useState<CourierService | null>(
    null,
  );

  const isFormValid =
    address.city.trim() &&
    address.street.trim() &&
    address.house.trim() &&
    selectedCourier;

  // Обновляем информацию о доставке для Telegram
  useEffect(() => {
    if (isFormValid && selectedCourier && onDeliveryInfoChange) {
      const deliveryInfo: DeliveryInfo = {
        address,
        courier: selectedCourier,
        totalWithDelivery: subtotal + selectedCourier.price,
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
      totalWithDelivery: subtotal + selectedCourier.price,
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

      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.entries(cart).map(([productID, variants]) => {
          const item = cartMap.get(productID)!;
          return (
            <div style={{ padding: "4px 0", display: "flex", gap: 12 }}>
              <img src={item.img} style={{ width: 50, height: 50 }} />
              <div>
                <div>{item.title}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  {Object.entries(variants).map(([variantID, count]) => {
                    const v = item.variants.find((v) => v.id === variantID);
                    if (!v) throw Error("wrong variants");
                    return (
                      <div>
                        {v.value} x {count}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="delivery-content">
        <DeliveryAddressForm address={address} onChange={setAddress} />

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
            <strong>
              ${(subtotal + (selectedCourier?.price || 0)).toFixed(2)}
            </strong>
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
