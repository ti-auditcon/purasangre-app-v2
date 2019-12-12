// env
import { environment } from '../../../environments/environment';

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Storage } from '@ionic/storage';
// import { Firebase } from '@ionic-native/firebase/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { Plugins } from '@capacitor/core';

import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { AuthService } from '../auth/auth.service';

const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

    // @ViewChild('barCanvas') barCanvas;

    barChart: any;

    public user: any = '';
    public userPlan: any = '';
    public wod: any = '';
    public wods: any = '';
    public today: any = [];
    public alerts: any = [];
    public assistance: any = [];
    public avatar: any = '';

    public active = false;

    public wodsMeta: any;
    public wodsCount: any;

    constructor(
        private router: Router,
        // private storage: Storage,
        private http: HttpClient,
        // private firebase: Firebase,
        private authService: AuthService,
        // private splashScreen: SplashScreen,
    ) {}

    public lineChartData: ChartDataSets[] = [
        { data: [104, 103, 101, 98, 97], label: 'Peso corporal' },
    ];

    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May'];

    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            xAxes: [{ gridLines: { display: false }}],
            yAxes: [{ gridLines: { display: false }}]
        },
        annotation: {
            annotations: [
                {
                    type: 'line', mode: 'vertical', scaleID: 'x-axis-0',
                    value: 'March', borderColor: 'orange', borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };

ionViewWillEnter() {
    // Plugins.Storage.get({ key: 'authData' }).then((value) => {
    //     this.http.get(`${environment.SERVER_URL}/profile`, httpOptions)
    //         .subscribe((result: any) => {
    //             this.user = result.data;




    //             console.log(this.user);

    //             // this.splashScreen.hide();

    //             if (!this.user.tutorial) {
    //                 this.router.navigateByUrl('/tutorial');
    //             }
    //         },
    //         err => {
    //             console.log('error perfil');

    //             // this.authService.refreshToken();

    //             // this.splashScreen.hide();
    //         });
    // });
    // this.storage.get(TOKEN_KEY).then((value) => {
    //     console.log(value);
    //     const Bearer = value;

    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             Authorization: `Bearer ${Bearer}` // updated
    //         })
    //     };

    //     this.http.get(`${environment.SERVER_URL}/profile`, httpOptions)
    //         .subscribe((result: any) => {
    //             this.user = result.data;

    //             this.storage.set('avatar', this.user.avatar);

    //             const random = (new Date()).toString();

    //             this.avatar = this.user.avatar + '?cb=' + random;

    //             console.log(this.user);

    //             this.splashScreen.hide();

    //             if (!this.user.tutorial) {
    //                 this.router.navigateByUrl('/tutorial');
    //             }
    //         },
    //         err => {
    //             console.log('error perfil');

    //             this.authService.refreshToken();

    //             this.splashScreen.hide();
    //         });

    //     this.http.get(`${environment.SERVER_URL}/todaywods`, httpOptions)
    //         .subscribe((result: any) => {
    //             this.wods = result.data;

    //             console.log('ENTRE wods');

    //             console.log(this.wods);

    //             this.wodsMeta = result.meta;

    //             this.wodsCount = this.wodsMeta.pagination.total;

    //             console.log(this.wodsMeta.pagination.total);
    //         },
    //         err => {
    //             console.log('error wod');
    //         });

    //     this.http.get(`${environment.SERVER_URL}/users-alerts`, httpOptions)
    //         .subscribe((result: any) => {
    //             this.alerts = result.data;

    //             console.log(this.alerts);
    //         }, err => {
    //             // this.firebase.logEvent("user_alerts_error", {content_type: "http_error", item_id: "dashboard"});
    //             console.log('error user-alerts');
    //         });

    //     // this.http.get(`${environment.SERVER_URL}/assistance`, httpOptions)
    //     //     .subscribe((result: any) => {
    //     //         this.assistance = result;
    //     //         console.log(this.assistance);
    //     //         this.barChart = new chart(this.barCanvas.nativeElement, {
    //     //             type: 'bar',
    //     //             data: {
    //     //                 labels: this.assistance.label,

    //     //                 datasets: [{
    //     //                     data: this.assistance.data,
    //     //                     label: '',
    //     //                     backgroundColor:  'rgba(255, 99, 132, 0.2)',
    //     //                     borderWidth: 1
    //     //                 }]
    //     //             },
    //     //             options: {
    //     //                 legend: {
    //     //                 display: false,
    //     //                 },
    //     //                 scales: {
    //     //                     yAxes: [{
    //     //                         type: 'linear', display: true, position: 'left', id: 'y-axis-1',
    //     //                         gridLines: { display: false },
    //     //                         labels: { show: true },
    //     //                         ticks: {
    //     //                             suggestedMax: 24,
    //     //                             beginAtZero: true,
    //     //                             // userCallback(label, index, labels) {
    //     //                             //     if (Math.floor(label) === label) {
    //     //                             //         return label;
    //     //                             //     }
    //     //                             // },
    //     //                         }
    //     //                     }]
    //     //                 },
    //     //             },
    //     //         });
    //     //     },
    //     //     err => {
    //     //         console.log('error assistance');
    //     //     });
    // });
}

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');

            event.target.complete();
        }, 2000);
    }

    goToEditConfirm(id: string = '0') {
        // this.firebase.logEvent(
        //     'go_to_profile',
        //     {
        //         content_type: 'action',
        //         item_id: 'dashboard_profile_button'
        //     }
        // );

        this.router.navigate(['/home/edit-confirm/' + id]);
    }

    verWOD(id) {
        // this.firebase.logEvent("go_to_wod", {content_type: "action", item_id: "dashboard_button"});
        this.router.navigate( ['/home/wods/' + id] );
    }
}
