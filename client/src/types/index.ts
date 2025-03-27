interface CartItems {
  productId: string;
  title: string;
  image: string;
  price: string;
  quantity: number;
}

interface AddressInfo {
  addressId: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}

export type SortParams =
  | "price-lowtohigh"
  | "price-hightolow"
  | "title-atoz"
  | "title-ztoa";

export interface OrderProps {
  _id: string;
  userId: string;
  cartId: string;
  cartItems: CartItems[];
  addressInfo?: AddressInfo;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: string;
  orderUpstringstring: string;
  paymentId: string;
  payerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressProps {
  _id: string;
  userId: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProps {
  id: string;
  userName: string;
  email: string;
  role: "user" | "admin";
  password: string;
}

export interface ProductProps {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  salePrice: number;
  totalStock: number;
  averageReview: number;
  createdAt: string;
  updatedAt: string;
}

interface CartItemsProps {
  productId: ProductProps["_id"] | ProductProps;
  quantity: number;
}

export interface CartProps {
  _id: string;
  userId: UserProps["id"] | UserProps;
  items: CartItemsProps[];
  createdAt: string;
  updatedAt: string;
}

export interface FeatureProps {
  _id: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewProps {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
  createdAt: string;
  updatedAt: string;
}
