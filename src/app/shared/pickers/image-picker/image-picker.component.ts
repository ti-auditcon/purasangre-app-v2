import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Plugins, Capacitor, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
    @Output() ImagePick = new EventEmitter<string>();

    selectedImage: string;

    constructor() { }

    ngOnInit() {}

    onPickImage() {
        if (!Capacitor.isPluginAvailable('Camera')) {
            return;
        }

        Plugins.Camera.getPhoto({
            quality: 90,
            // Whether to allow the user to crop or make small edits (platform specific)
            allowEditing: true,
            resultType: CameraResultType.Base64,
            saveToGallery: true,
            width: 320,
            height: 320,
            correctOrientation: true,
            source: CameraSource.Prompt
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
