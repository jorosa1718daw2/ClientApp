
import { throwError as observableThrowError, Observable } from 'rxjs';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenResponse } from './token.response';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {
    authKey: string = "auth";
    clientId: string = "";

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {

    }

    /*login(username: string, password: string): Observable<boolean> {
        // var url = "api/auth/jwt";
        var url = "http://localhost:63026/api/token/auth";
        var data = {
            username: username,
            password: password,
            client_id: this.clientId,
            grant_type: "password",
            scope: "offline_acces profile email"
        };
        return this.http.post<TokenResponse>(url, data).pipe(
            map(res => {
                let token = res && res.token;
                // if the token is there, login has been successful
                if(token) {
                    this.setAuth(res);
                    // successful login
                    return true;
                }
                // failed login
                return observableThrowError('Unauthorized');
            })
            .catch(error => {
                return new Observable<any>(error);

            }));
              
    }

    //logout
    logout(): boolean {
        this.setAuth(null);
        return true;
    }

    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(
                    this.authKey,
                    JSON.stringify(auth));
            }
            else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }
    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }*/


}