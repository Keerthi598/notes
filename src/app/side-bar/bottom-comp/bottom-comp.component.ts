import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-comp',
  standalone: true,
  imports: [],
  templateUrl: './bottom-comp.component.html',
  styleUrl: './bottom-comp.component.css'
})
export class BottomCompComponent {
  profileActive : boolean = false;

  @Output() stateChange : EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(
    private router: Router
    ) {}

  toggleProfile() {
    this.stateChange.emit(true);
    this.profileActive = true;
    this.router.navigate(['home/profile']);
  }

  toggleOff() {
    this.profileActive = false;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/sign-in']);
  }

}
