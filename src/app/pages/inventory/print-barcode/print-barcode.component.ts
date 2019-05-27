import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-print-barcode',
  templateUrl: './print-barcode.component.html',
  styleUrls: ['./print-barcode.component.scss']
})
export class PrintBarcodeComponent implements OnInit {
  products: any;
  packages: any = [];
  batches: any = [];
  serials: any = [];
  company: any;
  productId: any;
  packageType: any;
  batchNo: any;
  companyId: any;
  barcode_form: FormGroup;
  batchIndex: any;
  startindex: any;
  endindex: any;
  constructor(private _formBuilder: FormBuilder, private ApiCall: ApiService) { }

  ngOnInit() {
    this.barcode_form = this._formBuilder.group({
      productId: ['', ''],
      packageType: ['', ''],
      companyName: ['', ''],
      batchIndex: ['', ''],
      startindex: ['', ''],
      endindex: ['', ''],
    })
    this.ApiCall.postData("company/search?pageNo=no", { "nob": ["ULB", "FPO"] }).subscribe(data => {
      let apidata = (data as any);
      this.company = apidata.response.data.docs;

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
  getBatches($event) {
    if (!this.companyId) {
      Swal.fire({
        type: 'error',
        title: "Please select Company Name",
        timer: 3500
      });
    }

    else if (!this.productId) {
      Swal.fire({
        type: 'error',
        title: "Please select Product Name",
        timer: 3500
      });
    }
    else if (!this.packageType) {
      Swal.fire({
        type: 'error',
        title: "Please select Package Type",
        timer: 3500
      });
    }
    else {
      // this.ApiCall.fetchData('batches?companyId='+this.companyId+'&productId='+this.productId+'&packageType='+this.packageType).subscribe(data => {
      this.ApiCall.fetchData('batches?companyId=FPOGEN000001&productId=5ccc6162bebef2e4fb5e398d&packageType=Box').subscribe(data => {
        let apidata = (data as any);
        this.batches = apidata.response.data.batches;
      });
    }
  }
  getSeries($event) {
    this.batchNo = this.batches[this.batchIndex].no;
    this.serials = this.batches[this.batchIndex].serialNos.slice(this.startindex, this.endindex);
  }
  sliceSeries(){
    this.serials = this.batches[this.batchIndex].serialNos.slice(this.startindex, this.endindex);
  }
  printPage() {
    if (!this.batchNo) {
      Swal.fire({
        type: 'error',
        title: "Please select batch first",
        timer: 3500
      });
    }
    else {
      //this.sliceVal = this.startindex+":"+this.endindex;
      window.print()
    }
  }
}
