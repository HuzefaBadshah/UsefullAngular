import { Component, OnInit, ElementRef, AfterContentInit, Renderer2, ViewChild } from '@angular/core';
import { UtilService } from '../../../common-services/util-services';
import { SearchService } from '../../../services/search.service';
import { PrintService } from "../../../services/report.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService, ModalComponent } from 'angular-5-popup';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { PaymentService } from '../../../services/payment.service';
import { Configuration } from '../../../common-services/app-constant';

@Component({
  selector: 'app-success',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentSuccessComponent implements OnInit, AfterContentInit {

  @ViewChild("modal") modal: ModalComponent;

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

public paymentData;
  totalAmount:number=0;
  knetPaymntId:any=0;
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
  refId:any;
  result:any;
  knetTrackId:any;
  authCode:any;
  postDate:any;
  PDF_Content: ElementRef;
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };

  
  
  constructor(private utilService: UtilService,private translate: TranslateService, private printService:PrintService,private router: Router, private activatedRoute: ActivatedRoute, private renderer2: Renderer2,  private ms:ModalService,private configuration :Configuration) { 
      
  }



  ngOnInit() { 
    this.bindData();
    this.bindDataForInsurance();
  } 

  ngAfterContentInit(){
    //console.log("Renderer2", this.renderer2.);
  }

bindData(){
     this.activatedRoute.queryParams.subscribe((res)=>{ 
       //debugger;
      // console.log('Search Results: ', res);
    this.printService.printPaymentById(res.PaymentID)  
      .subscribe((response) => {
        //debugger;
       // console.log('Search Results: ', response);
        //this.paymentData = response;       
      this.totalAmount = response.TransactionReceipt.insAmount;
       this.knetPaymntId = response.TransactionReceipt.knetPaymntId;
       this.authCode = response.KnetPaymentDetail.authCode;
       this.postDate = response.KnetPaymentDetail.postDate;
       this.knetPaymntId = response.TransactionReceipt.knetPaymntId;
       this.fullName=response.TransactionReceipt.customer.fullName;
       this.id=response.TransactionReceipt.id;
       this.len=this.getlength(this.id);
       this.numOfZeros=12-this.len;
       this.knetTrackId = response.KnetPaymentDetail.trackId;
       this.transId=response.KnetPaymentDetail.tranId;
       this.refId=response.KnetPaymentDetail.referenceNo;
       this.result=response.KnetPaymentDetail.result;
        this.len=this.getlength(this.id);
        this.numOfZeros=12-this.len;
        
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
}

bindDataForInsurance()
{
   let id = localStorage.getItem("payid");   
   this.activatedRoute.queryParams.subscribe((res)=>{ 
  this.printService.printPaymentById(res.PaymentID)  
      .subscribe((response) => {

        console.log('INSURANCE RECEIPT: ', response);
        this.paymentDetails = response;   
        let insPeriod = +this.paymentDetails.TransactionReceipt.insPeriod;
        let Nationalies = this.paymentDetails.Nationality ? this.paymentDetails.Nationality : 'N/A';
        //console.log(this.paymentDetails);

      this.Nationality =    Nationalies; 
      this.paymentid =      this.paymentDetails.paymentId;
      this.insureeFullName= this.paymentDetails.TransactionReceipt.customer.fullName;
      this.insPeriod =      (insPeriod== 1)? `${insPeriod} Year` : `${insPeriod} Years`;
      this.civilID=         this.paymentDetails.TransactionReceipt.customer.civilID;
      this.insAmount=       this.paymentDetails.TransactionReceipt.insAmount;
      this.knetPaymntId=    this.paymentDetails.TransactionReceipt.knetPaymntId;

      this.imageUrl =       this.configuration.Server + this.configuration.HomePageUrl+`${this.configuration.API_QR_CODE}/` +this.knetPaymntId;

      this.StartDate =      this.utilService.convertTimestamp(response.TransactionReceipt.insCoveringStartDate);
      this.EndDate =        this.utilService.convertTimestamp(response.TransactionReceipt.insCoveringEndDate);

        localStorage.setItem("payid",this.paymentDetails.TransactionReceipt.knetPaymntId);
      });
    });
}
//Function for count digits of id
 getlength(number) {
  return number.toString().length;
}


 print(): void {
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
                      <td style="text-align:center;  padding:35px 0px; font-size:15px; color:#333"><strong>Health Insurance Payment Receipt</strong></td>
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
                              ${this.authCode}
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

  
gotoBack(){
      this.router.navigate(['dashboard/searchEmp']);
    }

onPrint(){
  // localStorage.setItem("payid",this.knetPaymntId);
  // this.router.navigate(['dashboard/print']);

}

printInsurance(): void { 
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
<div id="print-section">
  
  <div style="width:650px; background:#fff; margin:20px auto; position:relative">
      <img src="assets/img/bg1-text.jpg" style="width:650px;"/>
        
        <div style=" position:absolute; top:10px; width:100%;">
        <table style="border-collapse: separate;margin: 0px auto; font-size:14px; border-spacing: 0.8em; font-family:Arial, Helvetica, sans-serif" width="92%" cellspacing="0" cellpadding="0" border="0">
                  <tbody>
                  <tr>
                    <th colspan="2" align="center"><h3  style="text-align:center; margin-bottom:0px; font-size:24px; font-weight:700" >Receipt</h3></th>
                   
                  </tr>
                  <tr>
                    <th colspan="2" align="center"><h3  style="text-align:center; margin-bottom:30px; font-size:20px; font-weight:700" >Registered Medical Insurance</h3></th>
                   
                  </tr>
                  <tr>
                    <th width="50%" align="left">Nationality</th>
                    <th width="50%" align="left">Name</th>
                  </tr>
                  <tr>
                    <td align="left">${this.Nationality}</td>
                    <td align="left">${this.insureeFullName}</td>
                    
                  </tr>
                  <tr>
                    <th align="left">Insurance Period</th>
                    <th align="left">Civil ID</th>
                  </tr>
                  <tr>
                    <td align="left">${this.insPeriod}</td>
                    <td align="left">${this.civilID}</td>
                  </tr>
                  <tr>
                    <th align="left">Amount Paid</th>
                    <th align="left">Covering Start Date</th>
                  </tr>
                  <tr>
                    <td align="left">${this.insAmount}.000 KD</td>
                    <td align="left">${this.StartDate}</td>
                  </tr>
                  <tr>
                    <th align="left">Payment ID</th>
                    <th align="left">Covering End Date</th>
                  </tr>
                  <tr>
                    <td align="left">${this.knetPaymntId}</td>
                    <td align="left">${this.EndDate}</td>
                  </tr>       
                  <tr>
                    <th align="left">Type of Insurance</th>

                    <td align="left"></td>
                  </tr>
                  
                 
                  <tr>
                    <td align="left" style="vertical-align: top">Health Insurance</td>
                    <td align="left"style="height:90px; vertical-align:top;"><img src="${this.imageUrl}" width="100px" height="auto;"></td>
                  </tr>
                  <tr><td colspan="2"><hr style="margin:0px;"></td></tr>
                  <tr>
                    <td style="font-size: 11px;" colspan="2" align="right"><span class=""><strong style="font-size: 14px;">The Health insurance Service is renewed successfully</strong> <br> you can collect your health insurance ID and form any time from tomorrow from Company Service center in Jaberia </span></td>
                  </tr>
                  <tr>
                      <td style="font-size: 11px;" colspan="2" align="right"><span class=""><strong style="font-size: 14px;"> تم تنفيذ الخدمة وتجديد الضمان الصحي بنجاح</strong> <br> 
                        يمكنك الحصول على نموذج و بطاقة الضمان الصحي أي وقت غدا من مركزخدمة الشركات بالجابرية
                         </span></td>
                    </tr>
              
                </tbody></table>
        </div>
        
    </div>
 
</div>
</body>
</html>`
    );
    
    popupWin.document.close(); 
}

// download() {
//   // let html = this.PDF_Content.nativeElement.innerHTML;
//    //console.log("Inner Html", document.getElementById("pdf").innerHTML);

//   // var doc = new jsPDF();
//   // doc.text(20, 20, document.getElementById("pdf").innerHTML);
//   // //doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
//   // doc.addPage();
//   // //doc.text(20, 20, 'Do you like that?');

//   // // Save the PDF
//   // doc.save('Test.pdf');
//   var pdf = new jsPDF('p', 'pt', 'a4');
//   pdf.setFontSize(18);
//   pdf.fromHTML(document.getElementById('pdf'), 
//     this.margins.left, // x coord
//     this.margins.top,
//     {
//       // y coord
//       width: this.margins.width// max width of content on PDF
//     });
    
//   var iframe = document.createElement('iframe');
//   iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
//   document.body.appendChild(iframe);
  
//   iframe.src = pdf.output('datauristring');
//   pdf.save('Test.pdf');
// }

openModal(id){
  this.modal.openModal(id);
}

closeModal(id){
  this.modal.closeModal(id);
}


}//Class Ends//