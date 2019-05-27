import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../../services/api.service';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {LocaldataService} from '../../../services/localdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
Login_res:any;

loginform: FormGroup;
submitted = false;

  constructor(private ApiCall:ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    public local_data:LocaldataService) {
}

  ngOnInit() {
       this.loginform = this.formBuilder.group({
       userName: ['FPOGENUSER113319', Validators.required],
       password: ['#nature32', Validators.required]
  });
  };

  onSubmit() {
      console.log(this.loginform.value);
      this.submitted = true;

    // stop here if form is invalid
    if (this.loginform.invalid) {
        return;
    }

    if (this.loginform.valid) {

      this.ApiCall.POST_Method('login',this.loginform.value,'').subscribe(res=>{
        this.Login_res =res;
        console.log(this.Login_res);
      localStorage.setItem('token',this.Login_res.response.data.token);
      localStorage.setItem('user_obj',JSON.stringify(this.Login_res.response.data))
      this.local_data.set_login_user_data(this.Login_res.response.data);
      this.router.navigate(['/main/home']);

      });
  }



}
regiester(){
  this.router.navigate(['/register']);
}
forgotPassword(){
  this.router.navigate(['/forgot-password']);
}
}
