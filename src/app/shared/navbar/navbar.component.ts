import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AnimationBuilder } from '@ionic/angular';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
    @Input() urltoBack: string;

    @Input() titulo: string;

    @Input() avatar: string;

    // mainTabs = ['Dashboard', 'Tus Clases', 'Planes'];

    ngOnDestroy() { }

    constructor(private location: Location,
                private navCtrl: NavController) {}

    // backUrl() {
    //     this.location.back();
    // }

    goBackUrl() {
        this.navCtrl.back({ animated: true, animationDirection: 'back' });
    }
}
