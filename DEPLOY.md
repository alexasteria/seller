# 🚀 Инструкции по деплою

## Варианты деплоя

### 1. GitHub Pages (Бесплатно)

#### Автоматический деплой:
1. Создайте репозиторий на GitHub
2. Запушьте код в репозиторий
3. В настройках репозитория включите GitHub Pages
4. Выберите ветку `main` и папку `/docs` или `/dist`

#### Ручной деплой:
```bash
# Соберите проект
npm run build

# Перейдите в папку dist
cd dist

# Инициализируйте git
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Добавьте remote и запушьте
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin gh-pages
```

### 2. Netlify (Бесплатно)

#### Автоматический деплой:
1. Зайдите на [netlify.com](https://netlify.com)
2. Подключите ваш GitHub репозиторий
3. Настройки сборки:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Нажмите "Deploy site"

#### Ручной деплой:
1. Соберите проект: `npm run build`
2. Загрузите папку `dist` на netlify.com через drag & drop

### 3. Vercel (Бесплатно)

#### Автоматический деплой:
1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub репозиторий
3. Vercel автоматически определит настройки из `vercel.json`
4. Нажмите "Deploy"

### 4. Firebase Hosting (Бесплатно)

```bash
# Установите Firebase CLI
npm install -g firebase-tools

# Войдите в аккаунт
firebase login

# Инициализируйте проект
firebase init hosting

# Соберите проект
npm run build

# Деплой
firebase deploy
```

### 5. Surge.sh (Бесплатно)

```bash
# Установите Surge
npm install -g surge

# Соберите проект
npm run build

# Деплой
surge dist
```

## 🔧 Настройка для Telegram Bot

После деплоя:

1. Скопируйте URL вашего сайта
2. В BotFather настройте Web App:
   ```
   /setmenubutton
   Выберите бота
   Введите URL вашего сайта
   Введите описание кнопки
   ```

3. В коде бота используйте URL для открытия Web App:
   ```javascript
   bot.onText(/\/start/, (msg) => {
     const webAppUrl = 'https://your-domain.com';
     bot.sendMessage(msg.chat.id, 'Откройте меню:', {
       reply_markup: {
         inline_keyboard: [[
           { text: '🍕 Открыть меню', web_app: { url: webAppUrl } }
         ]]
       }
     });
   });
   ```

## 📱 Тестирование

1. Откройте сайт в браузере
2. Проверьте все карточки товаров
3. Протестируйте добавление в корзину
4. Проверьте адаптивность на мобильных устройствах
5. Протестируйте в Telegram Web App

## 🎨 Кастомизация

### Изменение стилей карточек:
- Отредактируйте файл `src/styles.css`
- Измените CSS переменные в `:root`
- Добавьте новые стили для карточек

### Добавление новых товаров:
- Отредактируйте `src/data/menu.ts`
- Добавьте новые поля в `src/types.ts`
- Создайте новые компоненты карточек при необходимости

## 🚨 Устранение проблем

### Ошибки сборки:
```bash
# Очистите кэш
rm -rf node_modules
npm install

# Пересоберите проект
npm run build
```

### Проблемы с деплоем:
- Проверьте, что все файлы закоммичены
- Убедитесь, что папка `dist` создана
- Проверьте настройки в конфигурационных файлах

### Проблемы с Telegram Web App:
- Убедитесь, что сайт работает по HTTPS
- Проверьте, что URL правильно настроен в BotFather
- Протестируйте в реальном Telegram клиенте

---

**Удачного деплоя! 🎉**
