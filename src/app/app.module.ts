import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FormModule} from './pages/forms-page';
import { FamilyHistoryModule } from './pages/family-history';
import {PageNotFoundComponent} from './pages/page-not-found';
import {HeaderComponent} from './common/header';
import {FooterComponent} from './common/footer';

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
import {LoginModule} from './pages/login/login.module';


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
    LoginModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    StoreModule.forRoot({
      page: pageDataReducer
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ApiService, RoutingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
