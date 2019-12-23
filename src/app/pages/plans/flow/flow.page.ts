// env
import { environment } from '../../../../environments/environment';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';

// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins } from '@capacitor/core';

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

    //   @ViewChild('webview') webviewEl: ElementRef;

    constructor(
        public activatedRoute: ActivatedRoute,
        public platform: Platform,
        public menuCtrl: MenuController,
        public zone: NgZone,
        public storage: Storage,
        public http: HttpClient,
        public route: Router,
        // public iap: InAppBrowser,
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() { }

    ionViewDidEnter() {
        this.loaded = false;
        this.loading = true;
        const id = this.activatedRoute.snapshot.paramMap.get('planId');
        console.log(id);
        Plugins.Storage.get({key: 'authData'}).then((authData) => {

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

                            // const target = '_self';
                            // const options = '{location:"no"}';


                            //     , '_system', 'usewkwebview=yes'
                            // );

                            // browser.on('loadstop').subscribe((event) => {
                            //     console.log('cargo');
                            // });

                            // browser.on('exit').subscribe((event) => {
                            //     this.route.navigate(['/home/plans']);
                            // });

                            // const browser = this.iap.create(flowresult.url, '_system', 'usewkwebview=yes');
                            // browser.on('loadstop').subscribe((event) => {
                            //     console.log('cargo');
                            // });

                            // browser.on('exit').subscribe((event) => {
                            //     this.route.navigate(['/home/plans']);
                            // });
                        }
                    );
                }
            );
        });
    }

    async navigateFlow(url) {
        console.log('en navigateFlow');
        await Plugins.Browser.open({ url }).then(page => {
            console.log(page);
        });
    }
}
