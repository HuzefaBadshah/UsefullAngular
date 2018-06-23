import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpService } from "../common-services/http-service";
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../common-services/app-constant';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RegisterService { 


  individualShouldUpdate: boolean = false;

  constructor(private httpService: HttpService, private http: Http,
  private configuration:Configuration) { }
//Service to register individual person
  register(data){
   return this.httpService.putLogin('c')
    
  } 


  validateOtp(data){
    return this.httpService.putLogin(this.configuration.API_ValidateOTP);   
  } 
 
 
  companyRegistration(data): Observable<any>{
    return this.httpService.postAfterLogin(this.configuration.API_Company_Create, data); 
   }



 
}//class Ends//

