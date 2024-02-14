import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpPageService } from './signup-page.service';
import { UserAuth } from '../dtos/userAuth.dto';
import { AuthError } from '../classes/authError.class';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  providers: [SignUpPageService, AuthError],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
  host: {'class' : 'w-full'}
})
export class SignupPageComponent {
  userName: string = "";
  password: string = "";
  http = inject(HttpClient);
  loadLogin: boolean = false;
  errorMessage: string = "";
  signUpError: boolean = false;


  constructor(
    private signUpService: SignUpPageService,
    private router: Router,
    private authError: AuthError
    ) {}

  navToLogin() {
    this.router.navigate(['/sign-in']);
    return;
  }

  async createUser() {
    this.loadLogin = true;
    (await this.signUpService.signUp(this.userName, this.password)).subscribe(
      (response: UserAuth) => {
        if (response.message != "success"){
          // Needs to have some logic here
          this.loadLogin = false;
          this.signUpFail(response.message);
          return;
        }
        this.signUpError = false;
        sessionStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']);
        this.loadLogin = false;
      },
      (error) => {
        // Handle errors if any
        this.signUpFail("Error");
      }
    )
  }

  async signUpFail(errorMessage: string) {
    this.signUpError = true;
    this.errorMessage = this.authError.getMessage(errorMessage);
  }
}
