import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// TODO: ionic-long-press not compatible with Angular 18 - replace with custom directive or Ionic gesture
// import { LongPressModule } from 'ionic-long-press';

import { AddConfirmPage } from './add-confirm.page';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AddConfirmPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
        // TODO: ionic-long-press not compatible - restore when migrated
        // LongPressModule
    ],
    declarations: [AddConfirmPage]
})
export class AddConfirmPageModule {}
