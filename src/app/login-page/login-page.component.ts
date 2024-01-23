import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginPageService } from './login-page.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Inject } from '@nestjs/common';
import { UserAuth } from '../dtos/userAuth.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [LoginPageService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  host: {'class' : 'w-full'}
})
export class LoginPageComponent {
  userName = "";
  password = "";
  http = inject(HttpClient);

  constructor(
    @Inject() private loginService: LoginPageService, 
    private router: Router
    ) {}
  
  async login() {
    (await this.loginService.auth(this.userName, this.password)).subscribe(
      (response: UserAuth) => {
        // Handle the boolean response here
        if (response.message == false){
          this.loginFail();
          return;
        }
        sessionStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle errors if any
        console.error('Error');
      }
    );
  }

  loginFail() {
    console.log("Login Fail");
  }

}
