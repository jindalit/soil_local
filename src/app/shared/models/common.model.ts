

export interface Product {
    name:string;
    category:string;
    desc: string;
    hsncode: string;
    price: number;
    gsttype: string;
    image: string;
    uniqueId:string;
  };

  export interface User {
    name:string;
    department:string;
    userName: string;
    mobile: string;
    location: {};
    email: string;
    createdOn: string;
  };


  export interface Purchase {
    name:string;
    department:string;
    userName: string;
    mobile: string;
    location: {};
    email: string;
    createdOn: string;
  };

  export interface Salelist {
    createdOn:string;
    invoiceNo:string;
    customerName:string;
    finalAmount:number;
    totalCGST:string;
    totalIGST:string;
    totalSGST:string;
    totalTax:number;
    totalAmount:number;
  };

  export interface Transit {
    createdOn:string;
    invoiceNo:string;
    customerName:string;
    address:string;
    saleProducts:any[];
    status:string;
    transport:any;
    spocName:string;
    spocNumber:string;
    track:any   
  };






  
  
  
  