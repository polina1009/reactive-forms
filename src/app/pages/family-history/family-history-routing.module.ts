import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FamilyHistoryComponent} from './family-history.component';
import { PageNotFoundComponent } from './components/page-not-found';


const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: 'family-history',        component: FamilyHistoryComponent },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class FamilyHistoryRoutingModule {}
