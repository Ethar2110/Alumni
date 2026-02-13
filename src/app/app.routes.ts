import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
      },
      { 
        path: 'alumni', 
        loadComponent: () => import('./features/alumni/alumni-list/alumni-list.component').then(m => m.AlumniListComponent) 
      },
      { 
        path: 'alumni/:id', 
        loadComponent: () => import('./features/alumni/alumni-details/alumni-details.component').then(m => m.AlumniDetailsComponent) 
      },
      { 
        path: 'careers', 
        loadComponent: () => import('./features/careers/careers.component').then(m => m.CareersComponent) 
      },
      { 
        path: 'stories', 
        loadComponent: () => import('./features/stories/stories.component').then(m => m.StoriesComponent) 
      },
      { 
        path: 'about', 
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) 
      },
      { 
        path: 'contact', 
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) 
      },
      {
        path: 'admin',
        canActivate: [authGuard],
        data: { role: 'admin' },
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
      },
      { 
        path: 'register', 
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) 
      }
    ]
  },
  { 
    path: '**', 
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) 
  }
];
