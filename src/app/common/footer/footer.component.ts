import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {RoutingService} from '../../services/routing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public pageNumber: string;
  public showPage = true;
  public buttonValue = 'Next';

  constructor(private router: Router, private routerService: RoutingService) {
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
  }

}
