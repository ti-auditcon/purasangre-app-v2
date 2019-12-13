import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasesPageModule } from './clases.module';


const routes: Routes = [
    {
        path: 'index',
        loadChildren: './clases.module#ClasesPageModule'
    },
    // {
    //     path: ':wodId/show',
    //     loadChildren: './clases-today/clases-today.module#ClasesTodayPageModule'
    // },
    {
        path: '',
        redirectTo: '/home/tabs/clases/index',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
