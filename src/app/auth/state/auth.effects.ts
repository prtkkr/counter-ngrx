import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { loginStart, loginSuccess } from 'src/app/auth/state/auth.actions';
import { AuthResponseData } from 'src/app/models/AuthResponse.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            // Set Loading Spinner to false
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // Set Error Message to null
            this.store.dispatch(setErrorMessage({ message: '' }));
            // Format user data and return Login Success action
            const user = this.authService.formatUser(data);
            return loginSuccess({ user: user });
          }),
          catchError((errorResp: any) => {
            // Format Error Message
            let errorMessage = errorResp.error.error.message;
            errorMessage = this.authService.selectErrorMessage(errorMessage);
            // Set Loading Spinner to false
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // Dispatch Error Message
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    (): any => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
