import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  changeChannelName,
  decrement,
  increment,
  reset,
} from 'src/app/counter/state/counter.actions';
import { CounterState } from 'src/app/counter/state/counter.state';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css'],
})
export class CounterButtonComponent implements OnInit {
  // @Output() increment = new EventEmitter<void>()
  // @Output() decrement = new EventEmitter<void>()
  // @Output() reset = new EventEmitter<void>()

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onIncrement() {
    // this.increment.emit()
    this.store.dispatch(increment());
  }

  onDecrement() {
    // this.decrement.emit()
    this.store.dispatch(decrement());
  }

  onReset() {
    // this.reset.emit()
    this.store.dispatch(reset());
  }

  onChannelChange() {
    this.store.dispatch(changeChannelName());
  }
}
