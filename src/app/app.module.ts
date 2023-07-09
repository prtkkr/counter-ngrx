import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from 'src/app/home/home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { counterReducer } from 'src/app/counter/state/counter.reducer';
import { CounterComponent } from 'src/app/counter/counter/counter.component';
import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/counter/custom-input/custom-input.component';
import { CounterButtonComponent } from 'src/app/counter/counter-button/counter-button.component';
import { CounterOutputComponent } from 'src/app/counter/counter-output/counter-output.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomInputComponent,
    HomeComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ counter: counterReducer }),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
