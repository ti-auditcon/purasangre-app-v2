export class User {
    /**
     * public variables to be accessed from th outside
     */
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        // tslint:disable-next-line: variable-name
        public _token: string,
        // tslint:disable-next-line: variable-name
        public _tokenExpirationDate: Date,

    ) {}

    /**
     * To navigate inside the app, we need obtain the token
     *
     * @return  string|null
     */
    get token() {
        if ( !this._tokenExpirationDate || this._tokenExpirationDate <= new Date()) {
            return null;
        }

        return this._token;
    }
}
