import {RouterStateInterface} from './router.interface';
import { TypeRouterPageActions } from './router.actions';
import {SET_PAGES_ROUTER_DATA} from './router.constants';

export function pageDataReducer(state: RouterStateInterface = {title: ''}, action: TypeRouterPageActions) {
  switch (action.type) {
    case SET_PAGES_ROUTER_DATA:

      return {
        ...action.payload
      };

    default:
      return state;
  }
}
