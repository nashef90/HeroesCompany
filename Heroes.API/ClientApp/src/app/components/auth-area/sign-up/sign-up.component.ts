import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequestDTO } from 'src/app/models/register-request-dto';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private readonly patternStr: string = '^.*(?=.{8,})(?=.*\\d)(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form.addControl('username', new FormControl('', [Validators.required]));
    this.form.addControl('firstName', new FormControl('', [Validators.required]));
    this.form.addControl('lastName', new FormControl('', [Validators.required]));
    this.form.addControl('password', new FormControl('', [Validators.required, Validators.pattern(this.patternStr)]));
    this.form.addControl('confirmPassword', new FormControl('', [Validators.required, this.validateAreEqual.bind(this)]));
  }

  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.form.get("password").value ? null : {
      NotEqual: true
    };
  }
  async submit() {
    if (!this.form.valid) return;

    let request: RegisterRequestDTO = {
      UserName: this.form.value["username"],
      FName: this.form.value["firstName"],
      LName: this.form.value["lastName"],
      Password: this.form.value["password"],
      ConfirmPassword: this.form.value["confirmPassword"],
    };

    let response = await this.authService.register(request).toPromise();
    if (response != null) {
      this.router.navigateByUrl('/heroes');
      this.notifyService.success("you are logged in");
    }

  }
}
