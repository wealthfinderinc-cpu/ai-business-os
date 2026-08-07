export interface Expense{

  id:number;

  title:string;

  category:string;

  amount:number;

  notes?:string;

  expenseDate:string;

}

export interface Payment{

  id:number;

  orderId?:number;

  amount:number;

  method:string;

  reference?:string;

  paymentDate:string;

}