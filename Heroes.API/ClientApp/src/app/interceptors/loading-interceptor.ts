import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor,  HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(
      private spinnerOverlayService: SpinnerOverlayService
    ) { }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinnerOverlayService.show();
      return next.handle(request)
        .pipe(catchError(err => {
          this.spinnerOverlayService.hide();
          return throwError(err);
        }))
        .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.spinnerOverlayService.hide();
          }
          return evt;
        }));
    }
  }
  