import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-certificate',
  templateUrl: './test-certificate.component.html',
  styleUrls: ['./test-certificate.component.scss']
})
export class TestCertificateComponent implements OnInit {
  companyId: any = JSON.parse(localStorage.getItem("user_obj")).user.companyId;
  constructor() { }

  ngOnInit() {
  }

}
