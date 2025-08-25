import { useEffect, useState, useCallback } from "react";
import { CartState, OrderPayload, DeliveryInfo, OrderItem } from "../types";
import { MENU } from "../data/menu";

const tg = (window as any).Telegram?.WebApp;

// Функция для отправки заказа в чат и боту
const sendOrderToChat = (payload: OrderPayload, deliveryInfo: DeliveryInfo) => {
  const items = payload.items;

  // Создаем красивое сообщение для чата
  const orderSummary = `🍕 *Новый заказ!*\n\n${items
    .map(
      (item) =>
        `• ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
    )
    .join(
      "\n",
    )}\n\n📍 *Адрес доставки:*\n${deliveryInfo.address.city}, ${deliveryInfo.address.street}, ${deliveryInfo.address.house}${deliveryInfo.address.apartment ? `, кв. ${deliveryInfo.address.apartment}` : ""}\n\n🚚 *Курьер:* ${deliveryInfo.courier.name} (${deliveryInfo.courier.time})\n\n💰 *Итого к оплате:* $${deliveryInfo.totalWithDelivery.toFixed(2)}`;

  // Показываем popup с информацией о заказе
  try {
    const popupMessage = `Заказ успешно оформлен!\n\nСумма: $${deliveryInfo.totalWithDelivery.toFixed(2)}\nКурьер: ${deliveryInfo.courier.name}\n\nОжидайте подтверждения от ресторана.`;
    tg.showPopup({
      title: "✅ Заказ принят!",
      message: popupMessage,
      buttons: [{ type: "ok", text: "Понятно" }],
    });
  } catch (error) {
    // Fallback к alert
    tg.showAlert(orderSummary);
  }
};

export function useTelegramUi(
  cart: CartState,
  cartTotal: number,
  hasItems: boolean,
  appState: string,
  deliveryInfo?: DeliveryInfo | null,
  onNavigateToDelivery?: () => void,
) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Создаем стабильную функцию для обработки клика
  const handleMainButtonClick = useCallback(() => {
    if (appState === "delivery" && deliveryInfo) {
      // На странице доставки - подтверждаем заказ
      setIsSubmitting(true);

      const items: OrderItem[] = Object.entries(cart)
        .map(([id, variantState]) => {
          const item = MENU.find((m) => m.id === id);
          if (!item) return null;
          return {
            id: item.id,
            title: item.title,
            price: 999999,
            quantity: 1,
            description: item.description,
          };
        })
        .filter((x): x is NonNullable<typeof x> => Boolean(x));

      const payload: OrderPayload = {
        action: "checkout",
        items,
        total: cartTotal,
        currency: "USD",
        delivery: deliveryInfo,
        timestamp: Date.now(),
        user: tg.initDataUnsafe?.user
          ? {
              id: tg.initDataUnsafe.user.id,
              username: tg.initDataUnsafe.user.username,
              first_name: tg.initDataUnsafe.user.first_name,
              last_name: tg.initDataUnsafe.user.last_name,
            }
          : undefined,
      };

      try {
        // Отправляем данные в бота
        tg.sendData(JSON.stringify(payload));

        // Отправляем красивое сообщение в чат
        sendOrderToChat(payload, deliveryInfo);

        // Показываем успешное состояние
        tg.MainButton.setParams({
          text: "✅ Заказ отправлен!",
          color: "#28a745",
          text_color: "#ffffff",
        });

        // Закрываем Web App после успешной отправки
        setTimeout(() => {
          try {
            tg.close();
          } catch (error) {
            setIsSubmitting(false);
          }
        }, 1000);
      } catch (error) {
        setIsSubmitting(false);
        tg.showAlert("Ошибка отправки заказа. Попробуйте еще раз.");
      }
    } else if (appState === "menu" && onNavigateToDelivery) {
      // На главной странице - переходим к доставке
      onNavigateToDelivery();
    }
  }, [cart, cartTotal, appState, deliveryInfo, onNavigateToDelivery]);

  // Инициализация Telegram Web App
  useEffect(() => {
    if (!tg) return;

    try {
      tg.ready();
      tg.expand();
      setIsInitialized(true);
    } catch (error) {
      // Игнорируем ошибки инициализации
    }
  }, []);

  // Управление MainButton
  useEffect(() => {
    if (!tg || !isInitialized) return;

    let buttonText = "";
    let shouldShow = false;
    let buttonColor = tg.themeParams.button_color || "#2481cc";
    let textColor = tg.themeParams.button_text_color || "#ffffff";

    if (appState === "delivery") {
      // На странице доставки показываем кнопку подтверждения
      if (deliveryInfo) {
        if (isSubmitting) {
          buttonText = "📤 Отправляем заказ...";
          buttonColor = "#6c757d";
        } else {
          buttonText = `Оплатить · ₽${deliveryInfo.totalWithDelivery.toFixed(2)}`;
          buttonColor = tg.themeParams.button_color || "#2481cc";
        }
        shouldShow = true;
      } else {
        buttonText = "Заполните адрес и выберите курьера";
        shouldShow = false;
      }
    } else if (appState === "menu") {
      // На главной странице показываем кнопку перехода к доставке
      buttonText = hasItems
        ? `Перейти к доставке · ${cartTotal.toFixed(2)}₽`
        : "Выберите товары";
      shouldShow = hasItems;
    }

    try {
      tg.MainButton.setParams({
        text: buttonText,
        color: buttonColor,
        text_color: textColor,
      });

      if (shouldShow) {
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
      }
    } catch (error) {
      // Игнорируем ошибки MainButton
    }
  }, [
    cartTotal,
    hasItems,
    isInitialized,
    appState,
    deliveryInfo,
    isSubmitting,
  ]);

  // Обработчик клика MainButton
  useEffect(() => {
    if (!tg || !isInitialized) return;

    try {
      tg.MainButton.onClick(handleMainButtonClick);
    } catch (error) {
      // Игнорируем ошибки обработчика
    }

    return () => {
      if (tg) {
        try {
          tg.MainButton.offClick(handleMainButtonClick);
        } catch (error) {
          // Игнорируем ошибки cleanup
        }
      }
    };
  }, [handleMainButtonClick, isInitialized]);

  return {
    isTelegramAvailable: !!tg,
    isInitialized,
    platform: tg?.platform || "unknown",
  };
}

export function useTheme() {
  const [themeParams, setThemeParams] = useState<any>(() => {
    return tg?.themeParams ?? {};
  });

  useEffect(() => {
    if (!tg) return;

    const handler = () => {
      const newParams = { ...tg.themeParams };
      setThemeParams(newParams);
    };

    try {
      tg.onEvent("themeChanged", handler);
    } catch (error) {
      // Игнорируем ошибки theme handler
    }

    return () => {
      if (tg) {
        try {
          tg.offEvent("themeChanged", handler);
        } catch (error) {
          // Игнорируем ошибки cleanup
        }
      }
    };
  }, []);

  return themeParams;
}
