import { MenuItem } from '../types';

export const MENU: MenuItem[] = [
  { 
    id: 'margherita', 
    title: 'Маргарита', 
    price: 12.99,
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
    description: 'Томатный соус, моцарелла, базилик',
    cardStyle: 'classic',
    ingredients: ['Томатный соус', 'Моцарелла', 'Базилик'],
    vegetarian: true,
    popular: true,
    discount: 15,
    weight: '30 см',
    cookingTime: '15 мин'
  },
  { 
    id: 'pepperoni', 
    title: 'Пепперони', 
    price: 15.99,
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
    description: 'Томатный соус, моцарелла, пепперони',
    cardStyle: 'modern',
    ingredients: ['Томатный соус', 'Моцарелла', 'Пепперони'],
    spicy: true,
    popular: true,
    weight: '30 см',
    cookingTime: '18 мин'
  },
  { 
    id: 'quattro-formaggi', 
    title: 'Четыре сыра', 
    price: 17.99,
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    description: 'Моцарелла, горгонзола, пармезан, рикотта',
    cardStyle: 'premium',
    ingredients: ['Моцарелла', 'Горгонзола', 'Пармезан', 'Рикотта'],
    vegetarian: true,
    discount: 20,
    weight: '30 см',
    cookingTime: '20 мин'
  },
  { 
    id: 'hawaiian', 
    title: 'Гавайская', 
    price: 16.99,
    img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    description: 'Томатный соус, моцарелла, ветчина, ананас',
    cardStyle: 'minimal',
    ingredients: ['Томатный соус', 'Моцарелла', 'Ветчина', 'Ананас'],
    weight: '30 см',
    cookingTime: '17 мин'
  },
  { 
    id: 'vegetarian', 
    title: 'Вегетарианская', 
    price: 14.99,
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
    description: 'Томатный соус, моцарелла, перец, грибы, лук',
    cardStyle: 'compact',
    ingredients: ['Томатный соус', 'Моцарелла', 'Перец', 'Грибы', 'Лук'],
    vegetarian: true,
    weight: '30 см',
    cookingTime: '16 мин'
  },
  { 
    id: 'bbq-chicken', 
    title: 'Барбекю курица', 
    price: 18.99,
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
    description: 'Барбекю соус, моцарелла, курица, лук, кинза',
    cardStyle: 'modern',
    ingredients: ['Барбекю соус', 'Моцарелла', 'Курица', 'Лук', 'Кинза'],
    weight: '30 см',
    cookingTime: '19 мин'
  }
];
