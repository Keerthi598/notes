import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResetPassService } from './reset-pass.service';
import { ErrorCodeResp } from '../dtos/errorCodeResp.dto';
import { AuthError } from '../classes/authError.class';


@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  providers: [
    ResetPassService,
    AuthError,
  ],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css',
  host: {'class' : 'w-full'}
})
export class ResetPassComponent {
  email: string = "";
  requestBeingMade: boolean = false;

  requestSuccess: boolean = false;
  
  requestErrorCode: string = "";
  requestFail: boolean = true;

  constructor(    
    private router: Router,
    private resetService: ResetPassService,
    private authError: AuthError
    ) {}

  async navToSignIn() {
    this.router.navigate(['/sign-in'])
  }

  async reqRestPass() {
    this.requestSuccess = false;
    this.requestErrorCode = "";
    this.requestFail = false;
    this.requestBeingMade = true;

    if (this.email == ""){
      // empty email
      this.requestBeingMade = false;
      this.requestFail = true;
      this.requestErrorCode = this.authError.getMessage("auth/invalid-email");
      return;
    }

    (await this.resetService.sendResetMail(this.email)).subscribe(
      (resp: ErrorCodeResp) => {
        if (resp.message == "Success") {
          this.requestBeingMade = false;
          this.requestSuccess = true;
          return;
        }
        this.requestBeingMade = false;
        this.requestFail = true;
        this.requestErrorCode = this.authError.getMessage(resp.message);
        return;
      }
    );
  }

}
