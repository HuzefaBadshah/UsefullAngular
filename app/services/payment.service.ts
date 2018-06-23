import { Injectable, EventEmitter } from '@angular/core';
import { Configuration } from "../common-services/app-constant";
import { HttpService } from "../common-services/http-service";

@Injectable()
export class PaymentService {


  constructor(private httpService: HttpService, private configuration:Configuration) { }

  amountCalculation(data:any){
    // debugger;
   return this.httpService.postAfterLogin(this.configuration.API_Payment_CalculationUrl, data);
  }

  paymentProcess(data:any){
    // debugger;
   return this.httpService.postAfterLogin(this.configuration.API_Knet_Payment, data);
  }

  

}//class ends...