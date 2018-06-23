import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../common-services/util-services';
import { SearchService } from '../../../services/search.service';
import { PrintService } from "../../../services/report.service";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-error-success',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
public paymentData;
  totalAmount:number=0;
  knetPaymntId:number=0;
  
  constructor(private utilService: UtilService,private translate: TranslateService,private printService:PrintService,private router: Router, private activatedRoute: ActivatedRoute) { 
      this.bindData();
       translate.setDefaultLang('en'); 
  }
  public paymentDetails;
  Nationality: string;
insureeFullName: string;
insPeriod : string;
civilID: string;
insAmount: string;
imageUrl;
paymentid:string;
StartDate;
EndDate;
knetTrackId:any;

  civilId:number=0;
  id: any;
  len:any;
  cDate: any;
  cTime: any;
  currentTime:any;
  currentDate:any;
  newId:any;
  numOfZeros:any;
  fullName:any;
  i:number=0;
  temp:any='';
  transId:any;
  transId1:any;
  refId:any;
  refId1:any;
  result:any;
  authCode:any;
  authCode1:any;
  postDate:any;
switchLanguage(language: string) {
    this.translate.use(language);
  }

bindData(){
  this.activatedRoute.queryParams.subscribe((res)=>{
  

    this.printService.printPaymentById(res.PaymentID)  
    .subscribe((response) => {

      debugger;
      console.log('Search Results: ', res);
   this.printService.printPaymentById(res.PaymentID)  
     .subscribe((response) => {
       debugger;
       console.log('Search Results: ', response);
       //this.paymentData = response;       
       this.totalAmount = response.TransactionReceipt.insAmount;
       this.knetPaymntId = response.TransactionReceipt.knetPaymntId;
       this.fullName=response.TransactionReceipt.customer.fullName;
       
       this.authCode = response.KnetPaymentDetail.authCode;
       if(this.authCode==null || this.authCode==undefined)
       {
        this.authCode1=""

       }
      
       this.postDate = response.KnetPaymentDetail.postDate;
       this.id=response.TransactionReceipt.id;
       this.len=this.getlength(this.id);
       this.numOfZeros=12-this.len;
       this.knetTrackId = response.KnetPaymentDetail.trackId;
       this.transId=response.KnetPaymentDetail.tranId;
       if(this.transId==null || this.transId==undefined)
      {
        this.transId="";

      }
       this.refId=response.KnetPaymentDetail.referenceNo;
      if(this.refId==null || this.refId==undefined)
      {
        this.refId="";

      }
       this.result=response.KnetPaymentDetail.result;
       for(this.i=1;this.i<=this.numOfZeros;this.i++)
       {
         this.newId='0'+this.id;
         this.temp=this.temp+this.newId;
         this.id=this.temp;
         this.temp='';
       }
       
     this.civilId=response.TransactionReceipt.customer.civilID;
     
     
       this.cDate = new Date(); 
       if(this.cDate.getMonth()<=8)
       {
       this.currentDate = this.cDate.getDate() + "/"
               +"0"+ (this.cDate.getMonth()+1)  + "/" 
               + this.cDate.getFullYear();
       
       }
       else{
         this.currentDate = this.cDate.getDate() + "/"
         + (this.cDate.getMonth()+1)  + "/" 
         + this.cDate.getFullYear();
           

       }
       this.currentTime=this.cDate.getHours() + ":"  
       + this.cDate.getMinutes()+ ":" 
       + this.cDate.getSeconds();
     //});
  });
  });
});
  
}

  ngOnInit() {
   
  }

   gotoBack(){
      this.router.navigate(['dashboard/searchEmp']);
    }
    getlength(number) {
      return number.toString().length;
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


  printError(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>:: Print ::</title>
    </head>
    <body style="background:#ffffff" onload="window.print();window.close()">
    <div style="width:600px; background:#fff; margin:20px auto; padding:40px; position:relative">
      
        
        <div style="height:700px; border:1px solid #747675; width:100%; padding:4px;">
        <div style="height:698px; border:1px solid #747675; ">
        
        <table style="border-collapse: separate; font-size:14px; border-spacing: 0.3em; font-family:Arial, Helvetica, sans-serif; color:#555" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tbody>
     
        <tr>
          <td width="20%" valign="top">
              <table  style="border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
                      <th style=" text-align:center; margin-bottom:0px; display:block; font-size:13px">Date</th>
                    </tr>
                    <tr>
                      <td style="border:1px solid #999; padding:5px; text-align:center; margin-bottom:5px; display:block">${this.currentDate}</td>
                    </tr>
    <tr>
                      <th style=" text-align:center; margin-bottom:0px; display:block; font-size:13px">Time</th>
                    </tr>
                    <tr>
                      <td style="border:1px solid #999; padding:5px; text-align:center;  margin-bottom:5px;display:block">${this.currentTime}</td>
                    </tr>
    <tr>
                      <th style=" text-align:center; margin-bottom:0px; display:block; font-size:13px">Sequence Number</th>
                    </tr>
                    <tr>
                      <td style="border:1px solid #999; padding:5px; text-align:center;  margin-bottom:5px;display:block">${this.id}</td>
                    </tr>
                </table>
            </td>
            <td width="55%" style="text-align:center" valign="top">
            
            <table  style="border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" border="0">
                   <tr>
                      <td style="text-align:center; padding:20px 0px 0px 0px; font-size:15px; color:#333"><strong>Ministry of Health</strong></td>
                    </tr>
                    <tr>
                      <td style="text-align:center;  padding:35px 0px; font-size:15px; color:#333"><strong>Unsuccessful Transaction</strong></td>
                    </tr>
                   <tr>
                      <td style=" text-align:right; padding-top:6px; font-size:11px; padding-right:48px" valign="bottom"><strong>Name: ${this.fullName}</strong></td>
                    </tr>
                </table>
           </td>
            <td width="25%" align="right" valign="top">
            
            <table  style="border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
            <td style=" text-align:center; display:block; margin-top:22px; margin-bottom:22px "> <img src="assets/img/moh.png" /></td>
          </tr>
          <tr>
            <td style=" text-align:center; display:block; margin-top:-24px; margin-bottom:10px ">MOH</td>
          </tr>
        
          <tr>
            <td style=" text-align:center; padding-top:13px; font-size:11px;" valign="bottom"><strong>Civil ID:  ${this.civilId}</strong></td>
          </tr>
        </table>
            
           </td>
        
        </tr>
        <table style="font-size:14px; border-spacing: 0.1em;border:1px solid #747675; font-family:Arial, Helvetica, sans-serif; color:#555; margin:0% 0.5%;" width="99%" cellspacing="1" cellpadding="0" border="1">
        <tbody>
        
        <tr>
          
            <td width="100%" style="text-align:center; border:1px solid #747675;" valign="middle">
            <strong>Transaction Details</strong>
            
           </td>
           
        
        </tr>
      
        </tbody>
        
        </table>
        
        
        <table style="font-size:14px; border-spacing: 0.1em;border:1px solid #747675; font-family:Arial, Helvetica, sans-serif; color:#555; margin:0% 0.5%;" width="99%" cellspacing="1" cellpadding="0" border="1">
        <tbody>
        
        <tr style="border:none;">
          <td width="50%" valign="top" style="padding:5px 5px; border:none; text-align:right">
            Status:
          </td>
          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
            ${this.result}
          </td>
        </tr>
        <tr style="border:none;">
          <td width="50%" valign="top" style="padding:5px 5px; border:none; text-align:right">
            Knet Payment Id:
          </td>
          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
           ${this.knetPaymntId}
          </td>
        </tr>
        <tr style="border:none;">
          <td width="50%" valign="top" style="padding:5px 5px;  border:none;text-align:right">
            Reference Id:
          </td>
          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
            
          ${this.refId}
          </td>
        </tr>
        <tr style="border:none;">
          <td width="50%" valign="top" style="padding:5px 5px;border:none; text-align:right">
          Tracking Id:
          </td>
          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
            ${this.knetTrackId}
          </td>
        </tr>
        <tr style="border:none;">
                          <td width="50%" valign="top" style="padding:5px 5px; border:none; text-align:right">
                              Auth Code:
                          </td>
                          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
                          ${this.authCode1}
                          </td>
                        </tr>
                        <tr style="border:none;">
                            <td width="50%" valign="top" style="padding:5px 5px; border:none; text-align:right">
                                Post Date:
                            </td>
                            <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
                                ${this.postDate}
                            </td>
                          </tr>
        <tr style="border:none;">
          <td width="50%" valign="top" style="padding:5px 5px; border:none; text-align:right">
            Amount:
          </td>
          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
            ${this.totalAmount}.00 KD
          </td>
        </tr>
        <tr style="border:none;">
          <td width="50%" valign="top" style="padding:5px 5px; border:none; text-align:right">
            Trans Id:
          </td>
          <td width="50%" style="text-align:left; border:none; padding:5px 5px;" valign="top">
            ${this.transId}
          </td>
        </tr>
        
        
        
        
        
        
        
        </tbody>
        
        </table>
        
        
        
        
        </tbody>
        
        </table>
        </div>
        </div>
    </div>
    </body>
    </html>`
    );
   
    popupWin.document.close(); 
  }

  

}
