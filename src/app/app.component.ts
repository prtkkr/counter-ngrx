import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { getErrorMessage, getLoader } from 'src/app/store/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Ngrx Counter';
  isLoading$!: Observable<boolean>;
  errorMsg$!: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoader);
    this.errorMsg$ = this.store.select(getErrorMessage);
  }
}
