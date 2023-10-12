// ENV
import { environment } from '../../../../environments/environment';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-select-clase-type',
  templateUrl: './select-clase-type.page.html',
  styleUrls: ['./select-clase-type.page.scss'],
})
export class SelectClaseTypePage  {
    public claseTypes: any;

    constructor( 
        private router: Router,
        private http: HttpClient,
        public loadingController: LoadingController
    ) { }



    ionViewDidEnter() {
        this.claseTypeLoader();

    }

    async claseTypeLoader() {
        const loading = await this.loadingController.create({
            message: 'Cargando clases',
        });

        loading.present().then(() => {
            Preferences.get({ key: 'authData' }).then((authData) => {
                const parsedData = JSON.parse(authData.value) as {
                    token: string
                };
                const httpOptions = {
                    headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
                };

                this.http.get(`${environment.SERVER_URL}/clases-types`, httpOptions)
                    .subscribe((result: any) => {
                        this.claseTypes = result.data;

                        console.log('entre a las clasetype');

                        console.log(result.data);

                        loading.dismiss();
                    }
                );
            });
        });
    }

    /**
     * [goToDay description]
     */
    goToDay(claseTypeId: number) {
        this.router.navigateByUrl(
            `/home/tabs/clases/clase-type/${claseTypeId}/select-day`
        );
    }
}
