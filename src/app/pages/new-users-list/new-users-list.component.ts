import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-new-users-list',
  templateUrl: './new-users-list.component.html',
  styleUrls: ['./new-users-list.component.scss']
})
export class NewUsersListComponent implements OnInit {
  rowData: any = [];
  isEdit: boolean = false;
  roles:any=[];
  designation:any=[];
  params:any ={};
  selectedUser: any;
  private gridOptions: GridOptions;
defaultColDef;
  constructor(private ApiCall: ApiService) {
    let thisInst = this;
    
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      floatingFilter: true,
      rowHeight:32,
      headerHeight:32,
      floatingFiltersHeight:30,
      paginationPageSize:10,
      pagination:true,
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      onRowDoubleClicked: function (e) {
        thisInst.isEdit = true;
        thisInst.selectedUser = e.data.userName;
        thisInst.ApiCall.fetchData('page-service/user/prefill?userName=' + thisInst.selectedUser).subscribe(data => {
          let apidata = (data as any);
          let user = apidata.response.data.user;
          let departments = apidata.response.data.departments ? apidata.response.data.departments.list : [];
          thisInst.params.name = user.name;
          thisInst.params.userName = user.userName;
          thisInst.params.email = user.email;
          thisInst.params.mobile = user.mobile;
          thisInst.params.department = user.department;
          for(let i=0;i<departments.length;i++){
            if(departments[i].code == thisInst.params.department ){
              thisInst.roles = departments[i].roles;
              thisInst.designation = departments[i].Designations;
            }
          }
        });
      }
    }
  }

  ngOnInit() {
   this.ApiCall.postData('user/search?fields=userName,name,companyId,mobile,status,department&pageNo=no', { "status": ["Init"] }).subscribe(data => {
      let apidata = (data as any);
      this.rowData = apidata.response.data.users;
      this.gridOptions.api.sizeColumnsToFit();
    }); 
    //this.rowData = [{"id":"5c8a870f1a76ee63e5918a61","userName":"FAR113319","mobile":"9953325457","name":"Manomohan\tSingh","location":{},"status":"Active","password":"","createdOn":"2019-03-14T22:23:35.833+05:30","createdBy":"System","department":"FARMER","address":{"state":"STATE00076","district":"DIST00183","block":"BLOCK00284","gramPanchayat":"GP00116","village":"VILAGE00099","doorNo":"Kelad","landmark":"Kelad","location":{},"street":"Kelad","CompanyId":""},"dob":"0001-01-01T00:00:00Z","fatherName":"Khageswar Singh","gender":"Male"},{"id":"5c8a870f1a76ee63e5918a61","userName":"FAR113319","mobile":"9953325457","name":"Manomohan\tSingh","location":{},"status":"Active","password":"","createdOn":"2019-03-14T22:23:35.833+05:30","createdBy":"System","department":"FARMER","address":{"state":"STATE00076","district":"DIST00183","block":"BLOCK00284","gramPanchayat":"GP00116","village":"VILAGE00099","doorNo":"Kelad","landmark":"Kelad","location":{},"street":"Kelad","CompanyId":""},"dob":"0001-01-01T00:00:00Z","fatherName":"Khageswar Singh","gender":"Male"},{"id":"5c8a870f1a76ee63e5918a61","userName":"FAR113319","mobile":"9953325457","name":"Manomohan\tSingh","location":{},"status":"Active","password":"","createdOn":"2019-03-14T22:23:35.833+05:30","createdBy":"System","department":"FARMER","address":{"state":"STATE00076","district":"DIST00183","block":"BLOCK00284","gramPanchayat":"GP00116","village":"VILAGE00099","doorNo":"Kelad","landmark":"Kelad","location":{},"street":"Kelad","CompanyId":""},"dob":"0001-01-01T00:00:00Z","fatherName":"Khageswar Singh","gender":"Male"}]

  }
  columnDefs = [
    { headerName: 'User Name', field: 'userName' },
    { headerName: 'Mobile No', field: 'mobile' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Department', field: 'department' },
    


  ];
  updateUser() {   
if(this.params.name && this.params.email && this.params.mobile && this.params.department && this.params.role && this.params.designation){
    this.ApiCall.putData('user/activatenewuser', this.params).subscribe(data => {
      let apidata = (data as any);
      alert("User activated successfully.");
      this.ApiCall.postData('user/search?fields=userName,name,companyId,mobile,status,department&pageNo=no', { "status": ["Init"] }).subscribe(data => {
        let apidata = (data as any);
        this.rowData = apidata.response.data.users;
        this.gridOptions.api.sizeColumnsToFit();
      });
      this.isEdit = false;
    });
  }
}
}
