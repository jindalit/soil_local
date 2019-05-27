import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-change-pasword',
  templateUrl: './change-pasword.component.html',
  styleUrls: ['./change-pasword.component.scss']
})
export class ChangePaswordComponent implements OnInit {
  repassword: any;
  user: any = {};
  constructor(private ApiCall: ApiService,private router: Router) { 
    this.user.userName = JSON.parse(localStorage.getItem("user_obj")).user.userName;
  }
  columnDefs = [
    {headerName: 'Make', field: 'make' },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Price', field: 'price'}
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];
  ngOnInit() {
  }
  changePassword() {
    if (this.user.password && this.user.newpassword) {
      if (this.user.newpassword !== this.repassword) {
        alert("New Password did not match, please re insert the new password.");
        this.repassword = "";
        this.user.newpassword = "";
      }
      else {
        this.ApiCall.putData('user/changepassword', this.user).subscribe(data => {
          localStorage.clear();          
          let apidata = (data as any);
          alert("Password has been changed successfully.");
          this.router.navigate(['']);
        })
      }
    }
  }
}
