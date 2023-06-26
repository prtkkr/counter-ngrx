import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from 'src/app/counter/state/counter.state';
import { customIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  value!: number

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void { }

  onAdd() {
    this.store.dispatch(customIncrement({ count: this.value }))
    // console.log(this.value);
  }

}
