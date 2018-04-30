import { Action } from '@ngrx/store';
import { RouterStateInterface } from './router.interface';
import { SET_PAGES_ROUTER_DATA } from './router.constants';

export class UpdateRouterAction implements Action {
  readonly type = SET_PAGES_ROUTER_DATA;

  constructor(public payload: RouterStateInterface) {}
}

export type TypeRouterPageActions = UpdateRouterAction;
