import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Plugins, Capacitor, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
    @Input() AvatarImage: string;
    @Output() ImagePick = new EventEmitter<string>();

    selectedImage: string;
    methodPhoto: string;

    constructor(private actionSheetController: ActionSheetController) { }

    ngOnInit() {}

    async onPickImage() {
        if (!Capacitor.isPluginAvailable('Camera')) {
            return;
        }

        const action = await this.actionSheetController.create({
            header: 'Cambiar Foto de Perfil',
            buttons: [{
                text: 'Tomar Foto',
                icon: 'camera',
                handler: () => {
                    this.method(CameraSource.Camera);
                    console.log('Tomar una foto clicked');
                }
            }, {
                text: 'Elegir de Mis Fotos',
                icon: 'image',
                handler: () => {
                    this.method(CameraSource.Photos);
                    console.log('Elegir de Mis Fotos clicked');
                }
            }, {
                text: 'Cancelar',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    this.method(null);
                    console.log('Cancel clicked');
                }
            }]
        });

        action.present();
    }

    method(value) {
        if (value) {
            Plugins.Camera.getPhoto({
                quality: 50,
                // Whether to allow the user to crop or make small edits (platform specific)
                resultType: CameraResultType.Base64,
                saveToGallery: true,
                allowEditing: true,
                width: 320,
                // height: 320,
                correctOrientation: true,
                source: value
            }).then(image => {
                this.selectedImage = image.base64String;
                this.ImagePick.emit(image.base64String);
            })
            .catch(error => {
                console.log(error);
                return false;
            });
        }
    }
}
