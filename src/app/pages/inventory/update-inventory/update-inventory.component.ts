import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.scss']
})
export class UpdateInventoryComponent implements OnInit {
  products: any;
  packages: any = [];
  price:any;
  productId:any;
  packageType:any;
  availableQty:any;
  inventory_form: FormGroup;
  constructor(private _formBuilder: FormBuilder, private ApiCall: ApiService) { }

  ngOnInit() {
    this.inventory_form = this._formBuilder.group({
      productId: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      price: ['', Validators.required],
      packageType: ['', Validators.required],
      quantity: ['', Validators.required],
      manuDate: ['', Validators.required],
      expDate: ['', Validators.required],
      availableQty:['','']
    });
    this.ApiCall.postData('product/search?pageNo=-', { "status": ["Active"] }).subscribe(data => {
      let apidata = (data as any);
      this.products = apidata.response.data.docs;

    });
     this.ApiCall.fetchData('listing?code=LIST00006').subscribe(data => {
      let apidata = (data as any);
      this.packages = apidata.response.data.data.list;
      
    }); 
  }
  changeBuyingPrice($event){
     $event.source.options._results.map((item) =>{
      if(item._selected){
        this.price = item.id;
      }
    })
    this.productId = $event.value;
  }
  availableQuantity($event){
    this.ApiCall.fetchData('inventory/single?match=companyId:'+JSON.parse(localStorage.getItem("user_obj")).user.companyId+',productId:'+this.productId+',packageType:'+this.packageType).subscribe(data => {
      let apidata = (data as any);
      this.availableQty = apidata.response.message == "no data" ? 0 : apidata.response.data.inventory.quantity ;

    }); 
  }
  addInventory() {
    let param = this.inventory_form.value;
    param['companyId'] = JSON.parse(localStorage.getItem("user_obj")).user.companyId;
    this.ApiCall.putData('inventory/single', param).subscribe(data => {
      let apidata = (data as any);
      Swal.fire({
        type: 'success',
        title: "Successfully added to inventory",
        timer: 3500
      });
    })
  }

}
