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
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  public page$: Observable<RouterStateInterface>;
  private nextUrl = {
    '/': '/medical-history',
    '/medical-history': '/ocular-history',
    '/ocular-history': '/family-history'
  };
  private prevUrl = {
    '/family-history': '/ocular-history',
    '/ocular-history': '/medical-history',
    '/medical-history': '/'
  };
  public previousPage: string;
  public currentPage: string;
  public nextPage: string;
  public showPage: boolean;
  public buttonValue = 'Next';
  _isLoggedIn$: Observable<boolean>;

  private _routerEventSubscribe: Subscription;
  private _nextPageSubscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routerService: RoutingService,
    private store: Store<RouterStateInterface>,
    private loginService: LoginService,
    private navService: NavigationService
  ) {
    this.changeFooterData();
    this.page$ = store.pipe(select('page'));
    this.showPage = true;
  }

  changeFooterData () {
    this._routerEventSubscribe = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url === '/' || e.url === '/demographics' ? this.showPage = false : this.showPage = true;
        e.url === '/family-history' ? this.buttonValue = 'Finish' : this.buttonValue = 'Next';
      }
    });
  }

  goNextPage() {
    this.navService.clickedNextPage(this.currentPage, this.nextPage);
  }

  goPrevPage() {
    this.navService.clickedPrevPage(this.previousPage, this.currentPage);
  }

  ngOnInit() {
    this._isLoggedIn$ = this.loginService.isLoggedIn;

    this._nextPageSubscribe = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentPage = e.url;
        if (Object.keys(this.nextUrl).includes(e.url) === true) {
          this.nextPage = this.nextUrl[e.url];
        }
        if (Object.keys(this.prevUrl).includes(e.url) === true) {
          this.previousPage = this.prevUrl[e.url];
        }
      }
    });
  }

  ngOnDestroy() {
    this._routerEventSubscribe.unsubscribe();
    this._nextPageSubscribe.unsubscribe();
  }
}
