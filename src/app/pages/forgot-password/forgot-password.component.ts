import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userName: any = "";
  validateotp:any;
  otp:any="";
  password:any="";
  repassword:any="";
  token:any="";
  isValidate:boolean = false;
  constructor(private ApiCall: ApiService,private router: Router) { }

  ngOnInit() {
  }
  getOtp() {
    if (this.userName !== "") {
      this.ApiCall.fetchData('user/forgotpassword/generateotp/' + this.userName).subscribe(data => {
        let apidata = (data as any);
        this.otp = "Success";
      });
    }
  }
  validateOtp(){
    if (this.otp !== "") {
      this.ApiCall.fetchData('user/forgotpassword/validateotp/' + this.userName+"/"+this.validateotp).subscribe(data => {
        let apidata = (data as any);
        this.otp = "";
        this.token = apidata.response.data.token;
        this.isValidate = true;
      });
    }
  }
  changePassword(){
    if(this.repassword == this.password){
      let params = {
        "userName": this.userName,"password":this.password,"token":this.token
      }
      this.ApiCall.postData('user/forgotpassword/changepassword',params).subscribe(res=>{
        alert("Password reset successfully - kindly login.");
        this.router.navigate(['']);

      });
    }
    else{
      alert("Password did not match please retry.");
      this.password = "";
      this.repassword = "";
    }
  }
  backToLogin(){
    this.router.navigate(['']);

  }
}
