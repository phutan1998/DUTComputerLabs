import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Faculty } from 'src/app/shared/models/faculty';
import { UserForInsert } from 'src/app/shared/models/userForInsert';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  public getUsers(roleName: string, name?: string, page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    params = params.append('roleName', roleName);

    if (name) {
      params = params.append('name', name);
    }

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<User[]>(this.baseUrl, { observe: 'response', params })
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

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + id).pipe(share());
  }

  public getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.baseUrl + 'faculties/').pipe(share());
  }

  public updateProfile(id: number, user: UserForInsert): Observable<User> {
    return this.http.put<User>(this.baseUrl + id + '/info/', user).pipe(share());
  }

  public updatePassword(id: number, model: any): Observable<void> {
    return this.http.post<void>(this.baseUrl + id + '/password/', model).pipe(share());
  }

  public addUser(user: UserForInsert): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(share());
  }

  public updateUser(id: number, user: UserForInsert): Observable<User> {
    return this.http.put<User>(this.baseUrl + id, user).pipe(share());
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id).pipe(share());
  }

}
