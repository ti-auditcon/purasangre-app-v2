import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClasesPage } from './clases.page';
import { ClasesPageRoutingModule } from './clases-routing.module';

// const routes: Routes = [
//     {
//         path: '',
//         component: ClasesPage
//     }
// ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClasesPageRoutingModule
    ],
    declarations: [ ClasesPage ]
})
export class ClasesPageModule {}
