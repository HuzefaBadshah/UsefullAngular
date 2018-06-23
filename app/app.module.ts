import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginService } from "./services/login.service";
import { Configuration } from "./common-services/app-constant";
import { HttpService } from "./common-services/http-service";
import { UtilService } from "./common-services/util-services";
import { Authentication } from "./common-services/authentication";
import { AuthGuard } from "./common-services/auth-guard-service";
import { SearchService } from "./services/search.service";
import { RegisterService } from "./services/register.service";
import { PaymentService } from "./services/payment.service";
import { PrintService } from "./services/report.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { SuccessComponent } from "./views/success/success.component";
import { AddFamilyComponent } from "./views/family/addfamily.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLangService } from "./services/translate.service";


@NgModule({
  imports: [
    CommonModule,
      FormsModule,
        ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    HttpModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
     ToastrModule.forRoot({closeButton: true, timeOut: 4000, preventDuplicates: true})
     
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SuccessComponent,
    AddFamilyComponent
   
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    LoginService,
     Configuration,
    HttpService,
    UtilService,
    Authentication,
    AuthGuard,
    SearchService,
    RegisterService,
    PaymentService,
    PrintService,TranslateLangService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, ('./assets/i18n/'), '.json');
}
