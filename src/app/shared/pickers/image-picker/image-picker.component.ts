import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

import { ActionSheetController, Platform } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
    @ViewChild('filePicker', { static : false }) filePickeRef: ElementRef<HTMLInputElement>;
    @Input() AvatarImage: string;
    @Output() imagePick = new EventEmitter<string | File>();

    selectedImage: string;
    userPicker = false;

    constructor(private actionSheetController: ActionSheetController,
                private platform: Platform
    ) { }

    ngOnInit() {
        console.log(`la plataforma es mobile : ${this.platform.is('mobile')}`);
        console.log(`la plataforma es hybrid: ${this.platform.is('hybrid')}`);
        console.log(`la plataforma es desktop: ${this.platform.is('desktop')}`);
        if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
            this.platform.is('desktop')) {
            this.userPicker = true;
        }
    }

    async onPickImage() {
        // En web o si el usuario prefiere el picker nativo
        if (!this.platform.is('hybrid') || this.userPicker) {
            this.filePickeRef.nativeElement.click();
            return;
        }

        const action = await this.actionSheetController.create({
            header: 'Cambiar Foto de Perfil',
            buttons: [{
                text: 'Tomar Foto',
                icon: 'camera',
                handler: () => {
                    this.openCamera(CameraSource.Camera);
                    console.log('Tomar una foto clicked');
                }
            }, {
                text: 'Elegir de Mis Fotos',
                icon: 'image',
                handler: () => {
                    this.openCamera(CameraSource.Photos);
                    console.log('Elegir de Mis Fotos clicked');
                }
            }, {
                text: 'Cancelar',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    this.openCamera(null);
                    console.log('Cancel clicked');
                }
            }]
        });

        action.present();
    }

    async openCamera(value: CameraSource | null) {
        console.log('llegue al metodo escogido');
        if (value) {
            try {
                const image = await Camera.getPhoto({
                    quality: 50,
                    resultType: CameraResultType.Base64,
                    allowEditing: true,
                    width: 320,
                    correctOrientation: true,
                    source: value,
                    // En Capacitor 8.x, saveToGallery solo se aplica para CameraSource.Camera
                    ...(value === CameraSource.Camera && { saveToGallery: true })
                });

                this.selectedImage = image.base64String;
                console.log('ahora emito la foto');
                this.imagePick.emit(image.base64String);
            } catch (error) {
                console.log('Error al obtener la imagen:', error);
                return false;
            }
        }
    }

    onFileChosen(event: Event) {
        const pickedFile = (event.target as HTMLInputElement).files[0];
        if (!pickedFile) {
          return;
        }
        const fr = new FileReader();
        fr.onload = () => {
          const dataUrl = fr.result.toString();
          this.selectedImage = dataUrl;
          this.imagePick.emit(pickedFile);
        };
        fr.readAsDataURL(pickedFile);
    }
}
