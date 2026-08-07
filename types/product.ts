export interface Product {

  id:number;

  productCode:string;

  name:string;

  category:string;

  brand?:string;

  description?:string;

  mrp:number;

  dp:number;

  gst:number;

  stock:number;

  minStock:number;

  active:boolean;

  image?:string;

  createdAt:string;

  updatedAt:string;

}

export interface ProductForm{

  name:string;

  category:string;

  brand?:string;

  description?:string;

  mrp:number;

  dp:number;

  gst:number;

  stock:number;

  minStock:number;

}