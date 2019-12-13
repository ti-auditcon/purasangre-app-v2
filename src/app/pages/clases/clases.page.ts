// env
import { environment } from '../../../environments/environment';

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Plugins } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';

import { AuthService } from '../auth/auth.service';

const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-clases',
    templateUrl: './clases.page.html',
    styleUrls: ['./clases.page.scss'],
})
export class ClasesPage {
    public todayWods: any = [];
    public clases: any = [];
    // public today_clase: any = [];
    public alerts: any = [];
    public pendient: any = [];
    public confirmed: any = [];

    buttonFixIOS = '';
    buttonFixAndroid = '';
    confirmation = '';

    constructor(
        public plt: Platform,
        // private storage: Storage,
        private router: Router,
        private http: HttpClient,
        public toastController: ToastController,
        private authService: AuthService,
    ) {
        if (this.plt.is('ios')) {
            // Si es iOS
            this.buttonFixIOS = 'button-fix-ios';

            this.buttonFixAndroid = 'display-none';
        } else {
            // Si es Android
            this.buttonFixIOS = 'display-none';

            this.buttonFixAndroid = 'button-fix';
        }

        // var buttonConf = document.getElementById('confirmacion');
    }

    // Refresh
    doRefresh(event) {
        console.log('Begin async operation');

        this.ionViewDidEnter();

        setTimeout(() => {
            console.log('Async operation has ended');

            event.target.complete();
        }, 2000);
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Hora Reservada',
            duration: 2500,
            position: 'top'
        });

        toast.present();
    }

    ionViewDidEnter() {
        // console.log('estoy cargandome........');
        Plugins.Storage.get({key: 'authData'}).then((authData) => {

            const parsedData = JSON.parse(authData.value) as {
                token: string
            };

            const httpOptions = {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${parsedData.token}` // updated
                })
            };

            this.http.get(`${environment.SERVER_URL}/clases-coming?sort_by_asc=date`, httpOptions)
                .subscribe((result: any) => {
                    // console.log('entre a las clases coming');

                    this.clases = result.data;

                    // console.log(this.clases);

                    this.pendient =  this.clases.filter(
                        clase => clase.rels.auth_reservation.status === 'Pendiente'
                    );

                    // console.log('pendiente: ' + this.pendient);

                    this.confirmed =  this.clases.filter(
                        clase => clase.rels.auth_reservation.status === 'Confirmada'
                    );
                },
                err => {
                    console.log('error clases');

                    // this.authService.refreshToken();
                });

            // console.log(this.today_clase);

            this.http.get(`${environment.SERVER_URL}/users-alerts`, httpOptions)
            .subscribe((result: any) => {
                this.alerts = result.data;

                // console.log(this.alerts);
            });

            this.http.get(`${environment.SERVER_URL}/todaywods`, httpOptions)
                .subscribe((result: any) => {
                    this.todayWods = result.data;

                    // console.log('today');

                    // console.log(result);
            });
        });
    }

    goToEditConfirm(id: string = '0') {
        this.router.navigate( ['/home/edit-confirm/' + id + ')'] );
    }

    goToAddDay() {
        this.router.navigate( ['/home/clase-type'] );
    }

    goTo(wod) {
        const reservation = wod.rels.auth.todayReservation;
        console.log('entre goto');
        console.log(reservation);

        if (wod.rels.auth.reservationHas) {
            console.log('tengo clase');
            if ((reservation.status === 1) || (reservation.status === 2)) {
                this.router.navigate( ['/home/edit-confirm/' + reservation.id] );
            }

            if ((reservation.status === 3)) {
                this.router.navigate(['/home/clase/' + reservation.id]);
            }

            if (reservation.status === 4) {
                this.router.navigate( ['/home/wods/' + wod.identificador] );
            }

        } else {
            console.log('no tengo clase');

            this.router.navigate( ['/home/wods/' + wod.identificador] );
        }
    }

    goClase(id: string) {
        this.router.navigate(['/home/clase/' + id]);
    }

    goToWOD(wodId: number) {
        console.log(wodId);
        this.router.navigateByUrl(`home/clases/${wodId}/show`);
    }

    enter() {
        console.log('entreeeeeeeee!!!!!!!!!!!!!!!');
    }

}

