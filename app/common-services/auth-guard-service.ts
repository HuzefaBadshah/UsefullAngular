import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Configuration } from './app-constant';
import 'rxjs/add/operator/filter';
import { UtilService } from './util-services';
import { Authentication } from './authentication';

@Injectable()
export class AuthGuard implements CanActivateChild {
  currentStat: any;
  baseUrl: string;
  constructor(private configuration: Configuration,private auth: Authentication, private router: Router, private location: Location, private utilService: UtilService
  ) {

    let getContextUrl = window.location.protocol + '//' + window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
    this.baseUrl = getContextUrl;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // debugger;
    let url = '/dashboard/' + route.routeConfig.path.split('/:')[0];
    return this.checkLogin(url);
  }

  checkLogin(currentStat: any): boolean {
    // debugger;
    let restrictedPageForAdmin: string[] = this.configuration.restrictedPageForAdmin;

    let restrictedPageForCompany: string[] = this.configuration.restrictedPageForCompany;
    let restrictedPageForMOI: string[] = this.configuration.restrictedPageForMOI;
    let restrictedPageForSC: string[] = this.configuration.restrictedPageForSC;
    let restrictedPageForUser: string[] = this.configuration.restrictedPageForUser;
    let resPage: boolean;

    let currentPath = currentStat.split(';')[0];
    
    //only for test role
    //    public ADMIN_ROLE_ID: string = '5';
    // public MOI_ROLE_ID: string = '4';
    // public Company_ROLE_ID: string = '3';
    // public SC_ROLE_ID: string = '2';
    // public USER_ROLE_ID: string = '1';
     let loginDataTest = {
        
          roleId: 1
      }
      this.utilService.setData(loginDataTest, 'loginDataDetail');

     if (this.utilService.getData('loginDataDetail') !== null) {
       if (this.utilService.getData('loginDataDetail').roleId.toString()) {
         switch (this.utilService.getData('loginDataDetail').roleId.toString()) {
           case this.configuration.ADMIN_ROLE_ID:
             //  alert('restrictedPageForAdmin---'+restrictedPageForAdmin);
             resPage = restrictedPageForAdmin.indexOf(currentPath) === -1;
             break;
           case this.configuration.MOI_ROLE_ID:
             // alert('restrictedPageForSuperAdmin---'+restrictedPageForSuperAdmin);
             resPage = restrictedPageForMOI.indexOf(currentPath) === -1;
             break;
           case this.configuration.Company_ROLE_ID:
             // alert('restrictedPageForSuperAdmin---'+restrictedPageForSuperAdmin);
             resPage = restrictedPageForCompany.indexOf(currentPath) === -1;
            break;
           case this.configuration.SC_ROLE_ID:
            //  alert('restrictedPageForBroker---'+restrictedPageForBroker);
             resPage = restrictedPageForSC.indexOf(currentPath) === -1;
             break;
           case this.configuration.USER_ROLE_ID:
             // alert('restrictedPageForUser---'+restrictedPageForUser);
             resPage = restrictedPageForUser.indexOf(currentPath) === -1;
             break;
           
           default:
             console.log('Selectd Role Not Defined');
         }
       }
     } else { window.location.href = this.baseUrl + this.configuration.HomePageUrl; }

    // alert(localStorage.getItem('role'));
    // alert('resPage---' + resPage);
    if (this.utilService.getData('loginDataDetail').roleId === '' || this.utilService.getData('loginDataDetail').roleId === null || this.utilService.getData('loginDataDetail').roleId === undefined) {
      this.router.navigate(['login']);
    }

    if (resPage && this.utilService.getData('loginDataDetail').roleId) {
      //alert('in');
      this.auth.logout();
      //this.router.navigate(['login']);
      window.location.href = this.baseUrl + this.configuration.HomePageUrl;
      return false;
    } else {
      //  alert('out');
      return true;
    }

    // if (resPage && localStorage.getItem('token')) {
    //   this.router.navigate(['Login']);
    //   return false;
    // } else {
    //   return true;
    // }
  }
}
