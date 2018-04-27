import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {RoutingService} from '../../services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string;

  constructor(private router: Router, private routerService: RoutingService) {
  }

  ngOnInit() {
    // this.routerService.getRoutingDataProperty(this.title, 'title');

    // this.router.events
    //   .filter((event: any) => event instanceof NavigationEnd)
    //   .subscribe(() => {
    //     let root = this.router.routerState.snapshot.root;
    //     while (root) {
    //       if (root.children && root.children.length) {
    //         root = root.children[0];
    //       } else if (root.data && root.data['title']) {
    //         this.title = root.data['title'];
    //         return;
    //       } else {
    //         return;
    //       }
    //     }
    //   });
  }
}
