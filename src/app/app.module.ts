import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found';
import { HeaderComponent } from './common/header';
import { FooterComponent } from './common/footer';

import { environment } from '../environments/environment';

// angularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// modules
import { FormModule } from './pages/forms-page';
import { FamilyHistoryModule } from './pages/family-history';
import { AppRoutingModule } from './app-routing.module';
import {LoginModule} from './pages/login/login.module';
import {SignUpModule} from './pages/sign-up/sign-up.module';
import { MedicalHistoryModule } from './pages/medical-history/medical-history.module';
import { OcularHistoryModule } from './pages/ocular-history';
import { MedicationsModule } from './pages/medications/';

// services
import { LoginService } from './services/login.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';
import { RoutingService } from './services/routing.service';
import { NavigationService } from './services/navigation.service';
import { PatientService } from './services/patient.service';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { pageDataReducer} from './store/router.reducer';

// mat-design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormModule,
    AppRoutingModule,
    FamilyHistoryModule,
    MedicalHistoryModule,
    LoginModule,
    SignUpModule,
    OcularHistoryModule,
    MedicationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    FlexLayoutModule,
    StoreModule.forRoot({
      page: pageDataReducer
    }),
    StoreDevtoolsModule.instrument(),
    AngularFireModule.initializeApp(environment.firebase, 'patient-medical-store'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ApiService, RoutingService, LoginService, AuthGuard, NavigationService, PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
