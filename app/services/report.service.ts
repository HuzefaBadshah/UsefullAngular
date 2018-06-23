import { Injectable } from '@angular/core';

import { Configuration } from "../common-services/app-constant";
import { HttpService } from "../common-services/http-service";
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class PrintService {


  constructor(private httpService: HttpService, private configuration:Configuration, private http: Http) { }

    printSummaryById(id:{civilId:number}){  
   return this.httpService.putAfterLogin(this.configuration.API_InsReceipt, id);

            }  

    printPaymentById(id:string){  
    return this.httpService.putAfterLogin(this.configuration.API_InsReceipt, {"knetPaymntId": id.toString()});

  } 
}//class ends//
