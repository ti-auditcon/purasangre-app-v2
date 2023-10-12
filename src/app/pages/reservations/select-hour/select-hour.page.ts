// env
import { environment } from '../../../../environments/environment';

import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-select-hour',
  templateUrl: './select-hour.page.html',
  styleUrls: ['./select-hour.page.scss'],
})
export class SelectHourPage {
    public clases: any = [];

    constructor( 
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

            console.log(this.activatedRoute.snapshot.paramMap);

            Preferences.get({ key: 'authData' }).then((authData) => {
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
     */
    goToAddConfirm(claseId = '0', has = false) {
        this.router.navigateByUrl(`/home/tabs/clases/${claseId}/show`);
    }
}
