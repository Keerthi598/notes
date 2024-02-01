import { Component, OnInit } from '@angular/core';
import { ProfileViewService } from './profile-view.service';
import { userEmail } from '../dtos/userEmailInfo.dto';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProcessResponse } from '../dtos/processResponse.dto';
import { HomeService } from '../home/home.service';
import { AlertEnum } from '../alert/alert.enum';


@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  providers: [
    ProfileViewService,
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
  host: {'class' : 'w-full h-full flex'},
})
export class ProfileViewComponent implements OnInit {
  email: string = "";
  newPass: string = "";
  confirmNewPass: string = "";

  passError: boolean = false;

  showResetPass = false;

  constructor(
    private profileService: ProfileViewService,
    private homeService: HomeService,
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
    this.showResetPass = !this.showResetPass;
    this.newPass = "";
    this.confirmNewPass = "";
  }

  async changePass() {
    if (this.newPass.length < 6) {
      this.homeService.setCompAlert({
        type: AlertEnum.fail,
        text: "Password too short"
      });
      return;
    }
    
    if (this.newPass != this.confirmNewPass) {
      this.homeService.setCompAlert({
        type: AlertEnum.fail,
        text: "Passwords don't match"
      });
      return;
    }


    (await this.profileService.changePass(this.newPass)).subscribe(
      (response: ProcessResponse) => {
        if (response.message) {
          // Success
          this.homeService.setCompAlert({
            type: AlertEnum.success,
            text: "Password changed"
          });
          this.showPassChange();
          return;
        }
        // Fail ;_;
        this.homeService.setCompAlert({
          type: AlertEnum.fail,
          text: "Error please try again"
        });
      }
    )
  }
}
