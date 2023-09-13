import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';

import { AuthResponseData } from 'src/app/models/AuthResponse.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthService } from 'src/app/services/auth.service';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  logout,
  signUpStart,
  signUpSuccess,
} from 'src/app/auth/state/auth.actions';
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
            // Format user data
            const user = this.authService.formatUser(data);
            // Save User Data in LocalStorage
            this.authService.setUserDataInLocalStorage(user);
            // return Login Success action
            return loginSuccess({ user: user, redirect: true });
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

  signUp$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(signUpStart),
      mergeMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserDataInLocalStorage(user);
            return signUpSuccess({ user: user, redirect: true });
          }),
          catchError((errorResp: any) => {
            let errorMessage = errorResp.error.error.message;
            errorMessage = this.authService.selectErrorMessage(errorMessage);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user: any = this.authService.getUserDataFromLocalStorage();
        return of(loginSuccess({ user: user, redirect: false }));
      })
    );
  });

  loginRedirect$ = createEffect(
    (): any => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signUpSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    (): any => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );

  // signUpRedirect$ = createEffect(
  //   (): any => {
  //     return this.actions$.pipe(
  //       ofType(signUpSuccess),
  //       tap((action) => {
  //         this.store.dispatch(setErrorMessage({ message: '' }));
  //         this.router.navigate(['/']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}
