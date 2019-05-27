import { Salelist,Transit } from './../shared/models/common.model';
import { User } from './../shared/models/user.model';

import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import {Observable} from 'rxjs';

import { ApiService} from '../services/api.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  
  constructor(private http: HttpClient,
    private ApiCall:ApiService) { }
  
  getUser(): Observable<any> {
    return this.http.get(this.ApiCall.URL_gen('users',''));
    // return this.http.get<User[]>(this.serviceUrl);
  }

  getSalelist(): Observable<Salelist> {
    let data1={
      "companyIDs":["FPOGEN000001"]

    }
    return this.http.post<Salelist>(this.ApiCall.URL_gen('salesearch',''),data1);
    // return this.http.get<User[]>(this.serviceUrl);
  }


  getDelevtransitlist(): Observable<Transit> {
    let data1={
      "companyIDs":["FPOGEN000001"]

    }
    return this.http.post<Transit>(this.ApiCall.URL_gen('salesearch',''),data1);
    // return this.http.get<User[]>(this.serviceUrl);
  }



  getUser1() {
    return this.http.get(this.ApiCall.URL_gen('users',''));
    // return this.http.get<User[]>(this.serviceUrl);
  }
}

