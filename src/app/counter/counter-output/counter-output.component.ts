import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from 'src/app/counter/state/counter.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // @Input() counter: any;
  counter!: number
  counterSubscription!: Subscription

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    this.counterSubscription = this.store.select('counter')
      .subscribe(data => {
        this.counter = data.counter
      })
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe()
  }

}
