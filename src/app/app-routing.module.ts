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
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canLoad: [ AuthGuard ]
    },
    {
        path: 'confirm',
        loadChildren: () => import('./pages/reservations/confirm/confirm.module').then(m => m.ConfirmPageModule)
    },
    {
        path: 'forgot',
        loadChildren: () => import('./pages/auth/forgot/forgot.module').then(m => m.ForgotPageModule)
    },


  // {
  //   path: 'edit-confirm',
  //   loadChildren: () => import('./pages/clases/edit-confirm/edit-confirm.module').then( m => m.EditConfirmPageModule)
  // },


    // {
    //     path: 'tutorial',
    //     loadChildren: './public/tutorial/tutorial.module#TutorialPageModule'
    // },
    // {
    //     path: 'hoydashboard',
    //     loadChildren: './auth/dashboard/hoydashboard/hoydashboard.module#HoyDashboardPageModule'
    // },
    // {
    //     path: 'login',
    //     loadChildren: './public/login/login.module#LoginPageModule'
    // },
    // {
    //     path: 'forgot',
    //     loadChildren: './public/forgot/forgot.module#ForgotPageModule'
    // },
    // {
    //     path: 'tutorial',
    //     loadChildren: './public/tutorial/tutorial.module#TutorialPageModule'
    // },
    // {
    //     path: 'image-modal',
    //     loadChildren: './auth/shared/image-modal/image-modal.module#ImageModalPageModule'
    // },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
