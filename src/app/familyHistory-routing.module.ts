import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';


// import {FamilyHistoryComponent} from './pages/family-history/family-history.component';
// import {FamilyMembersComponent, PageNotFoundComponent} from './pages/family-history/components/index';
// import {FamilyHistoryService} from './pages/family-history/family-history.service';

// const appRoutes: Routes = [
//   { path: 'family-member', component: FamilyMembersComponent},
//   { path: 'family-history',        component: FamilyHistoryComponent },
//   { path: '',   redirectTo: '/family-history', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  imports: [
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true }
    // )
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class FamilyHistoryRoutingModule { }
