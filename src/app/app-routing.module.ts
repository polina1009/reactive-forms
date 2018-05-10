import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { FormsPageComponent } from './pages/forms-page';
import { FamilyHistoryComponent } from './pages/family-history';
import { PageNotFoundComponent } from './pages/page-not-found';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { MedicalHistoryComponent } from './pages/medical-history';
import { OcularHistoryComponent } from './pages/ocular-history';
import {MedicationsComponent} from './pages/medications';

const appRoutes: Routes = [
  {
    path: 'demographics',
    component: FormsPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'Demographics', pageNumber: 1 }
  },
  {
    path: 'medical-history',
    component: MedicalHistoryComponent,
    data: {title: 'Medical History', pageNumber: 2}
  },
  {
    path: 'ocular-history',
    component: OcularHistoryComponent,
    data: {title: 'Ocular History', pageNumber: 3}
  },
  {
    path: 'medications',
    component: MedicationsComponent,
    data: {title: 'Medications', pageNumber: 4}
  },
  {
    path: 'family-history',
    component: FamilyHistoryComponent,
    data: { title: 'Family History', pageNumber: 5 }
  },
  {
    path: 'login',
    component: AuthComponent
  },
  { path: '',   redirectTo: '/demographics', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
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
