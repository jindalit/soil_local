import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { GridOptions } from 'ag-grid-community';
@Component({
  selector: 'app-fpo-list',
  templateUrl: './fpo-list.component.html',
  styleUrls: ['./fpo-list.component.scss']
})
export class FpoListComponent implements OnInit {
  rowData: any = [];
  isEdit: boolean = false;
  params: any = {};
  selectedUser: any;
  private gridOptions: GridOptions;
  defaultColDef;
  constructor(private ApiCall: ApiService,private commonService:CommonService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      floatingFilter: true,
      rowHeight: 32,
      headerHeight: 32,
      floatingFiltersHeight: 30,
      paginationPageSize: 10,
      pagination: true,
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      onRowDoubleClicked: function (e) {

      }
    }
  }
  columnDefs = [
    { headerName: 'Company Name', field: 'companyName' },
    { headerName: 'FPO ID', field: 'uniqueId' },
    {
      headerName: 'DOI', field: 'doi', cellRenderer: (data) => {
        return this.commonService.getDate(data.value);
      }
    },
    { headerName: 'GSTIN', field: 'gstin' },

    {
      headerName: 'Created On', field: 'createdOn', cellRenderer: (data) => {
        return this.commonService.getDate(data.value);
      }
    }

  ];
  ngOnInit() {
    this.ApiCall.postData('company/search?pageNo=no', { "nob": ["FPO"] }).subscribe(data => {
      let apidata = (data as any);
      this.rowData = apidata.response.data.docs;
      this.gridOptions.api.sizeColumnsToFit();
    });
  }
  
}
