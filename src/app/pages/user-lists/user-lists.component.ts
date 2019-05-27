import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ApiService } from '../../services/api.service';

import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {
  public gridOptions: GridOptions;
  rowData: any = [];
  gridApi;
  pageObj: any = {};
  f: any;
  params:any={};
  constructor(private ApiCall: ApiService,private commonService:CommonService) {
    this.pageObj.limit = 10;
  this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      pagination: true,
      floatingFilter: false,
      rowHeight: 32,
      headerHeight: 32,
      floatingFiltersHeight: 30,
      overlayLoadingTemplate : '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
      
      defaultColDef: {
        resizable: true,
        sortable: false,
        filter: false
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
      },
      onFilterModified:(params) =>{
       let filters =  params.api.getFilterModel();
       for(var key in filters){
          this.params[key] = [filters[key].filter]
       }
       this.fetchUser("pageNo=1&size="+this.pageObj.limit);
      },

    }
  }

  ngOnInit() {
    this.fetchUser("pageNo=1&size="+this.pageObj.limit);
  }
  fetchUser(query){
    this.ApiCall.postData('user/search?'+query,this.params).subscribe(data => {
      let apidata = (data as any);
      this.rowData = apidata.response.data.users;
      this.pageObj = apidata.response.data.pagination;
    })
    
  }
  columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Department', field: 'department' },
    { headerName: 'User Name', field: 'userName' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Mobile', field: 'mobile' },
    { headerName: 'createdOn', field: 'createdOn', cellRenderer: (data) => {
      return this.commonService.getDate(data.value);
    } }



  ];
  
  updatePageSize() {
    this.gridApi.showLoadingOverlay();
    this.fetchUser("pageNo=1&size="+this.pageObj.limit);
  }
  changePage(dir) {
    this.gridApi.showLoadingOverlay();
    if (dir == "prev") {
      this.fetchUser("pageNo="+this.pageObj.prevPage+"&size="+this.pageObj.limit);
    }
    else {
      this.fetchUser("pageNo="+this.pageObj.nextPage+"&size="+this.pageObj.limit);
    }
  }
}
