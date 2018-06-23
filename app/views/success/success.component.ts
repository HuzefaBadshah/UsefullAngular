import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilService } from '../../common-services/util-services';
import { SearchService } from '../../services/search.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, OnDestroy {

  loginusername: string ="";
  loginpassword: string ="";
  constructor(private utilService: UtilService,private router:Router,private translate: TranslateService, private searchService:SearchService) { 

    this.loginusername=localStorage.getItem('loginusername');
    this.loginpassword=localStorage.getItem('loginpassword');
    translate.setDefaultLang('en'); 
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    // this.searchService.emitUserNamePassword.subscribe((res:any)=>{
    //   console.log('emitUserNamePassword: ', res);
    //   this.username = res.loginId;
    //   this.password = res.password;
    // });
  }

  ngOnDestroy(){
    //Unsubscribe Here....
  }
  gotoBack(){
     this.router.navigate(['/']);
  }
   print(): void {
    let printContents, popupWin;

    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Your style here.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }


}
