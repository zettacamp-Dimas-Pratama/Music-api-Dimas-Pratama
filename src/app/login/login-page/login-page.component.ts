import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from '../login.service';

interface Payload {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  FakeData: any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.GetData();
    this.FormGroup();
  }

  FormGroup() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    // const payload: Payload = this.loginForm.value;
    // this.authService
    //   .loginUser(payload.email, payload.password)
    //   .subscribe((resp) => {
    //     console.log(resp);
    //     if (resp) {
    //       // this.router.navigate(['/home']);
    //     }
    //   });
    this.router.navigate(['song']);
  }
  GetData() {
    this.loginService.GetFakeAPI().subscribe((response: any) => {
      console.log('response', response);
      this.FakeData = response;

      console.log('fake', this.FakeData);
    });
  }
}
