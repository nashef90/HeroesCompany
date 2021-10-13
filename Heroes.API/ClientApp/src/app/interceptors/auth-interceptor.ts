import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let isLoginRequest: boolean = request.url == this.authService.loginUrl;
        if (!isLoginRequest && !request.headers.has("Authorization")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.token}`
                }
            });
        }
        return next.handle(request);
    }
}