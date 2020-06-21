import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComputerLab } from 'src/app/shared/models/computer-lab';
import { ComputerLabService } from '../services/computer-lab.service';
import { AlertifyService } from '../services/alertify.service';
import { Notice } from 'src/app/shared/models/notification';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationListResolver implements Resolve<Notice[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private notificationService: NotificationService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Notice[]> {
        return this.notificationService.getNotifications(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}
