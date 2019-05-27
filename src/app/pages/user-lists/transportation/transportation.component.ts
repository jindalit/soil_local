import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {
  data:any={};
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  TRA_info_form: FormGroup;
  Contact_person_info_form: FormGroup;
  Address_info_form: FormGroup;
  Bank_info_form: FormGroup;
  Docupload_form: FormGroup;
  items: FormArray;
  addressData: any = {};
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  currentFileName:any;
  httpUrl:any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  constructor(private ApiCall: ApiService,private _formBuilder: FormBuilder, private router: Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.data.address= {};
    this.data.address.location={};
    this.data.spoc = {};
    this.data.bank = {};
    this.data.documents = [];
   }
reset(){
  this.data={};
  this.data.address= {};
    this.data.spoc = {};
    this.data.bank = {};
    this.data.address.location={};
    this.data.documents = [];
}
  ngOnInit() {
    this.httpUrl = this.ApiCall.httpDocURL;
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log("newlat",this.latitude);
          console.log("newlo",this.longitude);
          this.zoom = 15;
        });
      });
    });    
    this.ApiCall.fetchData('geos?geotype=countries').subscribe(data => {
      let apidata = (data as any);
      this.addressData.Country = apidata.response.data.countries;
    });
    this.ApiCall.fetchData('geos?geotype=states').subscribe(data => {
      let apidata = (data as any);
      this.addressData.states = apidata.response.data.states;
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.TRA_info_form = this._formBuilder.group({
      companyName: ['', Validators.required],
      branch: ['', ''],
      regType: ['', ''],
      doi: ['', ''],
      nob: ['', ''],
      email: ['', ''],
      website: ['', ''],
      gstin: ['', Validators.required],
      pan: ['', ''],
      tin: ['', ''],
      serviceTaxReg: ['', ''],


      items: this._formBuilder.array([this.createItem()])


    });
    this.Address_info_form = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      district:['', Validators.required],
      block:['', Validators.required],
      gramPanchayat:['', Validators.required],
      doorNo:['', Validators.required],
      village:['', Validators.required],
      postalcode:['', Validators.required],
      landmark:['', Validators.required],
      street:['', Validators.required],
    });
    this.Contact_person_info_form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      fax: ['', ''],
      designation: ['', ''],
      contact: ['', Validators.required],
      financeName: ['', Validators.required],
      financeEmail: ['', Validators.required],
      financeContact: ['', Validators.required],
    });
    this.Bank_info_form = this._formBuilder.group({
      beneficiaryName: ['', Validators.required],
      beneficiaryAddress: ['', Validators.required],
      bankName: ['', Validators.required],
      bankAddress: ['', Validators.required],
      accNo: ['', Validators.required],
      accountType: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      ifsc: ['', Validators.required],
      micrno: ['', Validators.required],
    });
    
  }
  createItem(): FormGroup {
    return this._formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }
  getFile(params){
    if(params.event.type == 4){
      this.data.documents.push({
        "name":this.currentFileName,
        "type":params.file.type,
        "url":params.event.body.response.message
      });
      //alert(params.event.body.response.message);
    }
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;

      });
    }
  }
  upload(fileUploadQueue,fileName){
    this.currentFileName = fileName;
    fileUploadQueue.uploadAll();
  }
  addItem(): void {
    if(this.TRA_info_form.status == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required basic information.",
        timer: 10000
      });
      //alert();      
    }
    else if(this.Address_info_form.status == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required Address information.",
        timer: 10000
      });
    }
    else if(this.Contact_person_info_form.status == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required Contact person information.",
        timer: 10000
      });
      //alert("Please enter required Contact person information.");      
    }
    
    else if(this.Bank_info_form.status == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required bank information.",
        timer: 10000
      });
      //alert("Please enter required bank information.");      
    } 
    else{
      this.data.type = 'TRANSIT';
      this.data.nob = "TRANSIT";
      this.data.location ={
        "type":"point",
        "coordinates":[this.latitude,this.longitude]
      };
      this.data.address.location ={
        "type":"point",
        "coordinates":[this.latitude,this.longitude]
      }
      this.data.address.countryName = this.data.address.country.name;
      this.data.address.country = this.data.address.country.code;
      this.data.address.stateName = this.data.address.state.name;
      this.data.address.state = this.data.address.state.code;

      this.data.address.districtName = this.data.address.district.name;
      this.data.address.district = this.data.address.district.code;
      this.data.address.blockName = this.data.address.block.name;
      this.data.address.block = this.data.address.block.code;

      this.data.address.gramPanchayatName = this.data.address.gramPanchayat.name;
      this.data.address.gramPanchayat = this.data.address.gramPanchayat.code;
      this.data.address.villageName = this.data.address.village.name;
      this.data.address.village = this.data.address.village.code;
      this.ApiCall.postData('company', this.data).subscribe(data => {
        let apidata = (data as any);
        if (apidata.response.statusCode == 403) {
          Swal.fire({
            type: 'error',
            title: "user already exist.",
            timer: 10000
          });
        }
        else {
          Swal.fire({
            type: 'success',
            title: "Transportation added successfully.",
            timer: 10000
          });
        }
        //alert(apidata.response.data.message);
        this.reset();
        this.router.navigate(['main/home']);
      })
    }
    
   
  }callBlock() {
    this.ApiCall.fetchData('geos?geotype=blocks&query=districtCode:' + this.data.address.district.code).subscribe(data => {
      let apidata = (data as any);
      this.addressData.blocks = apidata.response.data.blocks;
    });
  }
  callgramPanchayat() {
    this.ApiCall.fetchData('geos?geotype=gramPanchayats&query=blockCode:' + this.data.address.block.code).subscribe(data => {
      let apidata = (data as any);
      this.addressData.gramPanchayat = apidata.response.data.gramPanchayats;
    });
  }
  callDistrict() {
    this.ApiCall.fetchData('geos?geotype=districts&query=stateCode:' + this.data.address.state.code).subscribe(data => {
      let apidata = (data as any);
      this.addressData.district = apidata.response.data.districts;
    });
  }
  callVillage() {
    this.ApiCall.fetchData('geos?geotype=villages&query=gramPanchayatCode:' + this.data.address.gramPanchayat.code).subscribe(data => {
      let apidata = (data as any);
      this.addressData.village = apidata.response.data.villages;
    });
  }
  nextStep(type){
    if(type == "address" && this.TRA_info_form.status == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required basic information.",
        timer: 10000
      });
    }
    else if(type=="person_info" && this.Address_info_form.status == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required Address information.",
        timer: 10000
      });
    }
    else if(type=="bank_info" && this.Contact_person_info_form.status  == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required Contact person information.",
        timer: 10000
      });
    }
    else if(type=="docs" && this.Bank_info_form.status  == "INVALID"){
      Swal.fire({
        type: 'error',
        title: "Please enter required Bank information.",
        timer: 10000
      });
    }
  }
}