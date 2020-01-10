// ENV
import { environment } from '../../../environments/environment';

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastController, AlertController, ModalController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

import { map } from 'rxjs/operators';

import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../../models/users/profile.model';

// const { Camera } = Plugins;

const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    loadedProfile: Profile;

    imageURI;
    imageFileName;
    variable = 'variable';
    httpOptions;

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private http: HttpClient,
        private authService: AuthService,
        private toastController: ToastController,
        private alertCtrl: AlertController,
        private viewCtrl: ModalController
    ) {}

    base64Image;
    preImage;

    ionViewWillEnter() {
        this.profileService.profileId.pipe(
            map(isAuthenticated => {
                if (isAuthenticated) {
                    // console.log('esta autenticado men, no necesita pedir el profile a la api');
                    this.loadedProfile = null;
                    this.profileService.profile.subscribe(profile => {
                        this.loadedProfile = profile;
                    });
                } else {
                    this.profileService.fetchProfile().subscribe();
                }
            })
        ).subscribe();
    }


    // public fileTransfer: FileTransferObject = this.transfer.create();

    // Refresh
    doRefresh(event) {
        console.log('Begin async operation');

        this.ionViewWillEnter();
        setTimeout(() => {
            console.log('Async operation has ended');

            event.target.complete();
        }, 2000);
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
             message, duration: 2500, position: 'top'
        });

        toast.present();
    }

    // async takePicture() {

    //     const image = await Camera.getPhoto({
    //         quality: 60,
    //         width: 720,
    //         allowEditing: false,
    //         resultType: CameraResultType.Base64,
    //         source: CameraSource.Prompt
    //     });

    //     // input.append('avatar',image.base64String,'avatar');
    //     const input = new FormData();

    //     input.append('avatar', image.base64String);

    //     this.storage.get('auth-token').then((value) => {

    //     const Bearer = value;

    //     this.httpOptions = {
    //         headers: new HttpHeaders({
    //             Authorization: `Bearer ${Bearer}` // updated
    //         })
    //     };

    //     this.http.post(`${environment.SERVER_URL}/api/profile/avatar`, input, this.httpOptions)
    //         .subscribe((result: any) => {
    //             console.log('avataaaar!');

    //             console.log(result);

    //             this.presentToast('datos actualizados con éxito');

    //             this.ionViewDidEnter();
    //         });
    //     });

    //     // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    //     // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    //     // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
    //     // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl("data:Image/*;base64,"+image.dataUrl);
    //     // console.log("Aqui va la var photo: "+this.photo);
    // }

    // selectImageFromCamera() {
    //     // this.presentToast('images!!!');
    //     const options: CameraOptions = {
    //         quality: 60,
    //         destinationType: this.camera.DestinationType.FILE_URI,
    //         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //         correctOrientation: true,
    //         targetWidth: 400,
    //         targetHeight: 400,
    //     };

    //     Camera.getPhoto(options).then((imageData) => {
    //         this.crop.crop(imageData, {})
    //             .then(newImage => {
    //                 // this.imageURI = imageData;
    //                 const options1: FileUploadOptions = {
    //                     fileKey: 'image',
    //                     fileName: 'avatar.jpg',
    //                     headers: {}
    //                 };

    //                 this.fileTransfer.upload(newImage, IMAGE_URL + 'api/users/' +
    //                     this.user.identificador + '/image', options1)
    //                         .then((data) => {
    //                             // success
    //                         // console.log("success");
    //                         this.presentToast('Imagen actualizada.');

    //                         this.ionViewDidEnter();
    //                     }, (err) => {
    //                         // error
    //                         this.presentToast('Error al subir imagen');

    //                         console.log('Source: ' + JSON.stringify(err.source) +
    //                             ' Target: ' + JSON.stringify(err.target) + ' Code: ' +
    //                             JSON.stringify(err.code)
    //                         );
    //                     });
    //         }, error => {
    //             this.presentToast('Error al ajustar imagen');

    //             console.error('Error ajustando imagen', error);
    //             // this.alerts.push('Error cropping image');
    //         });
    //     }, (err) => {
    //         console.log('error camera');

    //         console.log(err);
    //         // this.presentToast('Error camara: '+err, 10000);
    //     });
    // }

    onPickImage(imageData: File) {
        console.log('entre a onPickImage...');
        console.log(imageData);

        Plugins.Storage.get({ key: 'authData' }).then((authData) => {
            const parsedData = JSON.parse(authData.value) as {
                token: string
            };
            const httpOptions = {
                headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
            };

            const avatar = new FormData();

            avatar.append('avatar', imageData);

            console.log(avatar);

            this.http.post(`${environment.SERVER_URL}/profile/image`, avatar, httpOptions)
                .subscribe((result: any) => {
                    this.presentToast('datos actualizados con éxito');

                    this.ionViewWillEnter();
                },
                err => {
                    console.log(err);
                    console.log('aqui estoy');

                    this.viewCtrl.dismiss();
                    this.presentToast('No se ha podido actualizar la imagen de perfil');
                }
            );
        });
    }

    // takePicture() {
    //     // this.actionSheetCtrl.create({
    //     //     header: 'Cambiar Foto de Perfil',
    //     //     buttons: [
    //     //         {
    //     //             text: 'Tomar una Foto',
    //     //             handler: () => {
    //     //                 this.openBookingModal('select');
    //     //             }
    //     //         },
    //     //         {
    //     //             text: 'Importar de mi Galería',
    //     //             handler: () => {
    //     //                 this.openBookingModal('random');
    //     //             }
    //     //         },
    //     //         {
    //     //             text: 'Cancelar',
    //     //             role: 'cancel'
    //     //         }
    //     //     ]
    //     // }).then(actionSheetEl => {
    //     //     actionSheetEl.present();
    //     // });
    // }

    async onLogout() {
        const alert = await this.alertCtrl.create({
            header: 'Cerrar Sesión',
            message: 'Desea salir de Purasangre?',
            buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah' + blah);
                }
            }, {
                text: 'Salir',
                handler: () => {
                    this.authService.logout();
                }
            }
            ]
        });

        await alert.present();
    }
    //     this.alertCtrl
    //         .create({
    //             message: 'Salir de PuraSangre?',
    //             buttons:
    //                 ['Cancelar',
    //                 'Salir'
    //             ]
    //         }).then(alertEl => alertEl.present());

    //     // this.authService.logout();
    // }

    tutorial() {
        // this.firebase.logEvent('view_tutorial', {content_type: 'page_view', item_id: 'view_tutorial'});

        this.router.navigateByUrl('/tutorial');
    }

    goToHistorial() {
        this.router.navigate(['/home/pay-historial']);
    }
}
