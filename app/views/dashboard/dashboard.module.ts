import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FamilyMemberComponent } from "./familymember/familymember.components";
import { PrintComponent } from "./printsummary/print.component";
import { ReportComponent } from "./report/report.component";
import { RePrintComponent } from "./reprintsummary/reprintsummary.component";
import { TransactionSummaryComponent } from "./transactionsummary/transactionsummary.component";
import { CompanyRegistrationComponent } from "./company-registration/company-registration.component";
import { SearchEmployeeComponent } from "./search-employee/search-employee.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from "./error/error.component";
import { PaymentSuccessComponent } from "./paymentsuccess/paymentsuccess.component";
import { ScModalModule } from 'angular-5-popup';
import { SubmitSuccessComponent } from "./company-registration/submitsuccess.component";
import { FileUploadModule } from "angular-file-uploader";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { KnetErrorComponent } from './knet-error/knet-error.component';
import { ServiceCenterComponent } from './service-center/service-center.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, ScModalModule, TranslateModule, FileUploadModule,
    NgbModule.forRoot()
  ],
  declarations: [ DashboardComponent , FamilyMemberComponent,
    PrintComponent,
     ReportComponent,
     RePrintComponent,
     TransactionSummaryComponent,
     CompanyRegistrationComponent,
     SearchEmployeeComponent,ErrorComponent,PaymentSuccessComponent,SubmitSuccessComponent, KnetErrorComponent, ServiceCenterComponent ]
})
export class DashboardModule { }
