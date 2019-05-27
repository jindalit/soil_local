import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';

import {HttpClient} from '@angular/common/http';

import {ApiService} from '../../../services/api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  add_product_form: FormGroup;

  Prod_prefill_res:any={};
  Prod_categories_list:any={};
  Prod_taxtype_list:any={};
  Prod_taxvalues_list:any={};


  constructor(private _formBuilder: FormBuilder,
    public http:HttpClient,
    public api:ApiService) { }

  ngOnInit() {
    this.add_product_form = this._formBuilder.group({
      name: ['', Validators.required],
      ProductCategory : ['', Validators.required],
      desc: ['', Validators.required],
      hsnCode: ['', Validators.required],
      price: ['', Validators.required],
      taxType: ['', Validators.required],
      productimage: ['', Validators.required],
      category: ['', Validators.required],
      taxPercentage: ['', Validators.required],
    });
this.api.GET_Method('products_prefill','')
    .subscribe(res=>{
console.log(res);
this.Prod_prefill_res = res;
this.Prod_categories_list=this.Prod_prefill_res.response.data.productCategories;
console.log(this.Prod_categories_list);
this.Prod_taxtype_list=this.Prod_prefill_res.response.data.typeOfTaxes;
this.Prod_taxvalues_list=this.Prod_prefill_res.response.data.gstValues;
    });
  };




  Add_product_submission(){
    this.add_product_form.controls.category.setValue(this.add_product_form.value.ProductCategory)

    console.log(this.add_product_form.value);  
if(this.add_product_form.valid){
  console.log(this.add_product_form.valid); 
this.api.POST_Method('product',this.add_product_form.value,'')
.subscribe(res=>{

  Swal.fire({
    type: 'success',
                  title: 'Product added successfully',
                  timer: 3500
  });
},err=>{

  Swal.fire({
    type: 'error',
                  title: err.respone,
                  timer: 3500
  });

})

}else{

  console.log("else",this.add_product_form.valid);

  Swal.fire({
    type: 'warning',
                  title: 'Please check the form',
                  timer: 3500
  });

}

  }

}
