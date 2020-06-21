import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { Notice } from 'src/app/shared/models/notification';
import { HttpParams, HttpClient } from '@angular/common/http';
import { share, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = environment.apiUrl + 'notifications/';

  constructor(private http: HttpClient) { }

  public getNotifications(page?, itemsPerPage?): Observable<PaginatedResult<Notice[]>> {

    const paginatedResult: PaginatedResult<Notice[]> = new PaginatedResult<Notice[]>();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Notice[]>(this.baseUrl + 'manager/', { observe: 'response', params })
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

  public addNotification(model: any): Observable<void> {
    return this.http.post<void>(this.baseUrl, model);
  }

}
