import { environment } from '../../../../environments/environment';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';

@Component({
    selector: 'app-flow',
    templateUrl: './flow.page.html',
    styleUrls: ['./flow.page.scss'],
})
export class FlowPage implements OnInit {
    public loading = true;
    public loaded = false;
    public progress: number;
    public url: string;
    public html: any;

    constructor(
        public activatedRoute: ActivatedRoute,
        public platform: Platform,
        public zone: NgZone,
        public http: HttpClient,
        public route: Router,
    ) { }

    ngOnInit() { }

    ionViewDidEnter() {
        this.loaded = false;
        this.loading = true;
        const id = this.activatedRoute.snapshot.paramMap.get('planId');
        console.log(id);
        Browser.addListener('browserFinished', () => {
            this.route.navigate([`/plans/${id}`]);
        });
        Preferences.get({key: 'authData'}).then((authData) => {

            const parsedData = JSON.parse(authData.value) as {
                token: string
            };

            const httpOptions = {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${parsedData.token}` // updated
                })
            };

            this.http.get(`${environment.SERVER_URL}/plans/${id}/contract`, httpOptions)
                .subscribe((result: any) => {
                    console.log(result.data);

                    this.http.get(`${environment.SERVER_URL}/flow/${result.data.id}`, httpOptions)
                        .subscribe((flowresult: any) => {
                            console.log('url flow');
                            console.log(flowresult.url);

                            this.navigateFlow(flowresult.url);
                            
                            // rowser.on('loadstop').subscribe((event) => {
                            //       console.log('cargo android');
                            //     });

                            //     browser.on('exit').subscribe((event) => {
                            //         this.zone.run(async () => {
                            //             await this.route.navigate([`/plans/${id}`]);
                            //         });

                            //         browser.close();
                            //     });

                            // if (this.platform.is('android')) {
                            //     const browser = this.iab.create(
                            //         flowresult.url, '_blank',
                            //         `hideurlbar=yes,footer=no,toolbarcolor=#141A29,
                            //         navigationbuttoncolor=#D3D5E0,closebuttoncaption=cerrar,
                            //         closebuttoncolor=#D3D5E0`
                            //     );

                            //     browser.on('loadstop').subscribe((event) => {
                            //       console.log('cargo android');
                            //     });

                            //     browser.on('exit').subscribe((event) => {
                            //         this.zone.run(async () => {
                            //             await this.route.navigate([`/plans/${id}`]);
                            //         });

                            //         browser.close();
                            //     });
                            // }

                            // if (this.platform.is('ios')) {
                            //     const browser = this.iab.create(
                            //         flowresult.url,
                            //         '_blank',
                            //         `toolbarposition=top,closebuttoncaption=Cerrar,
                            //         toolbarcolor=#141A29,closebuttoncolor=#D3D5E0,
                            //         navigationbuttoncolor=#D3D5E0`
                            //     );

                            //     browser.on('loadstop').subscribe((event) => {
                            //       console.log('cargo ios');
                            //     });

                            //     browser.on('exit').subscribe((event) => {
                            //         this.zone.run(async () => {
                            //             await this.route.navigate([`/plans/${id}`]);
                            //         });

                            //         browser.close();
                            //     });
                            // }
                        }
                    );
                }
            );
        });
    }



    async navigateFlow(url) {
        console.log('en navigateFlow');
       await Browser.open({ url });

    }
}
