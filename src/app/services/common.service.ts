import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

Tolocal_datestring(date){

  return new Date(date).toLocaleDateString()

}

getDate(dateObj) {
  let date = new Date(dateObj);
  let dateVal = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let year = date.getFullYear();
  return dateVal + "/" + month + "/" + year;
}

datafounder(data){
  if(data){
    return data;
  }
  else{
    return '---'
  }
}
datafounder2(data){
  if(data){
    return data;
  }
  else{
    return ''
  }
}


Get_date_difference(data){

  const date1 = new Date(data);
  const date2 = new Date();
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  console.log(diffDays);
return diffDays;
}


}
