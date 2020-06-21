import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { Booking } from 'src/app/shared/models/booking';
import { BookingService } from '../services/booking.service';

@Injectable()
export class BookingListResolver implements Resolve<Booking[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private bookingService: BookingService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Booking[]> {
        return this.bookingService.getBookings(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}
