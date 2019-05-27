import { Purchase } from './../../../shared/models/common.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puchaselist',
  templateUrl: './puchaselist.component.html',
  styleUrls: ['./puchaselist.component.scss']
})
export class PuchaselistComponent implements OnInit {
tt:Purchase
  constructor() { }

  ngOnInit() {
  }

}
