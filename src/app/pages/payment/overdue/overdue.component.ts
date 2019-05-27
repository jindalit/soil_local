import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { User } from '../../../shared/models/common.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PageEvent } from '@angular/material';
import { Router } from "@angular/router";
import { CommonService } from '../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-overdue',
  templateUrl: './overdue.component.html',
  styleUrls: ['./overdue.component.scss']
})
export class OverdueComponent implements OnInit {
  Payment_info_form: FormGroup
  User_lists_res: any;
  users: User[];
  saleId: any;
  isPayment: boolean = false;
  paymentData: any = {};
  pendingAmount: any;
  dataSource = new MatTableDataSource<User[]>();
  displayedColumns = ['createdOn', 'invoiceNo', 'customerName', 'totalAmount', 'received', 'pending', 'duedays', 'action'];
  CASH = false;
  CHEQUE = false;
  NB = false;
  pay_mod;
  customerName: any;
  customerType: any;
  constructor(private Api_call: ApiService,
    private userService: UserService,
    private router: Router,
    public cmn_ser: CommonService, public fb: FormBuilder
  ) {
    let data1 = {
      "companyIDs": ["FPOGEN000001"]
    };
    this.Api_call.POST_Method('salesearch', data1, '')
      .subscribe(res => {
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
      res => {
        console.log(res);
        let apidata = (res as any);

        this.dataSource.data = apidata.response.data.docs;
      }
    )
    this.Payment_info_form = this.fb.group({
      Sale_pay_mod: [''],
      Sale_pay_cod_depositer_name: [''],
      Sale_pay_cod_amount: [],
      Sale_pay_cheq_depositer_name: [''],
      Sale_pay_cheq_amount: [],
      Sale_pay_cheq_no: [''],
      Sale_pay_cheq_date: [''],
      Sale_pay_net_ulb_refid: [''],
      Sale_pay_net_ulb_accno: [''],
      Sale_pay_net_ulb_ifsc: [''],
      Sale_pay_net_ulb_branch: [''],
      Sale_pay_net_cust_refid: [''],
      Sale_pay_net_amount: [],
      Sale_pay_net_cust_accno: [''],
      Sale_pay_net_cust_ifsc: [''],
      Sale_pay_net_cust_branch: [''],
      Sale_pay_name: [''],
      Sale_pay_amount: [''],
    });

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

  datafounder(data) {
    if (data) {
      return data;
    }
    else {
      return '---'
    }
  }

  datafounder2(data) {
    if (data) {
      return data;
    }
    else {
      return 0
    }
  }

  payment_calc(payment) {



    //console.log(payment);
    let payment1 = 0;
    for (var value of payment) {
      // console.log(value.amount);
      payment1 = payment1 + value.amount;

    }
    //console.log(payment1);

    return payment1;


  }
  doPayment(data) {
    this.customerName = data.customerName;
    this.customerType = data.customerType;
    this.isPayment = true;
    this.paymentData = {};
    this.pendingAmount = data.totalAmount - this.payment_calc(data.payments);
    this.saleId = data.uniqueId;
    //console.log(invoiceNo)
  }
  slect_payment_mode() {

    console.log(this.pay_mod);
    if (this.pay_mod == 'CASH') {
      this.CASH = true;
      this.CHEQUE = false;
      this.NB = false;
    } else if (this.pay_mod == 'CHEQUE') {
      this.CASH = false;
      this.CHEQUE = true;
      this.NB = false;
    }
    else if (this.pay_mod == 'NB') {
      this.CASH = false;
      this.CHEQUE = false;
      this.NB = true;
    }
  }
  makePayment() {
    if (this.pendingAmount < this.paymentData.amount) {
      Swal.fire({
        type: 'error',
        title: 'Payment amount can not be more than pending amount.',
        timer: 3500
      });
    }
    else {
      this.paymentData.type = this.pay_mod;
      this.paymentData.date = new Date();
      this.Api_call.putData("sale/updatepayment?saleId=" + this.saleId, this.paymentData).subscribe(res => {
        Swal.fire({
          type: 'success',
          title: 'Successfully updated payment.',
          timer: 3500
        });
        this.userService.getSalelist().subscribe(
          res => {
            console.log(res);
            let apidata = (res as any);

            this.dataSource.data = apidata.response.data.docs;
          }
        )
        this.isPayment = false;
      })
    }
  }
}