import { LoginForm } from './../models/LoginForm';
import { HttpApi } from './../../../core/interceptor/http-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const OAUTH_DATA = environment.oauth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
token !: any;
incorrectCredential : boolean = false;
  register(userRequest: any): Observable<any> {
    const data = {
      code: userRequest.codigo,
      email: userRequest.email,
      password: userRequest.password
    };

    return this.http.post(HttpApi.userRegister, data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  loginWithUserCredentials(loginInfo:LoginForm): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

     const body = new URLSearchParams();
    // body.set('grant_type', 'password');
    // body.set('client_id', OAUTH_DATA.client_id);
    // body.set('client_secret', OAUTH_DATA.client_secret);
    // body.set('UserName', username);
    // body.set('Password', password);
    // body.set('scope', OAUTH_DATA.scope);

    return this.http.post(HttpApi.oauthLogin, loginInfo, { headers })
      .pipe(
        map((response: any) => {
          localStorage.setItem('access_token', JSON.stringify(response.token));
          return response;
        })
      );
  }

  loginWithRefreshToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', OAUTH_DATA.client_id);
    body.set('client_secret', OAUTH_DATA.client_secret);
    body.set('refresh_token', this.refreshToken);
    body.set('scope', OAUTH_DATA.scope);



    return this.http.post(HttpApi.oauthLogin ,{ headers })
      .pipe(
        map((response: any) => {
          localStorage.setItem('access_token', JSON.stringify(response.token));
          return response;
        })
      );
  }


  isLogged(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  logout(): void {
    localStorage.clear();
    window.location.reload();

  }

  get accessToken() {
    return localStorage['access_token'] ? JSON.parse(localStorage['access_token']) : null;
  }

  get refreshToken() {

    return localStorage['access_token'] ? JSON.parse(localStorage['access_token']).refresh_token : null;
  }
}
