export interface Inventory{

  id:number;

  productId:number;

  quantity:number;

  warehouse?:string;

  updatedAt:string;

}

export interface StockMovement{

  productId:number;

  quantity:number;

  type:"IN"|"OUT";

  remarks?:string;

}