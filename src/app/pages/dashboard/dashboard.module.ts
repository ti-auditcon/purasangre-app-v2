import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

// TODO: chart.js - uncomment when upgrading to v4
// import { ChartsModule } from 'ng2-charts';

import { DashboardPage } from './dashboard.page';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { register } from 'swiper/element/bundle';
register();

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPageRoutingModule,
        // TODO: chart.js - uncomment when upgrading to v4
        // ChartsModule,
        SharedModule
    ],
    declarations: [DashboardPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule {}
