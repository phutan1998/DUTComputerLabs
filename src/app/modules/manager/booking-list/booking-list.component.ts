import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/shared/models/booking';
import { BookingService } from 'src/app/core/services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { NotificationAddComponent } from '../notification-add/notification-add.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  public dataSource: MatTableDataSource<Booking>;
  public displayedColumns: string[] = ['id', 'lab', 'bookingDate', 'startAt', 'endAt', 'status', 'actions'];

  private bookings: Booking[];

  public pagination: Pagination;

  constructor(private bookingService: BookingService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.bookings = data.bookings.result;
      this.dataSource = new MatTableDataSource(this.bookings);
      this.pagination = data.bookings.pagination;
    });
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadBookings();
  }

  public loadBookings(): void {
    this.bookingService.getBookings(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((result: PaginatedResult<Booking[]>) => {
          this.bookings = result.result;
          this.pagination = result.pagination;
          this.dataSource = new MatTableDataSource(this.bookings);
        });
  }

  public onDetail(id: number): void {
    this.dialog.open(BookingDetailComponent, {
      data: {booking: this.bookings.find(b => b.id === id)}
    });
  }

  public onNotice(id: number): void {
    this.dialog.open(NotificationAddComponent, {
      data: {bookingId: id}
    });
  }

  public onDelete(id: number): void {
    this.alertify.confirm('Bạn có chắc chắn xóa lịch đặt phòng này?', () => {
      this.bookingService.deleteBooking(id).subscribe(() => {
        this.alertify.success('Xóa lịch đặt phòng thành công');
      });
    });
  }

}
