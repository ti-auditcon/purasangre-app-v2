import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(private platform: Platform) {
        this.initializeApp();
    }

    /**
     * [initializeApp description]
     *
     * @return void
     */
    async initializeApp() {
        await this.platform.ready();
        
        // Ocultar splash screen con animación
        await SplashScreen.hide({ fadeOutDuration: 500 });
        
        // Configurar status bar (opcional)
        await StatusBar.setStyle({ style: Style.Light });
    }

    // private notificationSetup() {
    //     this.fcm.getToken();
    //     this.fcm.onNotifications().subscribe(
    //         (msg) => {
    //         if (this.platform.is('ios')) {
    //             this.bodyText = JSON.stringify(msg.aps.alert.body);
    //             this.presentToast(this.bodyText.replace(/\"/g, ''));
    //             // this.mensajito = msg;
    //         } else {
    //             this.presentToast(msg.body);
    //         }
    //     });
    // }
}
