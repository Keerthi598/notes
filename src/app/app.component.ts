import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashComponent } from './dash/dash.component';
import { FolderViewComponent } from './folder-view/folder-view.component';

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
    FolderViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notes';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/';

  posts: any;
  constructor(private http:HttpClient) {}

  getPosts() {
    this.posts = this.http.get(this.ROOT_URL + '/posts');
    console.log(this.posts);
  }
}
