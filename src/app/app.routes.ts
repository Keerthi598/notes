import { Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { FolderViewComponent } from './folder-view/folder-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        loadComponent: () =>
            import('./login-page/login-page.component').then((m) => m.LoginPageComponent),
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
            }
        ]
    }
];
