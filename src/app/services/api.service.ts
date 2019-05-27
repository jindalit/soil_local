import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpDocURL:any='http://103.50.212.219:98/common/docupload/company';
   Pathmap = new Map();
   ip="http://103.50.212.219:98/";
  constructor(private http: HttpClient) {
  this.Pathmap.set('login','user/auth/v2');
  this.Pathmap.set('users','users');
  this.Pathmap.set('products','products');
  this.Pathmap.set('products_prefill','page-service/product/prefill');
  this.Pathmap.set('sale_prefill','page-service/sale/prefill');

  this.Pathmap.set('product','product');
  this.Pathmap.set('product_search','product/search');
  this.Pathmap.set('usersearch','user/search');
  this.Pathmap.set('fposearch','company/search');
  this.Pathmap.set('transitsearch','company/search');

  this.Pathmap.set('productsearch','product/search');
  this.Pathmap.set('salesearch','sale/search');
  this.Pathmap.set('address','geo/address');






   }


 URL_gen(path,params){
 path=this.Pathmap.get(path)
 if(params){
  let urlstring=this.ip+path+'?'+params;
  console.log(urlstring);
  return  urlstring;
}else{
  let urlstring=this.ip+path
  console.log(urlstring);
  return  urlstring;
}
}


//common Get
GET_Method(path,params){
  return this.http.get(this.URL_gen(path,params))
}
fetchData(serviceName) {
  return this.http.get(this.ip + serviceName);
}
//common Post
POST_Method(path,data,params){
  console.log(data);
  
  return this.http.post(this.URL_gen(path,params),data)
}
postData(path,data) {
  return this.http.post(this.ip + path,data);
}
putData(path,data) {
  return this.http.put(this.ip + path,data);
}

getip(){

  return this.ip
}


}
