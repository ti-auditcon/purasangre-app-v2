// ENV
import { purasangreAPIKey, SERVER_URL } from 'src/environments/environment';

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { AuthService } from '../auth/auth.service';

const { Camera } = Plugins;

const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    public user: any = '';
    public userPlan: any = '';
    public errors: any = 'sin errores';
    public link: any = 'sin link';
    public alerts: any = [];
    public image: any = '';
    public imageClean: any = '';
    public avatar: any = '';

    imageURI;
    imageFileName;
    variable = 'variable';
    httpOptions;

    constructor(
        private router: Router,
        private storage: Storage,
        private http: HttpClient,
        private authService: AuthService,
        public toastController: ToastController
    ) {}

    base64Image;
    preImage;

    // public fileTransfer: FileTransferObject = this.transfer.create();

    // Refresh
    doRefresh(event) {
        console.log('Begin async operation');

        this.ionViewDidEnter();
        setTimeout(() => {
            console.log('Async operation has ended');

            event.target.complete();
        }, 2000);
    }

    async presentToast(text = 'Error', duration = 2500) {
        const toast = await this.toastController.create({
            message: text,
            duration,
            position: 'top'
        });

        toast.present();
    }

    async takePicture() {
        const image = await Camera.getPhoto({
            quality: 60,
            width: 720,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Prompt
        });

        // input.append('avatar',image.base64String,'avatar');
        const input = new FormData();

        input.append('avatar', image.base64String);

        this.storage.get('auth-token').then((value) => {

        const Bearer = value;

        this.httpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${Bearer}` // updated
            })
        };

        this.http.post(`${SERVER_URL}/api/profile/avatar`, input, this.httpOptions)
            .subscribe((result: any) => {
                console.log('avataaaar!');

                console.log(result);

                this.presentToast('datos actualizados con éxito');

                this.ionViewDidEnter();
            });
        });

        // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
        // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
        // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
        // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl("data:Image/*;base64,"+image.dataUrl);
        // console.log("Aqui va la var photo: "+this.photo);
    }

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

    ionViewDidEnter() {
        this.storage.get(TOKEN_KEY).then((value) => {
            console.log(value);
            const Bearer = value;

            const httpOptions = {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${Bearer}` // updated
                })
            };

            this.http.get(`${SERVER_URL}/profile`, httpOptions)
                .subscribe((result: any) => {
                    this.user = result.data;

                    const random = (new Date()).toString();
                    this.image = `${this.user.avatar}?cb=${random}`;
                    this.imageClean = this.user.avatar;
                    this.avatar = this.user.avatar;
                    this.storage.set('avatar', this.image);

                    this.http.get(this.user.rels.active_plan.href, httpOptions)
                        .subscribe((response: any) => {
                            console.log('entre plan activo');

                            this.userPlan = response.data;

                            console.log(this.userPlan);
                    });
                });
        });
    }

    logout() {
        this.authService.logout();
    }

    tutorial() {
        // this.firebase.logEvent('view_tutorial', {content_type: 'page_view', item_id: 'view_tutorial'});

        this.router.navigateByUrl('/tutorial');
    }

    goToHistorial() {
        this.router.navigate(['/home/pay-historial']);
    }
}
