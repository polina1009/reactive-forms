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
  public showPage = true;
  public buttonValue = 'Next';

  constructor(private router: Router) {
    this.changeFooterButton();
  }

  changeFooterButton () {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url === '/demographics' ? this.showPage = false : this.showPage = true;
        e.url === '/family-history' ? this.buttonValue = 'Finish' : this.buttonValue = 'Next';
      }
    });
  }

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
          } else { return; }
        }
      });
  }

}
