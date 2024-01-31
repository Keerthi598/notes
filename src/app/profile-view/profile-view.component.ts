import { Component, OnInit } from '@angular/core';
import { ProfileViewService } from './profile-view.service';
import { userEmail } from '../dtos/userEmailInfo.dto';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
  host: {'class' : 'w-full h-full flex'},
})
export class ProfileViewComponent implements OnInit {
  email: string = "";
  newPass: string = "";

  showResetPass = false;

  constructor(
    private profileService: ProfileViewService
  ) {}

  ngOnInit(): void {
    this.getEmail();
  }

  async getEmail() {
    (await this.profileService.getEmail()).subscribe(
      (email: userEmail) => {
        this.email = email.email;
      }
    )
  }

  showPassChange() {
    this.showResetPass = true;
  }
}
