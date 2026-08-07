export interface Order{

  id:number;

  orderNumber:string;

  customerId:number;

  userId:number;

  subtotal:number;

  tax:number;

  discount:number;

  total:number;

  status:string;

  paymentStatus:string;

  createdAt:string;

  updatedAt:string;

}

export interface OrderItem{

  id:number;

  orderId:number;

  productId:number;

  quantity:number;

  price:number;

  total:number;

}