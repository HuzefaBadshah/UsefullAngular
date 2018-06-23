import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLangService } from '../../services/translate.service';
import { UtilService } from "../../common-services/util-services";
import { ActivatedRoute, Router } from '@angular/router';
import { Configuration } from "../../common-services/app-constant";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
   userType: string = '';
  constructor(private utilService: UtilService,private router:Router,
	private configuration:Configuration, private translate: TranslateService, private translateService: TranslateLangService) {
    this.userType = 'Company';
    
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
   ngOnInit(){
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string, userType: string) {
    this.translateService.translateLang(language, userType);
  } 
logout() {
    //debugger;
    //this.token = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('payid');
    localStorage.removeItem('loginusername');
    localStorage.removeItem('loginpassword');
    localStorage.removeItem('loginDataDetail');
    // localStorage.removeItem('token_expires_at');
    // localStorage.removeItem('token_expire_msg');
    // localStorage.removeItem('token_requested'); //Added
    // localStorage.removeItem('cpassword');
    // localStorage.removeItem('userid');
    // localStorage.removeItem('fullname');
    // TO DO HTTP client clear this.httpclient.headers.delete('X-Auth-Token');
    localStorage.clear();
     this.router.navigate(['/']);
    //this.signOut();
   // return Observable.of(true);

  }
}
