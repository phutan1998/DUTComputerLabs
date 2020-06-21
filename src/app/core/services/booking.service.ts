import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { Booking } from 'src/app/shared/models/booking';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = environment.apiUrl + 'bookings/';

  constructor(private http: HttpClient) { }

  public getBookings(page?, itemsPerPage?): Observable<PaginatedResult<Booking[]>> {

    const paginatedResult: PaginatedResult<Booking[]> = new PaginatedResult<Booking[]>();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Booking[]>(this.baseUrl + 'manager/', { observe: 'response', params })
      .pipe(
        share(),
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  public deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id).pipe(share());
  }

}
