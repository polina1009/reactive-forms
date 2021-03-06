import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';
import { ClickedNavButtonInterface } from '../interfaces/nav.interface';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NavigationService {

  private navButtonClick$ = new Subject<ClickedNavButtonInterface>();
  navButtonClick = this.navButtonClick$.asObservable();

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  public clickedNavButton(navUrl, currentUrl) {
    this.navButtonClick$.next({
      navUrl,
      currentUrl
    });
  }

  public preparationAndDisplayFormData (url) {
    setTimeout(() => {
      if ((this.validate())) {
        this.goTo(url);
      } else {
        this.openSnackBar('Form is not full!', 'Сontinue filling');
      }
    }, 1000);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  private goTo(url) {
    this.router.navigate([url]);
  }

  private validate(): boolean {
    // return true;
    return Math.random() > 0.5;
  }

}
