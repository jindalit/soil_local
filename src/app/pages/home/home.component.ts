import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {  CommonDashboardService} from '../../services/common-dashboard.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  DashboardData:any={};
  constructor(
    private ApiCall: ApiService,
    private commonDashboardService :CommonDashboardService
  ) { }
  
//{{ip}}{{port}}/page-service/dashboard/prefill?type=COMMON
  ngOnInit() {
    this.DashboardData=this.commonDashboardService.CommonDashboardData;
    this.callCommonDashboard();
  }

  callCommonDashboard() {
    this.ApiCall.fetchData('page-service/dashboard/prefill?type=COMMON&companyId='+JSON.parse(localStorage.getItem("user_obj")).user.companyId ).subscribe(data => {
      let apidata = (data as any);
      this.DashboardData=apidata.response.data;
      this.commonDashboardService.CommonDashboardData=this.DashboardData;
    });
  }

}
