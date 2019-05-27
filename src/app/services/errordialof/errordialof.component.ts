import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-errordialof',
  templateUrl: './errordialof.component.html',
  styleUrls: ['./errordialof.component.scss']
})
export class ErrordialofComponent implements OnInit {
  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
  }

}
