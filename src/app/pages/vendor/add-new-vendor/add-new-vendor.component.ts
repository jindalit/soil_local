import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-add-new-vendor',
  templateUrl: './add-new-vendor.component.html',
  styleUrls: ['./add-new-vendor.component.scss']
})
export class AddNewVendorComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  Vendor_info_form: FormGroup;
  Contact_person_info_form: FormGroup;
  Bank_info_form: FormGroup;
  Docupload_form: FormGroup;
  items: FormArray;




  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.Vendor_info_form = this._formBuilder.group({
      companyName: ['', Validators.required],
      companyType: ['', Validators.required],
      branch: ['', Validators.required],
      doi: ['', Validators.required],
      nob: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      gstin: ['', Validators.required],
      pan: ['', Validators.required],
      tin: ['', Validators.required],
      serviceTaxReg: ['', Validators.required],
      creditLimit: ['', Validators.required],
      creditDays: ['', Validators.required],

      address:this._formBuilder.group({
        countye: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        postalcode: ['', Validators.required],
        location: ['', Validators.required],
              }),
      items: this._formBuilder.array([ this.createItem() ])


    });
  }

  // spoc:
  //     this._formBuilder.group({
  //       name: ['', Validators.required],
  //       designation: ['', Validators.required],
  //       email: ['', Validators.required],
  //       contact: ['', Validators.required],
  //       financeName: ['', Validators.required],
  //       financeEmail: ['', Validators.required],
  //       financeContact: ['', Validators.required],
  //     }),
  //     bank: this._formBuilder.group({
  //       beneficiaryName: ['', Validators.required],
  //       beneficiaryAddress: ['', Validators.required],
  //       bankName: ['', Validators.required],
  //       bankAddress: ['', Validators.required],
  //       accNo: ['', Validators.required],
  //       accountType: ['', Validators.required],
  //       modeOfPayment: ['', Validators.required],
  //       ifsc: ['', Validators.required],
  //       micrno: ['', Validators.required],
  //     }),
  //     documents:{
  //       name: ['', Validators.required],
  //     type: ['', Validators.required],
  //     uri: ['', Validators.required],
  //     },

  createItem(): FormGroup {
    return this._formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }
  addItem(): void {
    this.items = this.Vendor_info_form.get('items') as FormArray;
    this.items.push(this.createItem());
  }


  vendor_form(){
    console.log(this.Vendor_info_form.value);
    
  }
}