import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';

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
                private http: HttpClient,
                private alertController: AlertController,
                private loadingController: LoadingController,
                private toastController: ToastController
            ) { }

    // async openModalForgot(title, message) {
    //     const confirmRet = await Plugins.Modals.confirm({ title, message });

    //     console.log('Confirm ret', confirmRet);
    // }
    // async openModalForgot(title, message, buttonIcon) {
    //     const modal = await this.modalController.create({
    //         component: ConfirmPage,
    //         componentProps: {
    //             title: title,
    //             message: message,
    //             buttonIcon: buttonIcon
    //         },
    //         cssClass: 'modal-confirm'
    //     });
    //     this.title = modal.componentProps.title;
    //     this.message = modal.componentProps.message;
    //     this.buttonIcon = modal.componentProps.buttonIcon;
    //     return await modal.present();
    // }

    async sendForgot() {
        this.disabled = true;

        // Mostrar loading
        const loading = await this.loadingController.create({
            message: 'Enviando correo de recuperación...',
            spinner: 'crescent'
        });
        
        await loading.present();

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
            .subscribe(async (result: any) => {
                console.log('success reset');

                console.log(result);

                // Cerrar loading
                await loading.dismiss();

                // Mostrar mensaje de éxito
                const toast = await this.toastController.create({
                    message: 'Te hemos enviado las instrucciones para reestablecer tu contraseña. Revisa tu correo.',
                    duration: 4000,
                    position: 'top',
                    color: 'success'
                });
                await toast.present();

                // Esperar un momento antes de redirigir
                setTimeout(() => {
                    this.router.navigateByUrl('/auth');
                }, 1000);
            },
            async (err) => {
                console.log('error reset');

                console.log(err);

                // Cerrar loading
                await loading.dismiss();
                
                // Habilitar botón nuevamente
                this.disabled = false;

                // this.showAlert(err.error[0].error, err.error[0].message);
                this.alertController.create({
                    header: err.error.error,
                    message: err.error.message,
                    buttons: ['Entendido']
                }).then(alert => alert.present());
                // this.openModalForgot(err.error.error, err.error.message);
            }
        );
    }

    // backToLogin() {
    //     this.router.navigateByUrl('/auth/login');
    // }
}
