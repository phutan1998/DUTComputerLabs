import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComputerLab } from 'src/app/shared/models/computer-lab';
import { ComputerLabService } from '../services/computer-lab.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class ComputerLabResolver implements Resolve<ComputerLab> {

    constructor(private labService: ComputerLabService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ComputerLab> {
        return this.labService.getComputerLab(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}
