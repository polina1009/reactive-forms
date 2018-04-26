import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  pageNumber: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe(() => {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data['pageNumber']) {
            this.pageNumber = root.data['pageNumber'];
            return;
          } else {
            return;
          }
        }
      });
  }

}
