// env
import { environment } from '../../../../environments/environment';

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Platform, ModalController, IonInfiniteScroll, LoadingController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { ConfirmPage } from '../confirm/confirm.page';
import { ImageModalPage } from '../../../shared/image-modal/image-modal.page';

@Component({
    selector: 'app-edit-confirm',
    templateUrl: './edit-confirm.page.html',
    styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage {
    @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

    public clase: any = [];
    public reservations: any = [];
    public page = 1;
    public totalPages = 1;
    public hasMorePages = true;

    buttonFixIOS: string;
    buttonFixAndroid: string;
    value: string;
    title: string;
    message: string;
    buttonIcon: string;
    httpOptions: any;
    reservationUrl: string;
    haymodal = false;
    actualModal: any;
    varIsPressed = false;

    constructor( public plt: Platform,
                 private modalController: ModalController,
                 private router: Router,
                 private http: HttpClient,
                 public activatedRoute: ActivatedRoute,
                 private loadingController: LoadingController,
                 private storage: Storage
               ) {}

    ionViewDidEnter() {
        this.page = 1;
        if (this.plt.is('ios')) {
            // Si es iOS
            this.buttonFixIOS = 'button-fix-ios';

            this.buttonFixAndroid = 'display-none';
        } else {
            // Si es Android
            this.buttonFixIOS = 'display-none';

            this.buttonFixAndroid = 'button-fix';
        }

        console.log('hola entre a la clase para editar');

        this.retrieveClase();
    }

    async retrieveClase() {
        const loading = await this.loadingController.create({
            spinner: 'crescent'
        });

        loading.present().then(() => {
            const id = this.activatedRoute.snapshot.paramMap.get('wodId');

            console.log(this.activatedRoute);
            console.log(this.activatedRoute.snapshot.paramMap);
            console.log('sii');

            this.storage.get('authData').then((authData) => {
                const parsedData = JSON.parse(authData) as {
                    token: string
                };
                this.httpOptions = {
                    headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
                };

                this.http.get(`${environment.SERVER_URL}/clases/${id}`, this.httpOptions)
                    .subscribe((result: any) => {
                        console.log(' http entre a la clase para editar');
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
                this.reservations = result.data;

                console.log(this.reservations);

                // Guardar información de paginación si está disponible
                if (result.meta && result.meta.pagination) {
                    this.totalPages = result.meta.pagination.total_pages || 1;
                    console.log(`Total de páginas: ${this.totalPages}`);
                    
                    // Si hay más páginas, cargarlas todas automáticamente
                    if (this.totalPages > 1) {
                        this.loadAllPages();
                    }
                }
            }
        );
    }

    // Cargar todas las páginas restantes
    loadAllPages() {
        const requests = [];
        
        // Crear requests para todas las páginas restantes
        for (let i = 2; i <= this.totalPages; i++) {
            requests.push(
                this.http.get(`${this.reservationUrl}?page=${i}`, this.httpOptions)
            );
        }

        // Cargar todas las páginas en paralelo
        requests.forEach((request, index) => {
            request.subscribe((result: any) => {
                if (result.data && result.data.length > 0) {
                    this.reservations = this.reservations.concat(result.data);
                    console.log(`Página ${index + 2} cargada`);
                }
            });
        });
    }

    // cargando usuarios por infinit loader
    loadMoreUsers(infiniteScrollEvent) {
        // Ya no es necesario cargar más porque todas las páginas se cargan al inicio
        console.log('Todas las páginas ya fueron cargadas');
        infiniteScrollEvent.target.complete();
        infiniteScrollEvent.target.disabled = true;
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: ConfirmPage,
            componentProps: {
                custom_id: 1,
                title: 'Confirmar esta clase',
                message: `${this.clase.dateHuman} de ${this.clase.start} a ${this.clase.end}hrs. No podras cancelar esta accion`,
                buttonIcon: '/assets/icon/info.svg',
                claseId: this.clase.clase_id,
                buttonActionConfirm: true,
            },
            cssClass: 'modal-confirm'
        });
        // this.title = modal.componentProps.title;
        // this.message = modal.componentProps.message;
        // this.buttonIcon = modal.componentProps.buttonIcon;
        return await modal.present();
    }

    async openModalCeder() {
        const modal = await this.modalController.create({
            component: ConfirmPage,
            componentProps: {
                custom_id: 0,
                title: 'Ceder tu Cupo',
                message: 'Si cedes tu cupo podrás reservar en otro horario',
                buttonIcon: '/assets/icon/info.svg',
                claseId: this.clase.clase_id,
                buttonActionRemove: true,
            },
            cssClass: 'modal-confirm'
        });
        // this.title = modal.componentProps.title;
        // this.message = modal.componentProps.message;
        // this.buttonIcon = modal.componentProps.buttonIcon;
        return await modal.present();
    }

    goToEditHour(date = '2015-01-01') {
        this.router.navigate( [`/home/edit-hour/${date}`] );
    }

    /**
     * Close Modal for Image Avatar view, and return color to icon image avatar
     *
     * img, firstName, lastName
     */
    finishLongPress() {
        if (this.haymodal) {
            this.actualModal.dismiss().then(() => {
                this.actualModal = null;
                this.haymodal = false;
                this.varIsPressed = false;
            });
        }
    }

    clicked() {
        this.varIsPressed = true;
        setTimeout(() => {
            this.varIsPressed = false;
        }, 500);
        // setInterval(() => { console.log('hola'); }, 4000);
    }

    /**
     * Open Modal for Image Avatar view on click
     */
    async openImageModal(img: string, firstName: string, lastName: string) {
        if (!this.haymodal) {
            const modal = await this.modalController.create({
                component: ImageModalPage,
                componentProps: { img, firstName, lastName },
                cssClass: 'image-modal'
            });
            this.actualModal = modal;
            this.haymodal = true;
            await modal.present();
            
            // Auto-close modal when dismissed
            modal.onDidDismiss().then(() => {
                this.actualModal = null;
                this.haymodal = false;
            });
        }
    }
}
