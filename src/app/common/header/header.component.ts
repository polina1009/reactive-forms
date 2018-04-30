import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {RoutingService} from '../../services/routing.service';
import {RouterStateInterface} from '../../store/router.interface';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public page$: Observable<RouterStateInterface>;

  constructor(
    private router: Router,
    private routerService: RoutingService,
    private store: Store<RouterStateInterface>
  ) {
    this.page$ = store.pipe(select('page'));
  }

  ngOnInit() {
    this.page$.subscribe((pageData) => {
      console.log(pageData);
    });
  }
}
