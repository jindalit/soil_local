import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isHandset$;
  user: any = {};
  addressData: any = {};
  selectedType: any = "fpo";
  currentPage: any = 1;
  repassword: any;
  registrationType: any = [{ name: "FPO", id: "fpo" }, { id: "farmer", name: "Farmer" }, { id: "ULB", name: "ULB" }]
  constructor(private ApiCall: ApiService,
    private translate: TranslateService, private router: Router) {
    this.user.gender = "Male";
    this.user.Address = {};

    this.translate.use('en').then(() => {
      console.log('fghfg', this.translate.data);
    });
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit() {

    this.ApiCall.fetchData('geos?geotype=countries').subscribe(data => {
      let apidata = (data as any);
      this.addressData.Country = apidata.response.data.countries;
    });
    this.ApiCall.fetchData('geos?geotype=states').subscribe(data => {
      let apidata = (data as any);
      this.addressData.states = apidata.response.data.states;
    });

  }
  callBlock() {
    this.ApiCall.fetchData('geos?geotype=blocks&query=districtCode:' + this.user.Address.district).subscribe(data => {
      let apidata = (data as any);
      this.addressData.blocks = apidata.response.data.blocks;
    });
  }
  callgramPanchayat() {
    this.ApiCall.fetchData('geos?geotype=gramPanchayats&query=blockCode:' + this.user.Address.block).subscribe(data => {
      let apidata = (data as any);
      this.addressData.gramPanchayat = apidata.response.data.gramPanchayats;
    });
  }
  callDistrict() {
    this.ApiCall.fetchData('geos?geotype=districts&query=stateCode:' + this.user.Address.state).subscribe(data => {
      let apidata = (data as any);
      this.addressData.district = apidata.response.data.districts;
    });
  }
  callVillage() {
    this.ApiCall.fetchData('geos?geotype=villages&query=gramPanchayatCode:' + this.user.Address.gramPanchayat).subscribe(data => {
      let apidata = (data as any);
      this.addressData.village = apidata.response.data.villages;
    });
  }
  validateMandatory(page) {
    if (this.currentPage == 1) {
      if (!this.user.name || this.user.name == "") {
        Swal.fire({
          type: 'error',
          title: "Please enter user name.",
          timer: 3500
        });
        //alert("Please enter user name.")
      }
      else if (!this.user.email || this.user.email == "") {
        Swal.fire({
          type: 'error',
          title: "Please enter valid email.",
          timer: 3500
        });
        //alert("Please enter valid email.")
      }
      else if (!this.user.mobile || this.user.mobile == "") {
        Swal.fire({
          type: 'error',
          title: "Please enter mobile number.",
          timer: 3500
        });
       // alert("Please enter mobile number.")
      }
      else if (!this.user.password || this.user.password == "") {
        Swal.fire({
          type: 'error',
          title: "Please enter password.",
          timer: 3500
        });
        //alert("Please enter password.")
      }
      else {
        this.currentPage = page;
      }
    }
    else if (this.currentPage == 2) {
      if (!this.user.Address.state || this.user.Address.state == "") {
        Swal.fire({
          type: 'error',
          title: "Please select state.",
          timer: 3500
        });
       // alert("Please select state.");
      }
      else {
        this.currentPage = page;
      }
    }
    else {
      if (!this.user.Address.postalcode || this.user.Address.postalcode == "") {
        Swal.fire({
          type: 'error',
          title: "Please enter postal code.",
          timer: 3500
        });
        //alert("Please enter postal code.")
      }
      else
        this.currentPage = page;
    }

  }
  registerUser() {
    if (this.repassword == this.user.password) {
      if (this.selectedType !== "" && this.user.name && this.user.email && this.user.mobile && this.user.Address.postalcode && this.user.Address.state) {
        this.ApiCall.postData('user/create/v2/' + this.selectedType, this.user).subscribe(data => {
          let apidata = (data as any);
          Swal.fire({
            type: 'success',
            title: "Registered successfully - kindly login.",
            timer: 10000
          });
          //alert("Registered successfully - kindly login.");
          this.router.navigate(['']);
        })
      }
    }
    else {
      Swal.fire({
        type: 'error',
        title: "Password did not match please reenter passwords.",
        timer: 3500
      });
     // alert("Password did not match please reenter passwords.");
      this.repassword = "";
      this.user.password = "";
    }
  }
  backToLogin() {
    this.router.navigate(['']);

  }
}
