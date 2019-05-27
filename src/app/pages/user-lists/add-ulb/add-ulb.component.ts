import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-ulb',
  templateUrl: './add-ulb.component.html',
  styleUrls: ['./add-ulb.component.scss']
})
export class AddUlbComponent implements OnInit {
  data: any = {};
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ULB_info_form: FormGroup;
  Contact_person_info_form: FormGroup;
  Address_info_form: FormGroup;
  Bank_info_form: FormGroup;
  Docupload_form: FormGroup;
  items: FormArray;
  addressData: any = {};
  currentFileName: any;
  expiryDate: any;
  httpUrl: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  uniqueId: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  constructor(private ApiCall: ApiService, private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    

  }
  reset() {
    this.data = {};
    this.data.address = {};
    this.data.spoc = {};
    this.data.bank = {};
    this.data.documents = [];
    this.data.address.location = {};
    this.data.testCert = {};
  }
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.uniqueId = params['id'];
        if (this.uniqueId) {
          this.ApiCall.fetchData('company?id=' + this.uniqueId).subscribe(data => {
            let apidata = (data as any);
            this.data = apidata.response.data.docs;
            this.callDistrict();
            this.callBlock();
            this.callgramPanchayat();
            this.callVillage();
            this.expiryDate = this.data.testCert["expiryDate"];
          });
        }
        else{
          this.reset();
        }
      });
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
          console.log("newlat", this.latitude);
          console.log("newlo", this.longitude);
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

    this.ULB_info_form = this._formBuilder.group({
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
      district: ['', Validators.required],
      block: ['', Validators.required],
      gramPanchayat: ['', Validators.required],
      doorNo: ['', Validators.required],
      village: ['', Validators.required],
      postalcode: ['', Validators.required],
      landmark: ['', Validators.required],
      street: ['', Validators.required],
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
    this.Docupload_form = this._formBuilder.group({
      expiryDate: ['', Validators.required],
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
  } getFile(params, type = null) {
    if (params.event.type == 4) {
      if (type == "testCertificate") {
        this.data.testCert["url"] = params.event.body.response.message;

      } else {
        this.data.documents.push({
          "name": this.currentFileName,
          "type": params.file.type,
          "url": params.event.body.response.message
        });
      }
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
  upload(fileUploadQueue, fileName) {
    this.currentFileName = fileName;
    fileUploadQueue.uploadAll();
  }
  addItem(): void {
    if (this.ULB_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required basic information.",
        timer: 10000
      });
      //alert();      
    }
    else if (this.Address_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required Address information.",
        timer: 10000
      });
    }
    else if (this.Contact_person_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required Contact person information.",
        timer: 10000
      });
      //alert("Please enter required Contact person information.");      
    }

    else if (this.Bank_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required bank information.",
        timer: 10000
      });
      //alert("Please enter required bank information.");      
    }
    else {
      this.data.type = 'ULB';
      this.data.nob = "ULB";
      this.data.location = {
        "type": "point",
        "coordinates": [this.latitude, this.longitude]
      };
      this.data.address.location = {
        "type": "point",
        "coordinates": [this.latitude, this.longitude]
      }
      if (this.expiryDate) {
        this.data.testCert["expiryDate"] = this.expiryDate;
      }

      if (this.uniqueId) {
        this.ApiCall.putData('company', this.data).subscribe(data => {
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
              title: "ULB updated successfully.",
              timer: 10000
            });
          }
          //alert(apidata.response.data.message);
          this.reset();
          this.router.navigate(['main/ulb-list']);
        })
      }
      else {


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
              title: "ULB added successfully.",
              timer: 10000
            });
          }
          //alert(apidata.response.data.message);
          this.reset();
          this.router.navigate(['main/home']);
        })
      }
    }


  }
  selectCountry($event) {
    this.data.address.countryName = $event.currentTarget.selectedOptions[0].label;
    this.data.address.country = $event.currentTarget.selectedOptions[0].value;
  }
  callBlock($event = null) {
    if ($event) {
      this.data.address.districtName = $event.currentTarget.selectedOptions[0].label;
      this.data.address.district = $event.currentTarget.selectedOptions[0].value;
    }
    this.ApiCall.fetchData('geos?geotype=blocks&query=districtCode:' + this.data.address.district).subscribe(data => {
      let apidata = (data as any);
      this.addressData.blocks = apidata.response.data.blocks;
    });
  }
  callgramPanchayat($event = null) {
    if ($event) {
      this.data.address.blockName = $event.currentTarget.selectedOptions[0].label;
      this.data.address.block = $event.currentTarget.selectedOptions[0].value;
    }
    this.ApiCall.fetchData('geos?geotype=gramPanchayats&query=blockCode:' + this.data.address.block).subscribe(data => {
      let apidata = (data as any);
      this.addressData.gramPanchayat = apidata.response.data.gramPanchayats;
    });
  }
  callDistrict($event = null) {
    if ($event) {
      this.data.address.stateName = $event.currentTarget.selectedOptions[0].label;
      this.data.address.state = $event.currentTarget.selectedOptions[0].value;
    }
    this.ApiCall.fetchData('geos?geotype=districts&query=stateCode:' + this.data.address.state).subscribe(data => {
      let apidata = (data as any);
      this.addressData.district = apidata.response.data.districts;
    });
  }
  callVillage($event = null) {
    if ($event) {
      this.data.address.gramPanchayatName = $event.currentTarget.selectedOptions[0].label;
      this.data.address.gramPanchayat = $event.currentTarget.selectedOptions[0].value;
    }
    this.ApiCall.fetchData('geos?geotype=villages&query=gramPanchayatCode:' + this.data.address.gramPanchayat).subscribe(data => {
      let apidata = (data as any);
      this.addressData.village = apidata.response.data.villages;
    });
  }
  changeVillage($event = null) {
    this.data.address.villageName = $event.currentTarget.selectedOptions[0].label;
    this.data.address.village = $event.currentTarget.selectedOptions[0].value;
  }
  nextStep(type) {
    if (type == "address" && this.ULB_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required basic information.",
        timer: 10000
      });
    }
    else if (type == "person_info" && this.Address_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required Address information.",
        timer: 10000
      });
    }
    else if (type == "bank_info" && this.Contact_person_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required Contact person information.",
        timer: 10000
      });
    }
    else if (type == "docs" && this.Bank_info_form.status == "INVALID") {
      Swal.fire({
        type: 'error',
        title: "Please enter required Bank information.",
        timer: 10000
      });
    }
  }
}