import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';
import {ClickedNextPageInterface} from '../form.interface';

@Injectable()
export class NavigationService {

  constructor(private router: Router) { }

  private nextPageClick$ = new Subject<ClickedNextPageInterface>();
  nextPageClick = this.nextPageClick$.asObservable();

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
