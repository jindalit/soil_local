
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Transit } from '../../../shared/models/common.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PageEvent } from '@angular/material';
import { Router } from "@angular/router";

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})
export class RejectedComponent implements OnInit {

  User_lists_res: any;
  users:Transit[]

  dataSource = new MatTableDataSource<Transit[]>();
  displayedColumns = ['createdOn','invoiceNo','customerName','address','saleProducts','transport.name','spocName','spocNumber','action'];

  constructor(private Api_call: ApiService,
    private userService: UserService,
    private router: Router
  ) {
let data1 ={
"companyIDs":["FPOGEN000001"]
};
this.Api_call.POST_Method('salesearch',data1,'')
.subscribe(res=>{
  console.log(res);
  
})
    
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userService.getSalelist().subscribe(
      res=>{
console.log(res);
let apidata = (res as any);

this.dataSource.data = apidata.response.data.docs;
      }
    )
  }

  goto_user_info(userdata) {
    console.log(userdata);
    localStorage.setItem('selected_user', JSON.stringify(userdata));
    this.router.navigate(['main/userinfo']);

  };

  utc_to_date(date) {

    return new Date(date).toLocaleDateString();
  }

//   connect():User[]{
//        this.userService.getUser().subscribe(
//          res=>{
// this.users = res;

//          }
//        )
//        return this.users    
//      }

// }

// export class UserDataSource extends DataSource<any> {
//   constructor(private userService: UserService) {
//     super();
//   }
//   connect(): Observable<User[]> {
//     return this.userService.getUser();
//   }
//   disconnect() { }

datafounder(data){
  if(data){
    return data;
  }
  else{
    return '---'
  }
}

 }