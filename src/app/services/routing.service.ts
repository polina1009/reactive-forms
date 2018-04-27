import { Injectable } from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';

@Injectable()
export class RoutingService {
  title;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.getRoutingDataProperty());
  }

  getRoutingDataProperty() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        console.log('@@@@@@@@@@', event);
      });

  }

  // getRoutingDataProperty() {
  //   this.router.events
  //     .filter((event: any) => event instanceof NavigationEnd)
  //     .subscribe(() => {
  //       let root = this.router.routerState.snapshot.root;
  //       while (root) {
  //         if (root.children && root.children.length) {
  //           root = root.children[0];
  //         } else if (root.data) {
  //           root.paramMap.get('data');
  //           // property = root.data[dataProperty];
  //           // console.log('$$$$$$$$$$$$$$$$$', root.paramMap.get('data'));
  //           return ;
  //         } else { return; }
  //       }
  //     });
  // }

}
