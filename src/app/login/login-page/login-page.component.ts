import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from '../login.service';
import { SubSink } from 'subsink';
import { NgxSpinnerService } from 'ngx-spinner';
// import { SubSink } from 'subsink';
// interface Payload {
//   email: string;
//   hashed_password: string;
// }

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private subs = new SubSink();
  hide = true;
  loginForm!: FormGroup;
  FakeData: any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.GetData();
    this.FormGroup();
  }

  FormGroup() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  getErrorMessage() {
    if (this.loginForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.hasError('email') ? 'Not a valid email' : '';
  }
  login() {
    this.spinner.show();
    console.log('data form', this.loginForm.value);
    const payload = this.loginForm.value;

    this.subs.sink = this.authService
      .loginUser(payload.email, payload.password)
      .subscribe((resp) => {
        console.log('responee', resp);
        if (resp) {
          setTimeout(() => {
            this.router.navigate(['song']);
            this.spinner.hide();
          }, 2000);
        }
      });

    // this.router.navigate(['song']);
  }
  GetData() {
    this.loginService.GetFakeAPI().subscribe((response: any) => {
      console.log('response', response);
      this.FakeData = response;

      console.log('fake', this.FakeData);
    });
  }
}
