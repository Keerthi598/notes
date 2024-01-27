import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DashComponent } from '../dash/dash.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SideBarComponent,
    DashComponent,
    AlertComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {'class' : 'w-full'}
})
export class HomeComponent {

}
