import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  public gridOptions: GridOptions;
  rowData: any = [];
  constructor(private ApiCall: ApiService) {
  this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      floatingFilter: true,
      pagination: true,
      rowHeight: 32,
      enableBrowserTooltips: true,
      headerHeight: 32,
      floatingFiltersHeight: 30,
      paginationPageSize: 10,
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      }

    }
  }

  ngOnInit() {
    this.ApiCall.fetchData('inventory?companyId=' + JSON.parse(localStorage.getItem("user_obj")).user.companyId).subscribe(data => {
      let apidata = (data as any);
      this.rowData = apidata.response.data.inventory;
      this.gridOptions.api.sizeColumnsToFit();
    })
  }
  columnDefs = [
    { headerName: 'Product Name', field: 'product.name' ,tooltipField: "product.name" },
    { headerName: 'HSN Code', field: 'product.hsnCode'  ,tooltipField: "product.hsnCode"},
    { headerName: 'Price', field: 'price'  ,tooltipField: "price"},
    { headerName: 'Package Type', field: 'packageType'  ,tooltipField: "packageType"},
    { headerName: 'Quantity', field: 'quantity'  ,tooltipField: "quantity"},
  ];
}
