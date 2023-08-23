import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { CounterComponent } from 'src/app/counter/counter/counter.component';
import { CustomInputComponent } from 'src/app/counter/custom-input/custom-input.component';
import { CounterButtonComponent } from 'src/app/counter/counter-button/counter-button.component';
import { CounterOutputComponent } from 'src/app/counter/counter-output/counter-output.component';
import { counterReducer } from 'src/app/counter/state/counter.reducer';

const routes: Routes = [{ path: '', component: CounterComponent }];

@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature('counter', counterReducer),
  ],
})
export class CounterModule {}
