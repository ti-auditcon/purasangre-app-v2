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
                /**
                 * CLASES ROUTES
                 */
                path: 'clases',
                children: [
                    {
                        path: '',
                        loadChildren: '../clases/clases.module#ClasesPageModule'
                    },
                    {
                        path: ':wodId/show',
                        loadChildren:
                            '../clases/clases-today/clases-today.module#ClasesTodayPageModule'
                    }
                ]
            },
            {
                /**
                 * RESERVATIONS ROUTES
                 */
                path: 'reservations',
                children: [
                    {
                        path: ':wodId/edit-confirm',
                        loadChildren:
                            '../clases/edit-confirm/edit-confirm.module#EditConfirmPageModule'
                    },
                    {
                        path: 'clase-type',
                        loadChildren:
                            '../clases/add-class/add-class.module#AddClassPageModule'
                    },
                    {
                        path: 'clase-type/:claseTypeId/add-day',
                        loadChildren:
                            '../clases/add-day/add-day.module#AddDayPageModule'
                    },
                    {
                        path: 'clase-type/:claseTypeId/add-day/:date',
                        loadChildren:
                            '../clases/add-hour/add-hour.module#AddHourPageModule'
                    },
                    {
                        path: ':claseId/show',
                        loadChildren:
                            '../clases/add-confirm/add-confirm.module#AddConfirmPageModule'
                    }
                ]
            },
            {
                /**
                 * PLANS ROUTES
                 */
                path: 'plans',
                loadChildren: '../plans/plans.module#PlansPageModule'
            },
            {
                /**
                 * PROFILE ROUTES
                 */
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
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class HomePageRoutingModule {}
