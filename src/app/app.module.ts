import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from 'src/app/app.component';
import { CounterComponent } from 'src/app/counter/counter/counter.component';
import { CounterButtonComponent } from 'src/app/counter/counter-button/counter-button.component';
import { CounterOutputComponent } from 'src/app/counter/counter-output/counter-output.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from 'src/app/counter/state/counter.reducer';
import { CustomInputComponent } from './counter/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ counter: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
