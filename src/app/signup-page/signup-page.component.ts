import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Inject } from '@nestjs/common';


@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
  host: {'class' : 'w-full'}
})
export class SignupPageComponent {
  userName: string = "";
  password: string = "";
  http = inject(HttpClient);

  constructor(
    private router: Router
    ) {}

  navToLogin() {
    this.router.navigate(['/sign-in']);
    return;
  }
}
