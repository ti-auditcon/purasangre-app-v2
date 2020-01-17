import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';

import { ModalController, AlertController } from '@ionic/angular';

import {
    Plugins, PushNotificationToken,
    PushNotification, PushNotificationActionPerformed
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    animations: [
        trigger('animation', [
            state('invisible', style({ height: '0px', 'padding-top': '0', 'padding-bottom': '0'})),

            state('visible', style({ height: '*', 'padding-top': '*', 'padding-bottom': '*'})),

            transition('invisible => visible', animate('0.2s')),

            transition('visible => invisible', animate('0.3s 1s'))
        ])
    ],
})
export class HomePage implements OnInit {
    statusConnection = true;
    public animationState = 'invisible'; // Or Enum with visible/invisible.

    constructor(public modalController: ModalController,
                private alertCtrl: AlertController) { }

    ngOnInit() {
        this.checkConnection();
        // console.log('i´m here at the home page');

        console.log('Initializing HomePage');

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
            alert('Push registration success, token: ' + token.value);

            console.log('Push registration success, token: ' + token.value);
        });

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
        });

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
            console.log('pushNotificationReceived: ' + JSON.stringify(notification));
        });

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                const message = JSON.stringify(notification.notification.data.title);
                this.alertCtrl.create({
                    message, buttons: ['Entendido']
                })
                .then(alertEl => alertEl.present());
                console.log('Notification');
                console.log(notification.notification);
                console.log('Notification stringified');
                console.log(JSON.stringify(notification.notification));
                console.log('input value');
            }
        );
    }

    /**
     * Keep listen for status connection change,
     * and show an animation alert if it happens
     *
     * @return void
     */
    async checkConnection() {
        const handler = Plugins.Network.addListener('networkStatusChange', (estado) => {
            if (estado.connected === true) {
                this.statusConnection = true;
                this.animationState = 'invisible';
                console.log(this.animationState);
            }
            if (estado.connected === false) {
                this.statusConnection = false;
                if (this.animationState === 'invisible') {
                    this.animationState = 'visible';
                  }
            }
        });
    }
}
