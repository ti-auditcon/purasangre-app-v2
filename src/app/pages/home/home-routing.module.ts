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
                loadChildren: () =>  import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
            },
            {
                /**
                 * CLASES ROUTES
                 */
                path: 'clases',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../clases/clases.module').then( m => m.ClasesPageModule)
                    },
                    {
                        path: 'wods/:wodId/show',
                        loadChildren: () =>  import('../clases/clases-today/clases-today.module').then( m => m.ClasesTodayPageModule)
                    },
                    /**
                     * RESERVATIONS ROUTES
                     */
                    {
                        path: ':claseId/show',
                        loadChildren: () =>  import('../reservations/add-confirm/add-confirm.module'   ).then( m => m.AddConfirmPageModule)
                    },
                    {
                        path: ':wodId/edit-confirm',
                        loadChildren: () =>  import('../reservations/edit-confirm/edit-confirm.module').then( m => m.EditConfirmPageModule)

                    },
                    {
                        path: 'clase-type',
                        loadChildren: () => import('../reservations/select-clase-type/select-clase-type.module').then( m => m.SelectClaseTypePageModule)

                    },
                    {
                        path: 'clase-type/:claseTypeId/select-day',
                        loadChildren: () => import('../reservations/select-day/select-day.module').then( m => m.SelectDayPageModule)

                    },
                    {
                        path: 'clase-type/:claseTypeId/select-day/:date',
                        loadChildren: () => import('../reservations/select-hour/select-hour.module').then( m => m.SelectHourPageModule)
                    },
                    
                ]
            },
            {
                /**
                 * PLANS ROUTES
                 */
                path: 'plans',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../plans/plans.module').then( m => m.PlansPageModule)
                    },
                    {
                        path: 'historial',
                        loadChildren: () => import('../plans/historial/historial.module').then( m => m.HistorialPageModule)
                    },
                    {
                        path: ':planId/details',
                        loadChildren: () => import('../plans/plan-detail/plan-detail.module').then( m => m.PlanDetailPageModule)
                    },
                    {
                        path: ':planId/payments',
                        loadChildren: () => import('../plans/plan-payment/plan-payment.module').then( m => m.PlanPaymentPageModule)
                    },
                    {
                        path: ':planId/flow',
                        loadChildren: () => import('../plans/flow/flow.module').then( m => m.FlowPageModule)
                    },
                ]
            },
            {
                /**
                 * PROFILE ROUTES
                 */
                path: 'profile',
                loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
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
