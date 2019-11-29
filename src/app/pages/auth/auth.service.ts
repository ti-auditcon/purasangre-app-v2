import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SERVER_URL, purasangreAPIKey } from '../../../environments/environment';

import { Storage } from '@ionic/storage';

import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../models/users/user.model';

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
    private _userId = null;
    // tslint:disable-next-line: variable-name
    private _user = new BehaviorSubject<User>(null);

    authenticationState = new BehaviorSubject(false);

    /**
     * check with the user model if user is authenticated,
     * checkin the token
     *
     * @return  boolean
     */
    get userIsAuthenticated() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                return !!user.token;
            }

            return false;
        }));
    }

    /**
     * Get the user id from the User Model
     *
     * @return string (yes, it's an string)
     */
    get userId() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                return user.id;
            }

            return null;
        }));
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

        return this.http.post<AuthService>(`${SERVER_URL}/oauth/token`, data, httpOptions
            ).pipe(tap(userData => {
                console.log(userData);
                // this._user.next(new User(
                //         userData.token_type,
                //         userData.expires_in,
                //         userData.access_token));
            }));
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
                this.http.post(`${SERVER_URL}/oauth/token`, data, httpOptions)
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
