import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { ComputerLab } from 'src/app/shared/models/computer-lab';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComputerLabService {

  private baseUrl = environment.apiUrl + 'computerlabs/';

  constructor(private http: HttpClient) { }

  public getComputerLabs(page?, itemsPerPage?): Observable<PaginatedResult<ComputerLab[]>> {

    const paginatedResult: PaginatedResult<ComputerLab[]> = new PaginatedResult<ComputerLab[]>();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<ComputerLab[]>(this.baseUrl, { observe: 'response', params })
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

  public getComputerLab(id: number): Observable<ComputerLab> {
    return this.http.get<ComputerLab>(this.baseUrl + id).pipe(share());
  }

  public addComputerLab(lab: ComputerLab): Observable<ComputerLab> {
    return this.http.post<ComputerLab>(this.baseUrl, lab).pipe(share());
  }

  public updateComputerLab(id: number, lab: ComputerLab): Observable<ComputerLab> {
    return this.http.put<ComputerLab>(this.baseUrl + id, lab).pipe(share());
  }

  public deleteComputerLab(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id).pipe(share());
  }

}
