import { Injectable } from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';
import {Store, select} from '@ngrx/store';
import {AppStoreInterface} from '../interfaces/store.interface';
import {Observable} from 'rxjs/Observable';
import {RouterStateInterface} from '../store/router.interface';
import {SET_PAGES_ROUTER_DATA} from '../store/router.constants';

@Injectable()
export class RoutingService {
  private page$: Observable<RouterStateInterface>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppStoreInterface>
  ) {
    this.page$ = store.pipe(select('page'));
    this.getRoutingDataProperty();
  }

  private getRoutingDataProperty() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((pageData) => {

        this.store.dispatch({ type: SET_PAGES_ROUTER_DATA, payload: pageData });
      });

  }
}
