import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';
import {ClickedNextPageInterface, ClickedPrevPageInterface} from '../form.interface';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  private nextPageClick$ = new Subject<ClickedNextPageInterface>();
  nextPageClick = this.nextPageClick$.asObservable();
  private prevPageClick$ = new Subject<ClickedPrevPageInterface>();
  prevPageClick = this.prevPageClick$.asObservable();

  clickedNextPage(currentUrl, nextUrl) {
    this.nextPageClick$.next({
      currentUrl,
      nextUrl
    });
  }

  clickedPrevPage(prevUrl, currentUrl) {
    this.prevPageClick$.next({
      prevUrl,
      currentUrl
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  goTo(url) {
    this.router.navigate([url]);
  }

}
