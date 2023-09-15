import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUserToken } from 'src/app/auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(getUserToken).pipe(
      mergeMap((token) => {
        if (!token) {
          return next.handle(request);
        }
        let modifiedRequest = request.clone({
          params: request.params.append('auth', token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
