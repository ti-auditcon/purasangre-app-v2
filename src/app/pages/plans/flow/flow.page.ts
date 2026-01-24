import { environment } from '../../../../environments/environment';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';

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
        public storage: Storage,
        public http: HttpClient,
        public route: Router,
    ) { }

    ngOnInit() { }

    async ionViewDidEnter() {
        this.loaded = false;
        this.loading = true;
        const id = this.activatedRoute.snapshot.paramMap.get('planId');
        console.log(id);
        
        const authData = await this.storage.get('authData');
        if (!authData) {
            return;
        }

        const parsedData = JSON.parse(authData) as {
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
                    .subscribe(async (flowresult: any) => {
                        console.log('url flow');
                        console.log(flowresult.url);

                        // Usar Browser API de Capacitor (más simple que InAppBrowser)
                        // El plugin Browser no soporta callbacks pero es más moderno
                        await Browser.open({ 
                            url: flowresult.url,
                            presentationStyle: 'fullscreen',
                            toolbarColor: '#141A29'
                        });
                        
                        // Cuando el usuario cierra el browser, navegar de vuelta
                        // Nota: Browser.addListener se puede usar para detectar el cierre
                        Browser.addListener('browserFinished', async () => {
                            await this.route.navigate([`/plans/${id}`]);
                        });
                    }
                );
            }
        );
    }
}
