import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from 'src/app/counter/state/counter.state';
import { Subscription, Observable } from 'rxjs';
import { getCounter } from 'src/app/counter/state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter: any;
  // counter!: number
  counter$!: Observable<CounterState>;
  // counterSubscription!: Subscription

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.counterSubscription = this.store.select('counter')
    //   .subscribe(data => {
    //     this.counter = data.counter
    //   })
    this.counter$ = this.store.select('counter');
    // this.store.select(getCounter).subscribe(data => {
    //   console.log("Counter Change Observable called !!!");
    //   this.counter = data
    // })
  }

  // ngOnDestroy(): void {
  //   this.counterSubscription.unsubscribe()
  // }
}
