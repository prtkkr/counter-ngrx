import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from 'src/app/counter/state/counter.state';
import { customIncrement } from 'src/app/counter/state/counter.actions';
import { getChannelName } from 'src/app/counter/state/counter.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  value!: number
  cName$!: Observable<string>

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    // this.store.select(getChannelName).subscribe(name => {
    //   console.log("Channel Change Observable called !!!");
    //   this.cName = name
    // })
    this.cName$ = this.store.select(getChannelName)
  }

  onAdd() {
    if (typeof (this.value) == 'number')
      this.store.dispatch(customIncrement({ count: this.value }))
    // console.log(this.value);
  }

}
