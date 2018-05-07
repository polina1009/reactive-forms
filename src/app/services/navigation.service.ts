import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';

@Injectable()
export class NavigationService {

  constructor() { }

  private nextPageClick$ = new Subject();
  nextPageClick = this.nextPageClick$.asObservable();
  private navigate$ = new Subject<boolean>();
  navigate = this.navigate$.asObservable();

  clickedNextPage() {
    this.nextPageClick$.next();
  }

  doNavigate(status) {
    if (status) {
      this.navigate$.next();
    }
  }

}
