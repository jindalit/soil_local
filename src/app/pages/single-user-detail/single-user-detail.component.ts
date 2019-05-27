import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-single-user-detail',
  templateUrl: './single-user-detail.component.html',
  styleUrls: ['./single-user-detail.component.scss']
})
export class SingleUserDetailComponent implements OnInit {
 Selected_user_obj:any;
 lat;
 lng;
  constructor() {
    this.Selected_user_obj =JSON.parse(localStorage.getItem('selected_user'))
    this.lat =  this.Selected_user_obj.location.coordinates[0];
    this.lng = this.Selected_user_obj.location.coordinates[1]; 
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
 
  }

  openedWindow : number = 0; // alternative: array of numbers

openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
}

isInfoWindowOpen(id) {
    return this.openedWindow == id; // alternative: check if id is in array
}
}
