import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { RePrintComponent } from "./reprintsummary/reprintsummary.component";
import { FamilyMemberComponent } from "./familymember/familymember.components";
import { ReportComponent } from "./report/report.component";
import { CompanyRegistrationComponent } from "./company-registration/company-registration.component";
import { SearchEmployeeComponent } from "./search-employee/search-employee.component";
import { PrintComponent } from "./printsummary/print.component";
import { ErrorComponent } from "./error/error.component";
import { PaymentSuccessComponent } from "./paymentsuccess/paymentsuccess.component";
import { SubmitSuccessComponent } from "./company-registration/submitsuccess.component";
import { KnetErrorComponent } from './knet-error/knet-error.component';
import { ServiceCenterComponent } from './service-center/service-center.component';

const routes: Routes = [
   {
    path: '',
    component: DashboardComponent,
    pathMatch:'full',
    data: {
      title: 'Dashboard'
    }
  }, {
    path: 'reprint',
    component: RePrintComponent,
      data: {
      title: 'Reprint'
    }
  },
  {
  path: 'familymember',
  component: FamilyMemberComponent,
    data: {
      title: 'Family Member'
    }
  },
  {
  path: 'report',
  component: ReportComponent,
    data: {
      title: 'Report'
    }
  },
  {path: 'companyReg', component:CompanyRegistrationComponent , data:{title: 'Company Registration'}},
  {path: 'searchEmp', component: SearchEmployeeComponent,data:{title: 'Search Employee'}}
  ,
  {
    path: 'print',
    component: PrintComponent,
    data: {
      title: 'print'
    }
  },
      {
        path: 'error',
        component: ErrorComponent,
        data: {
          title: 'Error'
        }
      },
      {
        path: 'paymentsuccess',
        component: PaymentSuccessComponent,
        data: {
          title: 'paymentsuccess'
        }
       }
      ,
       {
         path: 'submitsuccess',
         component: SubmitSuccessComponent,
         data: {
           title: 'submitsuccess'
         }
       },
       {
         path: 'knetError',
         component: KnetErrorComponent,
         data: {
          title: 'Error'
        }
       },
       {
        path: 'serviceCenter',
        component: ServiceCenterComponent,
        data: {
         title: 'Service Center'
       }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
