import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private platform: Platform,
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        console.log('se inicializa la appcomponent');

        Plugins.PushNotifications.register();

        Plugins.PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotification) => {
                console.log(
                    notification.title, notification.subtitle,
                    notification.body, notification.id,
                    notification.badge, notification.notification,
                    notification.data, notification.click_action,
                    notification.link
                );
            }
        );

        Plugins.PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                console.log(
                    notification.actionId, notification.inputValue, notification.notification
                );
            }
        );
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
    //         });
    // }
}
