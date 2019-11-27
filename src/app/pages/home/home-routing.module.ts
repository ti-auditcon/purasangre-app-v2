import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
            },
            {
                path: 'clases',
                loadChildren: '../clases/clases.module#ClasesPageModule'
            },
            {
                path: 'plans',
                loadChildren: '../plans/plans.module#PlansPageModule'
            },
            {
                path: 'profile',
                loadChildren: '../profile/profile.module#ProfilePageModule'
            },
        ]
    },
    {
        path: '',
        redirectTo: '/home/tabs/dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
