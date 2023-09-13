import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { AuthResponseData } from 'src/app/models/AuthResponse.model';
import { User } from 'src/app//models/user.model';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/auth/state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval!: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
    return this.http.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`;
    return this.http.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    ); // in ms
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  selectErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Password is invalid';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled for this project';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'All requests from this device have been blocked due to unusual activity. Please try again later.';
      default:
        return 'Unknown error occured. Please try again.';
    }
  }

  setUserDataInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runIntervalTimeout(user);
  }

  getUserDataFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runIntervalTimeout(user);
      return user;
    }
    return null;
  }

  runIntervalTimeout(user: User) {
    let currentTime = new Date().getTime(); // in milliseconds since 01/01/1970
    const expirationTime = user.expireDate.getTime();
    const timeInterval = expirationTime - currentTime;

    this.timeoutInterval = setTimeout(() => {
      // auto logout when token has expired
      this.store.dispatch(logout());
    }, timeInterval);
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
