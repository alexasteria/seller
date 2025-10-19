import { useEffect, useState, useCallback } from "react";
import { WebApp } from "telegram-web-app";
import { useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { OrderPayload } from "@/types";
import { useProducts } from "@/contexts/ProductsContext";
import { useUser } from "@/contexts/UserContext.tsx";

const tg: WebApp = (window as any).Telegram?.WebApp;

// Функция для отправки заказа в чат и боту
// const sendOrderToChat = (
//   payload: OrderPayload,
//   deliveryInfo?: DeliveryInfo | null,
// ) => {
//const items = payload.items;
// Создаем красивое сообщение для чата
// let orderSummary = `🍕 *Новый заказ!*\n\n${items
//   .map(
//     (item) =>
//       `• ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
//   )
//   .join("\n")}`;
// if (deliveryInfo) {
//   orderSummary += `\n\n📍 *Адрес доставки:*\n${deliveryInfo.address.city}, ${deliveryInfo.address.street}, ${deliveryInfo.address.house}${deliveryInfo.address.apartment ? `, кв. ${deliveryInfo.address.apartment}` : ""}\n\n🚚 *Курьер:* ${deliveryInfo.courier.name} (${deliveryInfo.courier.time})\n\n💰 *Итого к оплате:* $${deliveryInfo.totalWithDelivery.toFixed(2)}`;
// }
// Показываем popup с информацией о заказе
// try {
//   const popupMessage = `Заказ успешно оформлен!\n\nСумма: $${deliveryInfo?.totalWithDelivery.toFixed(2)}\nКурьер: ${deliveryInfo.courier.name}\n\nОжидайте подтверждения от ресторана.`;
//   tg.showPopup({
//     title: "✅ Заказ принят!",
//     message: popupMessage,
//     buttons: [{ type: "ok", text: "Понятно" }],
//   });
// } catch (error) {
//   // Fallback к alert
//   tg.showAlert(orderSummary);
// }
// };

export function useTelegramUi() {
  const { cart, total: cartTotal, hasItems } = useCart();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // const createOrderPayload = useCallback((): OrderPayload => {
  //   const items: OrderItem[] = [];
  //   Object.entries(cart).forEach(([productID, variantState]) => {
  //     const product = MENU.find((m) => m.id === productID);
  //     if (!product) return;
  //
  //     Object.entries(variantState).forEach(([variantID, count]) => {
  //       if (count <= 0) return;
  //
  //       const variant = product.variants.find((v) => v.id === variantID);
  //       if (!variant) return;
  //
  //       const basePrice = variant.cost;
  //       const discountedPrice = product.discount
  //         ? basePrice * (1 - product.discount / 100)
  //         : basePrice;
  //
  //       items.push({
  //         id: product.id,
  //         title: `${product.title} (${variant.value})`,
  //         price: discountedPrice,
  //         quantity: count,
  //         description: product.description,
  //       });
  //     });
  //   });
  //
  //   return {
  //     action: "checkout",
  //     items,
  //     total: cartTotal,
  //     currency: "USD",
  //     delivery: null,
  //     timestamp: Date.now(),
  //     user: tg.initDataUnsafe?.user
  //       ? {
  //           id: tg.initDataUnsafe.user.id,
  //           username: tg.initDataUnsafe.user.username,
  //           first_name: tg.initDataUnsafe.user.first_name,
  //           last_name: tg.initDataUnsafe.user.last_name,
  //         }
  //       : undefined,
  //   };
  // }, [cart, cartTotal]);

  const submitOrder = useCallback(
    (payload: OrderPayload) => {
      setIsSubmitting(true);
      try {
        tg.sendData(JSON.stringify(payload));
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
    },
    [setIsSubmitting],
  );
  const { products } = useProducts();
  const { user } = useUser();
  const createOrder: () => OrderPayload = useCallback(() => {
    if (!user) throw Error("user not found");
    const cartTemp: OrderPayload["cart"] = [];
    Object.entries(cart).forEach(([productID, variantState]) => {
      const product = products.find((m) => m.id === productID);
      if (!product) return;

      Object.entries(variantState).forEach(([variantID, count]) => {
        if (count <= 0) return;

        const variant = product.variants?.find((v) => v.id === variantID);
        if (!variant) return;

        const basePrice = variant.cost;
        if (!basePrice) throw Error("basePrice is undefined");
        const discountedPrice = product.discount
          ? basePrice * (1 - product.discount / 100)
          : basePrice;
        cartTemp.push({
          productID: product.id,
          variantID: variant.id,
          quantity: count,
          price: discountedPrice,
        });
      });
    });
    return {
      userID: user.id,
      cart: cartTemp,
    };
  }, []);

  const handleMainButtonClick = useCallback(() => {
    if (location.pathname === "/delivery") {
      const payload = createOrder();
      submitOrder(payload);
    } else if (location.pathname === "/") {
      navigate("/delivery");
    }
  }, [location, navigate]);

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

  const getMainButtonState = () => {
    const { pathname } = location;
    const buttonColor = tg.themeParams.button_color || "#2481cc";

    if (pathname === "/delivery") {
      // if (!deliveryInfo) {
      //   return {
      //     text: "Заполните адрес и выберите курьера",
      //     show: false,
      //     color: buttonColor,
      //   };
      // }
      if (isSubmitting) {
        return {
          text: "📤 Отправляем заказ...",
          show: true,
          color: "#6c757d",
        };
      }
      return {
        text: `Оплатить · ${cartTotal.toFixed(2)}₽`,
        show: true,
        color: buttonColor,
      };
    }

    if (pathname === "/") {
      return {
        text: hasItems
          ? `Перейти к доставке · ${cartTotal.toFixed(2)}₽`
          : "Выберите товары",
        show: hasItems,
        color: buttonColor,
      };
    }

    return { text: "", show: false, color: buttonColor };
  };

  useEffect(() => {
    if (!tg || !isInitialized) return;

    const { text, show, color } = getMainButtonState();
    const textColor = tg.themeParams.button_text_color || "#ffffff";

    try {
      tg.MainButton.setParams({
        text,
        color,
        text_color: textColor,
      });

      if (show) {
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
      }
    } catch (error) {
      // Игнорируем ошибки MainButton
    }
  }, [cartTotal, hasItems, isInitialized, location, isSubmitting]);

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
