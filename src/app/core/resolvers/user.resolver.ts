import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComputerLab } from 'src/app/shared/models/computer-lab';
import { AlertifyService } from '../services/alertify.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}
