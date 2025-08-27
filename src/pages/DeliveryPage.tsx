import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryScreen from "@/components/DeliveryScreen";
import { useCart } from "@/contexts/CartContext";
import { useTelegramUi, useTheme } from "@/hooks/useTelegram";
import { useThemeSync } from "@/hooks/useThemeSync";
import { DeliveryInfo } from "@/types";

const DeliveryPage: FC = () => {
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const theme = useTheme();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

  const { isTelegramAvailable, isInitialized, platform } = useTelegramUi(
    cart,
    total,
    true,
    "delivery",
    deliveryInfo,
  );
  useThemeSync(theme);

  const handleBack = () => {
    navigate("/");
  };

  const handleConfirm = (info: DeliveryInfo) => {
    setDeliveryInfo(info);
  };

  return (
    <DeliveryScreen
      subtotal={total}
      onBack={handleBack}
      onConfirm={handleConfirm}
      onDeliveryInfoChange={setDeliveryInfo}
    />
  );
};

export default DeliveryPage;
