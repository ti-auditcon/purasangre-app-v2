// env
import { environment } from '../../../../environments/environment';

import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Platform, ModalController } from '@ionic/angular';

import { Preferences } from '@capacitor/preferences';
import { ConfirmPage } from '../confirm/confirm.page';


@Component({
    selector: 'app-add-confirm',
    templateUrl: './add-confirm.page.html',
    styleUrls: ['./add-confirm.page.scss'],
})
export class AddConfirmPage  {
    @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

    public clase: any = [];
    public users: any = [];
    public reservations: any = [];
    public page = 1;
    isModalOpen = false;

    buttonFixIOS: string;
    buttonFixAndroid: string;
    title;
    message;
    buttonIcon;
    buttonAction;
    httpOptions;
    reservationUrl;
    haymodal = false;
    actualModal: any;
    varIsPressed = false;
    selectedImg: any;

    constructor(public plt: Platform,
                private modalController: ModalController,
                private http: HttpClient,
                public activatedRoute: ActivatedRoute,
                public loadingController: LoadingController
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
    }

    async openModal() {
        const id = this.activatedRoute.snapshot.paramMap.get('claseId');
        const modal = await this.modalController.create({
            component: ConfirmPage,
            componentProps: {
                title: 'Reservar esta hora',
                message: this.clase.dateHuman + ' de ' + this.clase.start +
                         ' a ' + this.clase.end + 'hrs',
                buttonIcon: '/assets/icon/info.svg',
                claseId: id,
                buttonActionAdd: true,
            },
            cssClass: 'modal-confirm',
        });
        // this.title = modal.componentProps.title;
        // this.message = modal.componentProps.message;
        // this.buttonIcon = modal.componentProps.buttonIcon;
        return await modal.present();
    }

    ionViewDidEnter() {


        this.retrieveClase();
    }

    async retrieveClase() {
        const loading = await this.loadingController.create({
            spinner: 'crescent'
        });

        loading.present().then(() => {
            const id = this.activatedRoute.snapshot.paramMap.get('claseId');

            Preferences.get({ key: 'authData' }).then((authData) => {
                const parsedData = JSON.parse(authData.value) as {
                    token: string
                };

                this.httpOptions = {
                    headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
                };

                this.http.get(`${environment.SERVER_URL}/clases/${id}`, this.httpOptions)
                    .subscribe((result: any) => {
                        this.clase = result.data;

                        console.log(this.clase);

                        this.reservationUrl = this.clase.rels.reservations.href;

                        this.loadUsers();

                        loading.dismiss();
                    }
                );
            });


        });
    }

    // primeros 10 usuarios
    loadUsers() {
        console.log('cargando usuarios');
        this.http.get(`${this.reservationUrl}?page=${this.page}`, this.httpOptions)
            .subscribe((result: any) => {
                console.log(result);
                this.reservations = result.data;

                console.log(this.reservations);

                this.page++;
            }
        );
    }

    // Cargando usuarios por infinit loader
    loadMoreUsers(infiniteScrollEvent) {
        this.http.get(`${this.reservationUrl}?page=${this.page}`, this.httpOptions)
            .subscribe((result: any) => {
                console.log('mas users agregados');

                this.reservations = this.reservations.concat(result.data);

                console.log(this.reservations);

                this.page++;

                infiniteScrollEvent.target.complete();
            }
        );
        // this.days = this.days.concat(response.data.data);
        // event.target.complete();
    }

    // image popup
    imageModal(img) {
        console.log('click image');
        this.isModalOpen = true;
        this.selectedImg = img;
        // this.modalController.create({
        //     component: ImageModalPage,
        //     componentProps: { img }
        // }).then(modal => {
        //     modal.present();
        // });
    }

    imageModalDismiss() {
        console.log('modal cerrado');
        this.isModalOpen = false;
    }


}
