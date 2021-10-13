import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faPowerOff, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  logoutIcon = faPowerOff;
  registerIcon = faUserPlus;
  loginIcon = faUser;
  userLoggedIn: boolean = false;
  userFullName: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentLoginResponse$.subscribe(x => {
      this.userLoggedIn = x !== null;
      this.userFullName = x !== null ? x.fullName : null;
    });
  }

}
