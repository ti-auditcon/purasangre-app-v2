import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage {
    img: string;
    firstName: string;
    lastName: string;

    constructor(public modalController: ModalController) { }

    get user(): string {
        return `${this.firstName || ''} ${this.lastName || ''}`;
    }

    dismiss() {
        this.modalController.dismiss();
    }
}
