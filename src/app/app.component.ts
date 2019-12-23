import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
    ) {
        this.initializeApp();
        this.checkConnection();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (Capacitor.isPluginAvailable('SplashScreen')) {
                Plugins.SplashScreen.hide({
                    fadeOutDuration: 500
                });
            }
        });
    }

    async checkConnection() {
        const handler = Plugins.Network.addListener('networkStatusChange', (estado) => {
            if (estado.connected === true) {
                console.log('Conectado');
            }
            if (estado.connected === false) {
                console.log('No coneccted, empezando reconexión');
            }
            // console.log('Network status changed', status);
          });

        console.log(handler);
          // To stop listening:
          // handler.remove();

          // Get the current network status
        const status = await Plugins.Network.getStatus();
    }
}
