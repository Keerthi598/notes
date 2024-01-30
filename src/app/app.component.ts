import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashComponent } from './dash/dash.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { FileViewComponent } from './file-view/file-view.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faCheck, faStar, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faFloppyDisk, faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,
    
    SideBarComponent,
    HomeComponent,
    LoginPageComponent,
    DashComponent,
    FolderViewComponent,
    FileViewComponent,
    SignupPageComponent,
    AlertComponent,

    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notes';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/';

  posts: any;
  constructor(private http:HttpClient,
    library: FaIconLibrary) {
      library.addIcons(faPlus);
      library.addIcons(faChevronDown, faTrash);
      library.addIcons(faFloppyDisk, faTriangleExclamation);
      library.addIcons(faCheck, faXmark, faStar, faEllipsisV);
    }

}
