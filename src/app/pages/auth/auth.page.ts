import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    private isLoading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit() {}

    /**
     * Make the process of authentication of the user,
     * this show to user the await while manage the login process
     *
     * {string}  email
     * {string}  password
     *
     * @return Redirect
     */
    authenticate(email: string, password: string) {
        this.isLoading = true;

        this.loadingCtrl.create({ keyboardClose: true, message: 'Ingresando...'})
            .then(loadingEl => {
                const res = this.authService.login(email, password);
                console.log(res);
                res.subscribe(resData => console.log(resData));
                loadingEl.present();
                setTimeout(() => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    console.log('hola hola dismiss');
                    this.router.navigateByUrl('/home/tabs/dashboard');
                }, 1500);
            });
    }

    /**
     *  This is for check the form by itself,
     *  If everything is correct go to login method
     */
    onSubmitLogin(form: NgModel) {
        if (form.value.email && form.value.password) {
            this.authenticate(form.value.email, form.value.password);
        }
        console.log('faltan datos washo');
    }
}
