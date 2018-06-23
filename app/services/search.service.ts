import { Injectable, EventEmitter } from '@angular/core';

import { Configuration } from "../common-services/app-constant";
import { HttpService } from "../common-services/http-service";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
    
@Injectable()  
export class SearchService {  

emitUserNamePassword = new Subject;
  constructor(private httpService: HttpService, private configuration:Configuration, private http: Http) { }



  searchById(id:{civilid:number}){  
   return this.httpService.postAfterLogin(this.configuration.API_SearchUrl, id);
             }

companySearch(data: {companyCivilId:number}){
    return this.httpService.postAfterLogin(this.configuration.API_Company_Search, data)
}

  whenOptVerified(data): Observable<any>{ 
    return this.httpService.postAfterLogin(this.configuration.API_Company_ValidateOTP, data)
    // return this.http.put('http://localhost:4200/mohips/api/company/validateOTP', data).map(res=> res.json());  
  }

  emitUsernamePass(obj){
    return this.emitUserNamePassword.next(obj);
  }

}//class ends//
