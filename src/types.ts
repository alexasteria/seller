interface Product {
  id: string;
  title: string;
  price: number;
  img?: string;
  description?: string;
  discount?: number;
}
export interface MenuItem extends Product  {
  // id: string;
  // title: string;
  // price: number;
  // img?: string;
  // description?: string;
  cardStyle?: 'classic' | 'premium';
  ingredients?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
  // discount?: number;
  weight?: string;
  cookingTime?: string;
};

export type CartState = Record<string, number>;

export type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description?: string;
};

export type OrderPayload = {
  action: 'checkout';
  items: OrderItem[];
  total: number;
  currency: string;
  delivery?: DeliveryInfo;
  timestamp?: number;
  user?: {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
  };
};

export type DeliveryAddress = {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  comment?: string;
};

export type CourierService = {
  id: string;
  name: string;
  price: number;
  time: string;
  description: string;
};

export type DeliveryInfo = {
  address: DeliveryAddress;
  courier: CourierService;
  totalWithDelivery: number;
};
