import { MenuItem, Product } from "../types";

//  const pizzaMenu: MenuItem[] = [
//   {
//     id: 'margherita',
//     title: 'Маргарита',
//     price: 12.99,
//     img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
//     description: 'Томатный соус, моцарелла, базилик',
//     cardStyle: 'classic',
//     ingredients: ['Томатный соус', 'Моцарелла', 'Базилик'],
//     vegetarian: true,
//     popular: true,
//     discount: 15,
//     weight: '30 см',
//     cookingTime: '15 мин'
//   },
//   {
//     id: 'pepperoni',
//     title: 'Пепперони',
//     price: 15.99,
//     img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
//     description: 'Томатный соус, моцарелла, пепперони',
//     cardStyle: 'classic',
//     ingredients: ['Томатный соус', 'Моцарелла', 'Пепперони'],
//     spicy: true,
//     popular: true,
//     discount: 10,
//     weight: '30 см',
//     cookingTime: '18 мин'
//   },
//   {
//     id: 'quattro-formaggi',
//     title: 'Четыре сыра',
//     price: 17.99,
//     img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
//     description: 'Моцарелла, горгонзола, пармезан, рикотта',
//     cardStyle: 'classic',
//     ingredients: ['Моцарелла', 'Горгонзола', 'Пармезан', 'Рикотта'],
//     vegetarian: true,
//     discount: 20,
//     weight: '30 см',
//     cookingTime: '20 мин'
//   },
//   {
//     id: 'hawaiian',
//     title: 'Гавайская',
//     price: 16.99,
//     img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
//     description: 'Томатный соус, моцарелла, ветчина, ананас',
//     cardStyle: 'classic',
//     ingredients: ['Томатный соус', 'Моцарелла', 'Ветчина', 'Ананас'],
//     weight: '30 см',
//     cookingTime: '17 мин'
//   },
//   {
//     id: 'vegetarian',
//     title: 'Вегетарианская',
//     price: 14.99,
//     img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
//     description: 'Томатный соус, моцарелла, перец, грибы, лук',
//     cardStyle: 'classic',
//     ingredients: ['Томатный соус', 'Моцарелла', 'Перец', 'Грибы', 'Лук'],
//     vegetarian: true,
//     weight: '30 см',
//     cookingTime: '16 мин'
//   },
//   {
//     id: 'bbq-chicken',
//     title: 'Барбекю курица',
//     price: 18.99,
//     img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
//     description: 'Барбекю соус, моцарелла, курица, лук, кинза',
//     cardStyle: 'classic',
//     ingredients: ['Барбекю соус', 'Моцарелла', 'Курица', 'Лук', 'Кинза'],
//     weight: '30 см',
//     cookingTime: '19 мин'
//   }
// ];

const pizzaMenu: Product[] = [
  {
    id: "margherita",
    title: "Маргарита",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, базилик",
    discount: 15,
    variants: [
      { id: "25cm", value: "25 см", cost: 450, stock: 10 },
      { id: "30cm", value: "30 см", cost: 650, stock: 8 },
      { id: "35cm", value: "35 см", cost: 850, stock: 5 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "spicySauce",
        value: "Острый соус",
        priceModifier: 50,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Базилик"],
    },
  },
  {
    id: "pepperoni",
    title: "Пепперони",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, пепперони",
    discount: 10,
    variants: [{ id: "35cm", value: "35 см", cost: 400, stock: 6 }],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraPepperoni",
        value: "Доп. пепперони",
        priceModifier: 200,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Пепперони"],
    },
  },
  {
    id: "quattro-formaggi",
    title: "Четыре сыра",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
    description: "Моцарелла, горгонзола, пармезан, рикотта",
    discount: 20,
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 7 },
      { id: "30cm", value: "30 см", cost: 200, stock: 6 },
      { id: "35cm", value: "35 см", cost: 400, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      { id: "honey", value: "Мёд", priceModifier: 70, isEnable: true },
    ],
    tags: {
      name: "Состав",
      tags: ["Моцарелла", "Горгонзола", "Пармезан", "Рикотта"],
    },
  },
  {
    id: "hawaiian",
    title: "Гавайская",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, ветчина, ананас",
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 10 },
      { id: "30cm", value: "30 см", cost: 200, stock: 7 },
      { id: "35cm", value: "35 см", cost: 400, stock: 5 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraPineapple",
        value: "Доп. ананас",
        priceModifier: 100,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Ветчина", "Ананас"],
    },
  },
  {
    id: "vegetarian",
    title: "Вегетарианская",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, перец, грибы, лук",
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 15 },
      { id: "30cm", value: "30 см", cost: 200, stock: 10 },
      { id: "35cm", value: "35 см", cost: 400, stock: 6 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraMushrooms",
        value: "Доп. грибы",
        priceModifier: 120,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Перец", "Грибы", "Лук"],
    },
  },
  {
    id: "bbq-chicken",
    title: "Барбекю курица",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
    description: "Барбекю соус, моцарелла, курица, лук, кинза",
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 8 },
      { id: "30cm", value: "30 см", cost: 200, stock: 6 },
      { id: "35cm", value: "35 см", cost: 400, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraChicken",
        value: "Доп. курица",
        priceModifier: 180,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Барбекю соус", "Моцарелла", "Курица", "Лук", "Кинза"],
    },
  },
];

export const MENU = pizzaMenu;
