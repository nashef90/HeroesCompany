import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentLoginResponse$.pipe(
      map(response => {
        if (!response) return true;
        this.notifyService.error("Please Logout first");
        this.router.navigateByUrl('/heroes');
        return false;
      })
    );
  }

}
