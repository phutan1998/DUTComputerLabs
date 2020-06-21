import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

    constructor(private alertify: AlertifyService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        this.alertify.error(err.error.message);
                    } catch (e) {
                        this.alertify.error('An error occurred');
                    }
                }
                this.router.navigate(['/home']);
                return of(err);
            }));

      }

}
