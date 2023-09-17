import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from 'src/app/home/home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducer } from 'src/app/store/app.state';
import { AuthEffects } from 'src/app/auth/state/auth.effects';
import { AuthTokenInterceptor } from 'src/app/services/auth-token.interceptor';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { CustomSerializer } from 'src/app/store/router/custom-serializer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
