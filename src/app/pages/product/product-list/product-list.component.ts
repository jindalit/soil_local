import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ApiService } from '../../../services/api.service';
import {CurrencyComponent} from "../../../pipes/currency.pipe"
import { from } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public gridOptions: GridOptions;
  rowData: any = [];
  productPrefills:any;
  constructor(private ApiCall: ApiService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      floatingFilter: true,
      pagination: true,
      rowHeight: 32,
      enableBrowserTooltips: true,
      headerHeight: 32,
      floatingFiltersHeight: 30,
      onGridReady:()=>{
        this.gridOptions.api.sizeColumnsToFit();
      },
      paginationPageSize: 10,
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      }

    }
  }

  ngOnInit() {
    this.ApiCall.fetchData('page-service/product/prefill').subscribe(data => {
      let prefillData = (data as any).response.data;
      let productCategory = prefillData.productCategories.list;
      let gstValues = prefillData.gstValues.list;
      this.ApiCall.postData('product/search?pageNo=-', { "status": ["Active"] }).subscribe(data => {
        let apidata = (data as any);
        
        apidata.response.data.docs.map((item,i)=>{
          let category;
          let taxPer;
          productCategory.map((cat) =>{
            if(cat.code == item.productCategory){
              category = cat.label;
            }
          });
          gstValues.map((gst) =>{
            if(gst.code == item.taxPercentage){
              taxPer = gst.label;
            }
          });
          this.rowData.push({
            "sno":i+1,"name":item.name,"hsnCode":item.hsnCode,"price":item.price,"taxType":item.taxType,"category":category,"tax":taxPer
          })
        });
        this.gridOptions.api.setRowData(this.rowData);
      });
    });
  }
  columnDefs = [
    { headerName: 'S.No.', field: 'sno',width:100, filter:false },
    { headerName: 'Name', field: 'name', tooltipField: "name" },
    { headerName: 'HSN', field: 'hsnCode', tooltipField: "hsnCode" },
    { headerName: 'Category', field: 'category', tooltipField: "category" },
    { headerName: 'Price', field: 'price', tooltipField: "price",cellRendererFramework: CurrencyComponent, },
    { headerName: 'Tax Type', field: 'taxType', tooltipField: "taxType" },
    { headerName: 'tax %', field: 'tax', tooltipField: "tax" },
  ];
}
