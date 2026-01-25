import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditConfirmPage } from './edit-confirm.page';
import { SharedModule } from '../../../shared/shared.module';
// TODO: ionic-long-press not compatible with Angular 18 - replace with custom directive or Ionic gesture
// import { LongPressModule } from 'ionic-long-press';

const routes: Routes = [
    {
        path: '',
        component: EditConfirmPage
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
    declarations: [ EditConfirmPage ]
})
export class EditConfirmPageModule {}
