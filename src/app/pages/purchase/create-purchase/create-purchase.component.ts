import { Product } from './../../../shared/models/product.model';
import { Component, OnInit,NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {HttpClient} from '@angular/common/http'

import {ApiService} from '../../../services/api.service';
import {LocaldataService} from '../../../services/localdata.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.scss']
})
export class CreatePurchaseComponent implements OnInit {

//user_details_from service
Local_Loggedin_user_info;


vendor_id;
shipping_address;

Purchase_prefill;
Pur_vendor;
  add_purchase_form: FormGroup;
  breakpoint: number;
  title = 'app';
  Fill_purchase_table_form:FormGroup;
  public btn_bool_sv;
  public  btn_bool_up;
//Tax Information
Total_pur_WoT=0;
Total_tax=0;
Total_pur=0;
Edit_list_index;

//Final Total Information
Pur_total_sgst=0;
Pur_total_cgst=0;
Pur_total_igst=0;
Pur_total_amnt_wo_tax=0;
Pur_total_tax=0;
Pur_total_amnt=0;
//





//Ng Model Vendor Information Form
  data_Pur_ven_id;
  data_Pur_ven_ship_addr;

//Ng Model Add Product Form
  Model_Pur_prod_name;
  Model_Pur_prod_hsn;
  Model_Pur_prod_price;
  Model_Pur_prod_pkg_type;
  Model_Pur_prod_pkg_qty;
  // Model_Pur_prod_unit_qty;
  Model_Pur_prod_tax_type;
  Model_Pur_prod_tax_percent;
  Model_Pur_prod_tax_sgst;
  Model_Pur_prod_tax_cgst;
  Model_Pur_prod_tax_igst;


typeOfPackages:any={};
Pur_products;
typeOfTaxes:any={};
gstValues:any={};

  public rows: Array<{
    productID:string,
    product: any,
    hsn: string, 
    price: number,
    sellingPrice:number, 
    packageType: string, 
    quantity: number,
    tax_Type: string,
    amount:number,
    tax_Percent: string,
    sgst: number,
    cgst: number,
    igst: number,
    totalTax:number,
    totalAmount: number}> = [];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(public fb:FormBuilder,
    private ngZone: NgZone,
    private http:HttpClient,
    public api:ApiService,
    public local_data:LocaldataService) { 

    this.btn_bool_sv= true;
    this.btn_bool_up= false;

 var user_obj= JSON.parse(localStorage.getItem('user_obj'));

 this.Local_Loggedin_user_info = user_obj.user;

 console.log('Local_Loggedin_user_info',this.Local_Loggedin_user_info);
 

  }



  ngOnInit() {


var data={
  "companySearch":{},
  "productSearch":{}
  
  }
    this.http.post(this.api.getip()+'page-service/purchase/prefill',data)
    .subscribe(res=>{
this.Purchase_prefill=res;
      console.log(this.Purchase_prefill.response.data);

      this.local_data.set_Purchase_prefill_data(this.Purchase_prefill.response.data);

      this.Pur_vendor=this.Purchase_prefill.response.data.companies;
      this.typeOfPackages=this.Purchase_prefill.response.data.typeOfPackages;
      this.Pur_products=this.Purchase_prefill.response.data.products;
      this.typeOfTaxes=this.Purchase_prefill.response.data.typeOfTaxes;
      this.gstValues=this.Purchase_prefill.response.data.gstValues;
     
      
      
    });

this.Fill_purchase_table_form = this.fb.group({
  
  // Pur_ven_id:[''],
  // Pur_ven_ship_addr:[],

  Pur_prod_name:[''],
  Pur_prod_hsn:[''],
  Pur_prod_price:[''],
  Pur_prod_pkg_type:[''],
  Pur_prod_pkg_qty:[''],
  Pur_prod_unit_qty:[''],
  Pur_prod_tax_type:[''],
  Pur_prod_tax_percent:[''],
  Pur_prod_tax_sgst:[''],
  Pur_prod_tax_cgst:[''],
  Pur_prod_tax_igst:[''],
  
});

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  buttonClicked() {
    this.rows.push({
      productID:this.Fill_purchase_table_form.value.Pur_prod_name.uniqueId,
      product: this.Fill_purchase_table_form.value.Pur_prod_name, 
      hsn : this.Fill_purchase_table_form.value.Pur_prod_hsn,
      price: this.Fill_purchase_table_form.value.Pur_prod_price,
      sellingPrice: this.Fill_purchase_table_form.value.Pur_prod_price,
      packageType: this.Fill_purchase_table_form.value.Pur_prod_pkg_type,
      quantity: parseFloat(this.Fill_purchase_table_form.value.Pur_prod_pkg_qty),
      tax_Type: this.Fill_purchase_table_form.value.Pur_prod_tax_type,
      tax_Percent: this.Fill_purchase_table_form.value.Pur_prod_tax_percent,
      sgst: this.chk_type_number(this.Fill_purchase_table_form.value.Pur_prod_tax_sgst),
      cgst:  this.chk_type_number(this.Fill_purchase_table_form.value.Pur_prod_tax_cgst),
      igst: this.chk_type_number(this.Fill_purchase_table_form.value.Pur_prod_tax_igst),
      totalTax: this.chk_type_number(this.Total_tax),
      amount: this.chk_type_number(this.Total_pur_WoT),
      totalAmount: this.chk_type_number(this.Total_pur)
      });   
      
      
console.log(this.rows);
this.Final_total_pur_info()


};


edit_list(row,i){
  this.Edit_list_index=i;
console.log(row);

if(this.btn_bool_sv==true){
  this.btn_bool_sv=false;
  this.btn_bool_up=true;
}


};

Update_list(index){
   index =this.Edit_list_index
  if(this.btn_bool_up==true){
    this.btn_bool_sv=true;
    this.btn_bool_up=false;
    this.rows[index].product= this.Fill_purchase_table_form.value.Pur_prod_name, 
    this.rows[index].hsn = this.Fill_purchase_table_form.value.Pur_prod_hsn,
    this.rows[index].price= this.Fill_purchase_table_form.value.Pur_prod_price,
    this.rows[index].packageType= this.Fill_purchase_table_form.value.Pur_prod_pkg_type,
    this.rows[index].quantity= parseFloat(this.Fill_purchase_table_form.value.Pur_prod_pkg_qty),
    // this.rows[index].Tbl_unit_qty= this.Fill_purchase_table_form.value.Pur_prod_unit_qty,
    this.rows[index].tax_Type= this.Fill_purchase_table_form.value.Pur_prod_tax_type,
    this.rows[index].tax_Percent= this.Fill_purchase_table_form.value.Pur_prod_tax_percent,
    this.rows[index].sgst= this.chk_type_number(this.Fill_purchase_table_form.value.Pur_prod_tax_sgst),
    this.rows[index].cgst=  this.chk_type_number(this.Fill_purchase_table_form.value.Pur_prod_tax_cgs),
    this.rows[index].igst= this.chk_type_number(this.Fill_purchase_table_form.value.Pur_prod_tax_igst)
    this.rows[index].totalAmount= this.chk_type_number(this.Total_pur)

    this.Final_total_pur_info()

  }

}

Final_total_pur_info(){


  this.Pur_total_amnt_wo_tax=0;
  this.Pur_total_amnt=0;
  this.Pur_total_tax=0

  this.Pur_total_sgst=0;
  this.Pur_total_cgst=0;
  this.Pur_total_igst=0;

for (let index = 0; index < this.rows.length; index++) {
  const element = this.rows
  console.log(element);
let that=this;
  that.Pur_total_amnt_wo_tax=that.Pur_total_amnt_wo_tax+that.rows[index].totalAmount;
  that.Pur_total_tax= that.Pur_total_tax + (function(){
    if(that.rows[index].cgst){
      return that.rows[index].cgst;
    }else{
      return 0

    }
  }())+(function(){
    if(that.rows[index].sgst){
      console.log(that.rows[index].sgst);

      return that.rows[index].sgst;
    }else{
      return 0

    }
  }())+(function(){
    if(that.rows[index].igst){
      console.log(that.rows[index].igst);

      return that.rows[index].igst;
    }else{
      return 0

    }
  }())


  console.log("that.Pur_total_tax", that.Pur_total_tax);
  that.Pur_total_amnt= that.Pur_total_amnt_wo_tax+that.Pur_total_tax;
  console.log(that.Pur_total_amnt);

  

  that.Pur_total_sgst= that.Pur_total_sgst+ this.chk_null(that.rows[index].sgst)
  that.Pur_total_cgst= that.Pur_total_cgst+this.chk_null(that.rows[index].cgst)
  that.Pur_total_igst= that.Pur_total_igst+this.chk_null(that.rows[index].igst)

}
console.log(this.Pur_total_amnt);




}




selected_product(){
  console.log("product",this.Model_Pur_prod_name);
  this.Model_Pur_prod_hsn=this.Model_Pur_prod_name.hsnCode;
  this.Model_Pur_prod_price=this.Model_Pur_prod_name.price;
  // this.Model_Pur_prod_pkg_type=this.Model_Pur_prod_name.
  // this.Model_Pur_prod_pkg_qty=this.Model_Pur_prod_name.
  // this.Model_Pur_prod_unit_qty=this.Model_Pur_prod_name.
  this.Model_Pur_prod_tax_type=this.Model_Pur_prod_name.taxType;
  //  this.Model_Pur_prod_tax_percent=this.Model_Pur_prod_name.
  // this.Model_Pur_prod_tax_sgst=this.Model_Pur_prod_name.
  // this.Model_Pur_prod_tax_cgst=this.Model_Pur_prod_name.
  // this.Model_Pur_prod_tax_igst=this.Model_Pur_prod_name.
};


product_total_price(){
console.log(this.Model_Pur_prod_tax_percent);
this.Total_pur_WoT= parseInt(this.Model_Pur_prod_pkg_qty)* parseFloat(this.Model_Pur_prod_price);
console.log(this.Total_pur_WoT);
this.Total_tax = Math.round((parseInt(this.Model_Pur_prod_tax_percent)/100)*this.Total_pur_WoT)
this.Total_pur=this.Total_pur_WoT+this.Total_tax;
this.Model_Pur_prod_tax_sgst = this.Tax_divide(this.Total_tax) ;

let that=this
that.Model_Pur_prod_tax_igst = (function(){  
  
  if(that.Model_Pur_prod_tax_sgst){

    return  that.Tax_divide(that.Total_tax);
  }else if(that.Model_Pur_prod_tax_cgst){

    return  that.Tax_divide(that.Total_tax);
  }else{
    return 0
  }
 }()); 

 console.log(
  that.Model_Pur_prod_tax_igst);
}



Delete_pro_list(index){
  console.log(index);
  this.rows.splice(index,1)
  this.Final_total_pur_info()

}
chk_null(data){
if(data){


  return parseInt(data)
}else{
  return 0
}
}

Tax_divide(tax){

if(tax){

  return tax/2
}else{
  return 0
}

}


Final_purchase_submission(){

var Purchase_data ={
  
  vendorID:this.vendor_id,
  vendorType:"",
  companyId:this.Local_Loggedin_user_info.companyId,
  address:{
    billing:{
      addressString:'',
      address:{},
    },
    shipping:{
      addressString:'',
      address:this.Local_Loggedin_user_info.address,
    }

  },
  purchaseProduct:this.rows,
  totalAmountWithoutTax:this.Pur_total_amnt_wo_tax,
  totalCGST: ''+this.Pur_total_cgst,
  totalSGST:''+this.Pur_total_sgst,
  totalIGST:''+this.Pur_total_igst,
  totalTax:this.Pur_total_tax,
  totalAmount:this.Pur_total_amnt,
  fInalAmount:this.Pur_total_amnt,
}

console.log(Purchase_data);

this.http.post(this.api.getip()+'purchase',Purchase_data)
.subscribe(res=>{
  console.log(res);
Swal.fire({
  type: 'success',
                title: 'Purchase Created',
                timer: 3500
});  
})

}

chk_type_number(data){

if(data){

  return data
}else{

  return 0
}

}


}
