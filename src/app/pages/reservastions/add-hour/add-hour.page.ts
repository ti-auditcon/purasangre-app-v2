//env
import { environment } from '../../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-hour',
  templateUrl: './add-hour.page.html',
  styleUrls: ['./add-hour.page.scss'],
})
export class AddHourPage {
    public clases: any = [];

    constructor( private storage: Storage,
                 private http: HttpClient,
                 private router: Router,
                 public activatedRoute: ActivatedRoute,
                 public loadingController: LoadingController
                ) { }

    async hoursLoader() {
        const loading = await this.loadingController.create({
            message: 'Cargando clases...',
        });

        loading.present().then(() => {
            const date = this.activatedRoute.snapshot.paramMap.get('date');

            const clasetype = this.activatedRoute.snapshot.paramMap.get('claseTypeId');

            console.log(this.activatedRoute.snapshot.paramMap)

            Plugins.Storage.get({ key: 'authData' }).then((authData) => {
                const parsedData = JSON.parse(authData.value) as {
                    token: string
                };

                const httpOptions = {
                    headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
                };

                this.http.get(
                    `${environment.SERVER_URL}/clases?date=${date}&type=${clasetype}`,
                    httpOptions
                ).subscribe((result: any) => {
                    console.log('entre a las clases del dia');

                    this.clases = result.data;

                    console.log(this.clases);

                    console.log(`${environment.SERVER_URL}/clases?date=${date}&type=${clasetype}`);

                    loading.dismiss();
                });
            });
        });
    }

    ionViewDidEnter() {
        this.hoursLoader();
    }

    /**
     * [goToAddConfirm description]
     *
     * @param   {[type]}  claseId:  [claseId: description]
     * @param   {[type]}  string    [string description]
     * @param   {[type]}  has       [has description]
     *
     * @return  {[type]}            [return description]
     */
    goToAddConfirm(claseId = '0', has = false) {
        this.router.navigateByUrl(`/home/tabs/reservations/${claseId}/show`);
    }
}
