import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';

@Injectable()
export class NavigationService {

  constructor(private router: Router) { }

  private nextPageClick$ = new Subject();
  nextPageClick = this.nextPageClick$.asObservable();
  private navigate$ = new Subject<boolean>();

  clickedNextPage(currentUrl, nextUrl) {
    this.nextPageClick$.next({
      currentUrl,
      nextUrl
    });
  }

  goTo(url) {
    this.router.navigate([url]);
  }

}
