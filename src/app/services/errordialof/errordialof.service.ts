import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrordialofComponent  } from './errordialof.component';
@Injectable({
  providedIn: 'root'
})
export class ErrordialofService {
data:any ={};
  constructor(public dialog: MatDialog) { }
  openDialog(data): void {
      const dialogRef = this.dialog.open(ErrordialofComponent, {
          width: '300px',
          data: data
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          let animal;
          animal = result;
      });
  }}
