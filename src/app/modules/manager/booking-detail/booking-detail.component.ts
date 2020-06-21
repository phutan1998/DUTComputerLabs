import { Component, OnInit, Inject } from '@angular/core';
import { Booking } from 'src/app/shared/models/booking';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  booking: Booking;
}

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  booking: Booking;

  constructor(private dialogRef: MatDialogRef<BookingDetailComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) { }

  ngOnInit() {
    this.booking = this.dialogData.booking;
  }

}
