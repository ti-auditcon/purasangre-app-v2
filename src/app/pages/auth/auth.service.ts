import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SERVER_URL, purasangreAPIKey } from '../../../environments/environment';

import { Storage } from '@ionic/storage';

import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN = 'refresh-token';

// interface obj {
//     token: string;
// }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    // tslint:disable-next-line: variable-name
    private _userIsAuthenticated = false;
    // tslint:disable-next-line: variable-name
    private _userId = false;

    authenticationState = new BehaviorSubject(false);

    get userIsAuthenticated() {
        return this._userIsAuthenticated;
    }

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private router: Router
    ) { }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                // console.log('res:'+res);
                this.authenticationState.next(true);
            } else {
                // console.log('res:'+res);
                this.authenticationState.next(false);
            }
        });
    }

    login(email, password) {
        const data = JSON.stringify({
            username: email,
            password,
            grant_type: 'password',
            client_id: 2,
            client_secret: purasangreAPIKey,
        });

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json', // updated
            })};

        this.http.post(SERVER_URL + '/oauth/token' , data, httpOptions);
    }

    refreshToken() {
        this.storage.get(REFRESH_TOKEN)
            .then(res => {
                const refresToken = res;

                const data = JSON.stringify({
                    grant_type: 'refresh_token',
                    client_id: 2,
                    client_secret: purasangreAPIKey,
                    refresToken,
                });

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json', // updated
                    })};

                // return new Promise((resolve, reject) => {
                this.http.post(SERVER_URL + '/oauth/token', data, httpOptions)
                    .subscribe((result: any) => {
                        console.log('success refresh 200');

                        this.storage.set(REFRESH_TOKEN, result.refresh_token);

                        this.storage.set(purasangreAPIKey, result.access_token).then(() => {
                            this.authenticationState.next(true);

                            this.router.navigate(['home']);
                        });
                    },
                    (err) => {
                       console.log('error refrersh 401:' + JSON.stringify(err));
                       this.router.navigate(['home']);
                    });
          // });
            }).catch((error) => {
                console.log(error);
            });
    }

    logout() {
        this.storage.remove(REFRESH_TOKEN);

        // this.storage.remove('tutorialComplete');

        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }
}
