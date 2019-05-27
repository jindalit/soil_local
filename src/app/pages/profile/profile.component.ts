import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: any = {};
  Basic_info_form: FormGroup;
  Address_info_form: FormGroup;
  addressData: any = {};
  public zoom: number;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  constructor(private ApiCall: ApiService, private _formBuilder: FormBuilder, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.data.user = {};
    this.data.user.address = {};
     }

  ngOnInit() {
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
    this.Basic_info_form = this._formBuilder.group({
      userName: ['', Validators.required],
      mobile: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      gender: ['', Validators.required],
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
    this.ApiCall.fetchData('user/get/'+JSON.parse(localStorage.getItem("user_obj")).user.userName).subscribe(data => {
      let apidata = (data as any);
      
      this.data = apidata.response.data;
      this.latitude = this.data.user.address.location.length  ? this.data.user.address.location.coordinates[0] : this.latitude;
      this.longitude = this.data.user.address.location.length  ? this.data.user.address.location.coordinates[1]:this.longitude;
      this.callBlock();
      this.callDistrict();
      this.callVillage();
      this.callgramPanchayat();
    });
    
    this.ApiCall.fetchData('geos?geotype=states').subscribe(data => {
      let apidata = (data as any);
      this.addressData.states = apidata.response.data.states;
    });
  }
  
  onChangeVal($event){
    this.data.user.gender = $event.value;
  }
  updateProfile(){   
    this.data.user.location = {
      "type": "point",
      "coordinates": [this.latitude, this.longitude]
    };
    this.data.user.address.location = {
      "type": "point",
      "coordinates": [this.latitude, this.longitude]
    }
    this.ApiCall.putData('user/profileupdate', this.data.user).subscribe(data => {
      let apidata = (data as any);
      
        Swal.fire({
          type: 'success',
          title: "Profile updated successfully. ",
          timer: 10000
        });
      
      this.router.navigate(['main/home']);
    })
  }
  callBlock() {
    this.ApiCall.fetchData('geos?geotype=blocks&query=districtCode:' + this.data.user.address.district).subscribe(data => {
      let apidata = (data as any);
      this.addressData.blocks = apidata.response.data.blocks;
    });
  }
  callgramPanchayat() {
    this.ApiCall.fetchData('geos?geotype=gramPanchayats&query=blockCode:' + this.data.user.address.block).subscribe(data => {
      let apidata = (data as any);
      this.addressData.gramPanchayat = apidata.response.data.gramPanchayats;
    });
  }
  callDistrict() {
    this.ApiCall.fetchData('geos?geotype=districts&query=stateCode:' + this.data.user.address.state).subscribe(data => {
      let apidata = (data as any);
      this.addressData.district = apidata.response.data.districts;
    });
  }
  callVillage() {
    this.ApiCall.fetchData('geos?geotype=villages&query=gramPanchayatCode:' + this.data.user.address.gramPanchayat).subscribe(data => {
      let apidata = (data as any);
      this.addressData.village = apidata.response.data.villages;
    });
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
}
