import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {FormModule} from './pages/forms-page';
import { FamilyHistoryModule } from './pages/family-history';
import {PageNotFoundComponent} from './pages/page-not-found';
import {HeaderComponent} from './common/header';
import {FooterComponent} from './common/footer';
import { LoginService } from './services/login.service';

import {ApiService} from './services/api.service';
import {AppRoutingModule} from './app-routing.module';
import { RoutingService } from './services/routing.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { pageDataReducer} from './store/router.reducer';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AuthModule} from './pages/auth/auth.module';
import {AuthGuard} from './guards/auth.guard';
import {MedicalHistoryModule} from './pages/medical-history/medical-history.module';
import {NavigationService} from './services/navigation.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {OcularHistoryModule} from './pages/ocular-history';
import {MedicationsModule} from './pages/medications/';


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
    AuthModule,
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
    AngularFirestoreModule
  ],
  providers: [ApiService, RoutingService, LoginService, AuthGuard, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
