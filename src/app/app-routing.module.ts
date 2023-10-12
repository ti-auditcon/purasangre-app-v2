import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        canLoad: [ AuthGuard ]
    },
    {
        path: 'confirm',
        loadChildren: () => import('./pages/reservations/confirm/confirm.module').then( m => m.ConfirmPageModule),    
      },
    {
        path: 'forgot',
        loadChildren: () => import('./pages/auth/forgot/forgot.module').then( m => m.ForgotPageModule)
    },



];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
