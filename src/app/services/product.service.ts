import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApiService} from '../services/api.service';
import{Product} from "../shared/models/product.model"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products:Product[];
product:Product;
  constructor(private http: HttpClient,
    private ApiCall:ApiService) { 
      // this.product.name="ssdfs";
      // this.product.category="sdfsdfs";
      // this.product.price=54;
      // this.products.push(this.product);
    }  


    getProduct(): Observable<any> {
      return this.http.post(this.ApiCall.URL_gen('product_search',''),{status:["Active"]})
      // return this.http.get<User[]>(this.serviceUrl);
    }
  

}
