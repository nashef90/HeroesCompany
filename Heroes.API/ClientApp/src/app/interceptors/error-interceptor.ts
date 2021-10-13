import { NotifyService } from './../services/notify.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private notifyService: NotifyService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let isLoginRequest: boolean = request.url == this.authService.loginUrl;
        return next.handle(request).pipe(
            catchError(err => {
                if (err)
                    this.notifyService.exception(err);
                if (!isLoginRequest && err.status == 401) //401 Unauthorized
                    this.router.navigate(['app/logout']);
                return throwError(err);
            })
        );
    }
}
