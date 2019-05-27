import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { ApiService} from '../../../services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup_form: FormGroup;

  constructor(
    private ApiCall:ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.signup_form = this.formBuilder.group({
      userName: ['FAR00004', Validators.required],
      password: ['ssindia123', Validators.required]
  });
  }
  onSubmit(){
    
  }
}
