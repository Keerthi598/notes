import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginPageService } from './login-page.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserAuth } from '../dtos/userAuth.dto';
import { Router } from '@angular/router';
import { AuthError } from '../classes/authError.class';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [LoginPageService, AuthError],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  host: {'class' : 'w-full'}
})
export class LoginPageComponent {
  userName: string = "";
  password: string = "";
  http = inject(HttpClient);
  incorrectPass: boolean = false;
  loadLogin: boolean = false;
  errorMessage: string = "";

  constructor(
    private loginService: LoginPageService, 
    private router: Router,
    private authError: AuthError
    ) {}
  
  async login() {
    this.loadLogin = true;
    (await this.loginService.auth(this.userName, this.password)).subscribe(
      (response: UserAuth) => {
        // Handle the boolean response here
        if (response.message != "success"){
          this.loginFail(response.message);
          this.loadLogin = false;
          return;
        }
        this.incorrectPass = false;
        sessionStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']);
        this.loadLogin = false;
      },
      (error) => {
        // Handle errors if any
        this.loginFail("Error")
        this.loadLogin = false;
      }
    );
  }

  loginFail(error: string) {
    this.incorrectPass = true;
    this.errorMessage = this.authError.getMessage(error);
  }

  async navToSignUp() {
    this.router.navigate(['/sign-up']);
    return;
  }

  async navToForgotPass() {
    this.router.navigate(['/forgot-pass']);
    return;
  }

}
