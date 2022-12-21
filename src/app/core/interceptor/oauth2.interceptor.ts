import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, filter, take } from 'rxjs/operators';

import { HttpApi } from './http-api';
import { AuthService } from 'src/app/features/auth/services/auth.service';
// import { AuthService } from '../services/auth.service';

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {
  refreshTokenInProgress!: boolean;
  refreshTokenSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  constructor(
    private _authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
    .handle(this.performRequest(req))
    .pipe(
      catchError((err) => this.processRequestError(err, req, next))
    );
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;

    // headers.set('Access-Control-Allow-Credentials', 'true');
    // headers.set('Access-Control-Max-Age'        ,'86400');

    // headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      if (this.isAuthenticationRequired(req.url)) {
       // if (this.JsonApi(req.url)) {
      //  headers = headers.set('Content-Type', ' application/json');
        headers = headers.set('Accept', ' application/json');
        headers = headers.set("Access-Control-Allow-Headers", "content-type");
       // }
        headers = headers.set('Authorization', `Bearer ${this._authService.accessToken}`);
        // headers = headers.set('Authorization', `Basic ${this._authService.accessToken}`);
    }

    return req.clone({ headers });
  }

  private processRequestError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (error.status === 401 && this._authService.isLogged()) {
      return this.tryAgainWithRefresToken(req, next);
    }

    return throwError(error);
}

private JsonApi(apiUrl: string): boolean {
  const blockedApiList = [environment.backend.host + HttpApi.createApplicantProfile];
  return blockedApiList.includes(apiUrl) ? false : true;
}

  // Helpers and Casuistics
  private isAuthenticationRequired(apiUrl: string): boolean {
    const blockedApiList = [HttpApi.oauthLogin];
    return blockedApiList.includes(apiUrl) ? false : true;
  }

  private tryAgainWithRefresToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.refreshTokenInProgress) {
        // Set the refreshToknSubject to null so that subsequent API calls will wait until the new token has been retrieved
        this.refreshTokenSubject.next(null);
        this.refreshTokenInProgress = true;

        return this._authService
            .loginWithRefreshToken()
            .pipe(
                switchMap((result) => {
                    if (result) {
                        this.refreshTokenSubject.next(result);
                        return next.handle(this.performRequest(req));
                    }

                    throw new Error('Acceso denegado.');
                }),
                catchError(error => {
                    this._authService.logout();
                    return throwError(error);
                }),
                finalize(() => {
                    this.refreshTokenInProgress = false;
                })
            );
    } else {
        return this.refreshTokenSubject
            .pipe(
                filter(result => result != null),
                take(1),
                switchMap(() => next.handle(this.performRequest(req)))
            );
    }
  }
}
