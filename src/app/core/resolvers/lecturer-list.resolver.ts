import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../services/user.service';

@Injectable()
export class LecturerListResolver implements Resolve<User[]> {
    roleName = 'LECTURER';
    name = '';
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.roleName, this.name, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}
