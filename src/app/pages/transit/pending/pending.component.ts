
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Transit } from '../../../shared/models/common.model';
import { Component, OnInit,NgZone, ViewChild,Inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PageEvent } from '@angular/material';
import { Router } from "@angular/router";

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  lat: number;
  lng: number;
  origin:{lat:number,lng:number};
  destination:{lat:number,lng:number}
};


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  User_lists_res: any;
    users:Transit[]

    dataSource = new MatTableDataSource<Transit[]>();
    displayedColumns = ['createdOn','invoiceNo','customerName','address','saleProducts','transport.name','action'];

    constructor(private Api_call: ApiService,
      private userService: UserService,
      private router: Router,
      public dialog: MatDialog

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
    openInvoice(saleId){
      this.router.navigate(['/main/invoice'], { queryParams: { saleId: saleId } });
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    openDialog(): void {


      const dialogRef = this.dialog.open(PendingtransitMap, {
        width: '70%',
        data: {lat:  10.9266413, lng:79.8170458,
        origin:{lat: 24.799448, lng: 120.979021},
        destination:{lat: 24.799524, lng: 120.975017}},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
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
 
  
  datafounder(data){
    if(data){
      return data;
    }
    else{
      return '---'
    }
  }
  
   }


   
   @Component({
    selector: 'track',
    templateUrl: './track.html',
    styleUrls: ['./pending.component.scss']

  })
  export class PendingtransitMap {

 


    Selected_user_obj:any={};
    lat;
    lng;
    dir=undefined;
    origin;
    destination;
    constructor(
      public dialogRef: MatDialogRef<PendingtransitMap>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {

        this.lat =data.lat;
        this.lng = data.lng;
        this.origin= data.origin;
        this.destination=data.destination;
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }


  }