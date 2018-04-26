import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { FormsPageComponent } from './pages/forms-page';
import { FamilyHistoryComponent } from './pages/family-history';
import { PageNotFoundComponent } from './pages/page-not-found';

const appRoutes: Routes = [
  {
    path: 'demographics',
    component: FormsPageComponent,
    data: { title: 'Demographics', pageNumber: '1 of 2' }
  },
  {
    path: 'family-history',
    component: FamilyHistoryComponent,
    data: { title: 'Family History', pageNumber: '2 of 2' }
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
