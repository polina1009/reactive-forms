import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {RoutingService} from '../../services/routing.service';
import {RouterStateInterface} from '../../store/router.interface';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../../auth11/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public page$: Observable<RouterStateInterface>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private routerService: RoutingService,
    private store: Store<RouterStateInterface>,
    private loginService: LoginService
  ) {
    this.page$ = store.pipe(select('page'));
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.page$.subscribe((pageData) => {
      console.log(pageData);
    });
  }

  onLogout() {
    this.loginService.logout();
  }
}
