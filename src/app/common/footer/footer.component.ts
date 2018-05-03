import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {RoutingService} from '../../services/routing.service';
import {Observable} from 'rxjs/Observable';
import {RouterStateInterface} from '../../store/router.interface';
import {select, Store} from '@ngrx/store';
import {LoginService} from '../../services/login.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  public page$: Observable<RouterStateInterface>;
  public showPage: boolean;
  public buttonValue = 'Next';
  _isLoggedIn$: Observable<boolean>;

  private _routerEventSubscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routerService: RoutingService,
    private store: Store<RouterStateInterface>,
    private loginService: LoginService
  ) {
    this.changeFooterButton();
    this.page$ = store.pipe(select('page'));
    this.showPage = true;
  }

  changeFooterButton () {
    this._routerEventSubscribe = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url === '/' || e.url === '/demographics' ? this.showPage = false : this.showPage = true;
        e.url === '/family-history' ? this.buttonValue = 'Finish' : this.buttonValue = 'Next';
      }
    });
  }

  ngOnInit() {
    this._isLoggedIn$ = this.loginService.isLoggedIn;
  }

  ngOnDestroy() {
    this._routerEventSubscribe.unsubscribe();
  }
}
