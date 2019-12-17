import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @Input() urltoBack: string;

    @Input() titulo: string;

    @Input() avatar: string;

    mainTabs = ['Dashboard', 'Tus Clases', 'Planes'];

    ngOnInit() {}

    constructor() {}
}
