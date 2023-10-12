import { RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicGestureConfig } from './shared/IonicGestureConfig';
import { ConfirmPage } from './pages/reservations/confirm/confirm.page';

@NgModule({
    declarations: [AppComponent, ConfirmPage ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        IonicModule.forRoot(),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
