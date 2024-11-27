import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'adm-property-register',
    loadComponent: () => import('./pages/adm-property-register/adm-property-register.page').then( m => m.AdmPropertyRegisterPage)
  },
];
