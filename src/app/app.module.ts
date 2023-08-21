import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from 'src/app/home/home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CounterComponent } from 'src/app/counter/counter/counter.component';
import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/counter/custom-input/custom-input.component';
import { CounterButtonComponent } from 'src/app/counter/counter-button/counter-button.component';
import { CounterOutputComponent } from 'src/app/counter/counter-output/counter-output.component';
import { AppReducer } from 'src/app/store/app.state';
import { AddPostComponent } from './posts/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomInputComponent,
    HomeComponent,
    HeaderComponent,
    PostListComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(AppReducer),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
