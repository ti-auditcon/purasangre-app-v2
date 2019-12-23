import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {
    registerCredentials = { email: '' };
    title;
    message;
    buttonIcon;
    disabled = false;

    constructor(private authService: AuthService,
                private modalController: ModalController,
                private router: Router,
                private http: HttpClient
            ) { }

    async openModalForgot(title, message, buttonIcon) {
        // const modal = await this.modalController.create({
        //     component: ConfirmPage,
        //     componentProps: {
        //         title: title,
        //         message: message,
        //         buttonIcon: buttonIcon
        //     },
        //     cssClass: 'modal-confirm'
        // });
        // this.title = modal.componentProps.title;
        // this.message = modal.componentProps.message;
        // this.buttonIcon = modal.componentProps.buttonIcon;
        // return await modal.present();
    }

    sendForgot() {
        this.disabled = true;

        const data = JSON.stringify({
            email: this.registerCredentials.email,
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json', // updated
            })
        };
        // return new Promise((resolve, reject) => {
        this.http.post(`${environment.SERVER_URL}/password/reset`, data, httpOptions)
            .subscribe((result: any) => {
                console.log('success reset');

                console.log(result);

                this.openModalForgot(
                    'Revisa tu Correo',
                    'Te hemos enviado las instrucciones para reestablecer tu contraseña',
                    '/assets/icon/check.svg'
                );

                this.router.navigateByUrl('/auth/login');
            },
            (err) => {
                console.log('error reset');

                console.log(err);

                this.openModalForgot(
                    'Error',
                    'El correo no existe o no es valido',
                    '/assets/icon/close.svg'
                );
            }
        );
    }

    // backToLogin() {
    //     this.router.navigateByUrl('/auth/login');
    // }
}
