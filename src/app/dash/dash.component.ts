import { Component } from '@angular/core';
import { DashFileComponent } from '../comp/dash-file/dash-file.component';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    DashFileComponent
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css',
  host: {'class' : 'w-full'},
})
export class DashComponent {
}
