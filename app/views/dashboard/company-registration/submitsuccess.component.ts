import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../common-services/util-services';
import { SearchService } from '../../../services/search.service';
import { PrintService } from "../../../services/report.service";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-submitsuccess',
  templateUrl: './submitsuccess.component.html',
  styleUrls: ['./submitsuccess.component.scss']
})
export class SubmitSuccessComponent implements OnInit {

 loginusername: string ="";
 loginpassword: string ="";

  constructor(private utilService: UtilService,private translate: TranslateService, private printService:PrintService,private router: Router, private activatedRoute: ActivatedRoute) { 
   this.loginusername=localStorage.getItem('loginusername');
    this.loginpassword=localStorage.getItem('loginpassword');
    translate.setDefaultLang('en'); 
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
   
  }


  
} 
