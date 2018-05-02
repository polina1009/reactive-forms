import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { FormsPageComponent } from './pages/forms-page';
import { FamilyHistoryComponent } from './pages/family-history';
import { PageNotFoundComponent } from './pages/page-not-found';
import {LoginComponent} from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'demographics',
    component: FormsPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'Demographics', pageNumber: 1 }
  },
  {
    path: 'family-history',
    component: FamilyHistoryComponent,
    data: { title: 'Family History', pageNumber: 2 }
  },
  { path: '',   redirectTo: '/demographics', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
