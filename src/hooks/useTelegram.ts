import { useEffect, useState, useCallback } from "react";
import { WebApp } from "telegram-web-app";
import { useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/contexts/ProductsContext";
import { useUser } from "@/contexts/UserContext.tsx";
import { Api, ModelsCreateOrderRequest } from "@/backendApi.ts";

const tg: WebApp = (window as any).Telegram?.WebApp;

export function useTelegramUi() {
  const { cart, total: cartTotal, hasItems } = useCart();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const submitOrder = useCallback(
    async (payload: ModelsCreateOrderRequest) => {
      const api = new Api({ baseURL: "/api" });
      setIsSubmitting(true);
      try {
        //tg.sendData(JSON.stringify(payload));
        await api.orders.ordersCreate({ tenant: "SELL_DEPARTMENT" }, payload);
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
  const createOrder: () => ModelsCreateOrderRequest = useCallback(() => {
    if (!user) throw Error("user not found");
    if (!tg.initDataUnsafe?.chat) {
      throw new Error("Telegram chat data is not available.");
    }
    const cartTemp: ModelsCreateOrderRequest["cart"] = [];
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
        if (!product.id || !variant.id)
          throw Error("!product.id || !variant.id");
        cartTemp.push({
          productID: product.id,
          variantID: variant.id,
          quantity: count,
          price: discountedPrice,
        });
      });
    });
    return {
      chatID: tg.initDataUnsafe.chat.id,
      userID: user.id,
      cart: cartTemp,
    };
  }, [cart, products, user]);

  const handleMainButtonClick = useCallback(() => {
    if (location.pathname === "/delivery") {
      const payload = createOrder();
      submitOrder(payload);
    } else if (location.pathname === "/") {
      navigate("/delivery");
    }
  }, [location, navigate, createOrder, submitOrder]);

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
