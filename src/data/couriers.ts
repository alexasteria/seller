import { CourierService } from '../types';

export const COURIER_SERVICES: CourierService[] = [
  {
    id: 'yandex',
    name: 'Яндекс.Еда',
    price: 2.99,
    time: '30-45 мин',
    description: 'Быстрая доставка от партнеров'
  },
  {
    id: 'delivery-club',
    name: 'Delivery Club',
    price: 3.49,
    time: '40-60 мин',
    description: 'Надежная доставка по городу'
  },
  {
    id: 'courier',
    name: 'Собственный курьер',
    price: 1.99,
    time: '45-75 мин',
    description: 'Экономичная доставка'
  }
];

