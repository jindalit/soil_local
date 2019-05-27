import { ThemeService } from './../core/services/theme.service';
import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {ApiService} from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  id: number | string;
  createdAt: number;
  name: string;
  firstName:string;
  address:{}
}
@Injectable({
  providedIn: 'root'
})
export class LocaldataService {


Local_Purchase_prefil_data:any={};
Local_Sale_prefil_data:any={};

Login_user_data:any={};

  constructor(public api:ApiService,private http: HttpClient) {

    
   }

 

set_Purchase_prefill_data(data){
this.Local_Purchase_prefil_data=data;
console.log(this.Local_Purchase_prefil_data);

}

get_Purchase_prefill_data(){
if(this.Local_Purchase_prefil_data){

  return this.Local_Purchase_prefil_data
 
}

}


set_Sale_prefill_data(data){
  this.Local_Sale_prefil_data=data;
  console.log(this.Local_Sale_prefil_data);
  
  }
  
  get_set_Sale_prefill_data(){
  if(this.Local_Sale_prefil_data){
  
    return this.Local_Sale_prefil_data
   
  }
}

set_login_user_data(data){
this.Login_user_data=data;
}


get_login_user_data(){
  return this.Login_user_data;
  }


Get_Farmer_list(data1){

  return this.api.POST_Method('usersearch',data1,'pageNo=no&fields=userName,address,name')
  

}


Get_Fpo_list(data){

  return this.api.POST_Method('fposearch',data,'pageNo=no&fields=companyName,uniqueId,address,name')
}

Get_Product_list(data){
  return this.api.POST_Method('productsearch',data,'pageNo=-')
}


Get_Transit_list(data){
  return this.api.POST_Method('transitsearch',data,'pageNo=no')
}

}
