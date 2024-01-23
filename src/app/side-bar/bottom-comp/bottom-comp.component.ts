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
  settingActive : boolean = false;
  profileActive : boolean = false;

  @Output() stateChange : EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(
    private router: Router
    ) {}

  toggleSetting() {
    this.stateChange.emit(true);
    this.settingActive = true;
  }

  toggleProfile() {
    this.stateChange.emit(true);
    this.profileActive = true;
  }

  toggleOff() {
    this.profileActive = false;
    this.settingActive = false;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/sign-in']);
  }

}
