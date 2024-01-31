import { Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { FileViewComponent } from './file-view/file-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        loadComponent: () =>
            import('./login-page/login-page.component').then((m) => m.LoginPageComponent),
    },
    {
        path: 'sign-up',
        loadComponent: () =>
            import('./signup-page/signup-page.component').then((m) => m.SignupPageComponent),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent ),
        children: [
            {
                path: '',
                component: DashComponent,
            },
            {
                path: 'folder/:folderName', 
                component: FolderViewComponent,
            },
            {
                path: 'folder/:folderName/:file',
                component: FileViewComponent,
            },
            {
                path: 'profile',
                component: ProfileViewComponent
            }
        ]
    }
];
