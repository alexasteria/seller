# Durger Bot (Telegram Web App)

Приложение на React + TypeScript для WebView Telegram. Повторяет UX примера Durger Bot: меню, счётчики, корзина, MainButton и отправка данных в бота.

## Установка

```bash
cd /Users/alexasteria/Documents/seller
npm install
```

## Разработка

```bash
npm run dev
```
Откройте `http://localhost:5173`.

> Полный функционал (MainButton, тема) доступен внутри Telegram-клиента.

## Сборка и превью

```bash
npm run build
npm run preview
```

## Интеграция в бота

- В BotFather укажите URL этого приложения как Web App
- В `index.html` подключён `telegram-web-app.js`, в коде используется `window.Telegram.WebApp`
- При нажатии MainButton отправляется JSON с корзиной через `sendData`
8205877380:AAHAeXDpl82cYT_L3VBv4V3ljur0ByCujss
Пример payload:
```json
{
  "action": "checkout",
  "items": [
    { "id": "classic", "title": "Classic Burger", "price": 5.99, "quantity": 2 }
  ],
  "total": 11.98,
  "currency": "USD"
}
```

