export type CartItemType = {
    id: number;
    title: string;
    img?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
  };
  
  export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
  };
  
  export type ActionTypes = {
    addToCart:(item:CartItemType)=> void;
    removeFromCart:(item:CartItemType)=> void;
    clearFromCart:()=> void;
  }
