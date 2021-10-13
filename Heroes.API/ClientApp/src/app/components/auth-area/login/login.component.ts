import { LoginRequestDTO } from './../../../models/login-request-dto';
import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submit() {
    if (!this.form.valid) return;

    let request: LoginRequestDTO = {
      UserName: this.form.value["username"],
      Password: this.form.value["password"],
    };

    let user = await this.authService.login(request).toPromise();
    if (user != null) {
      this.router.navigateByUrl('/heroes');
      this.notifyService.success("you are logged in");
    }

  }
}
