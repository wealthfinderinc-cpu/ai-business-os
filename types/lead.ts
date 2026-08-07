export interface Lead {

  id:number;

  leadId:string;

  fullName:string;

  mobile:string;

  email?:string;

  city?:string;

  source?:string;

  remarks?:string;

  status:string;

  createdAt:string;

  updatedAt:string;

}

export interface LeadForm{

  fullName:string;

  mobile:string;

  email?:string;

  city?:string;

  source?:string;

  remarks?:string;

}