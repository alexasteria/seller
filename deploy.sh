#!/bin/bash

# Скрипт для деплоя на GitHub Pages

echo "🚀 Начинаем деплой..."

# Сборка проекта
echo "📦 Собираем проект..."
npm run build

# Проверяем, что сборка прошла успешно
if [ $? -eq 0 ]; then
    echo "✅ Сборка завершена успешно!"
    
    # Создаем ветку gh-pages если её нет
    echo "🌐 Подготавливаем GitHub Pages..."
    
    # Переходим в папку dist
    cd dist
    
    # Инициализируем git репозиторий
    git init
    git add .
    git commit -m "Deploy to GitHub Pages"
    
    echo "📤 Деплой готов!"
    echo ""
    echo "Для деплоя на GitHub Pages:"
    echo "1. Создайте репозиторий на GitHub"
    echo "2. Добавьте remote: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "3. Запушьте: git push -u origin gh-pages"
    echo ""
    echo "Для деплоя на Netlify:"
    echo "1. Загрузите папку 'dist' на netlify.com"
    echo ""
    echo "Для деплоя на Vercel:"
    echo "1. Подключите репозиторий к vercel.com"
    
else
    echo "❌ Ошибка при сборке проекта"
    exit 1
fi
