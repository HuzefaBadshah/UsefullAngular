import { Component, OnInit } from '@angular/core';
import { PrintService } from "../../../services/report.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Configuration } from "../../../common-services/app-constant";
import { UtilService } from '../../../common-services/util-services';

@Component({
  templateUrl: 'print.component.html'
})
export class PrintComponent implements OnInit {

  

public paymentDetails;
Nationality: string;
insureeFullName: string;
insPeriod : string;
civilID: string;
insAmount: string;
knetPaymntId: string;
imageUrl:string;
paymentid:string;
StartDate;
EndDate;
   constructor(private printService:PrintService,private router: Router, private configuration :Configuration, private utilService: UtilService) { 
  }
  
    ngOnInit() {

       this.bindData();
    }
    
bindData()
{
   let id = localStorage.getItem("payid"); 
  this.printService.printPaymentById(id)  
      .subscribe((response) => {

        console.log('Search Results: ', response);
        this.paymentDetails = response;   
        let insPeriod = +this.paymentDetails.TransactionReceipt.insPeriod;
        console.log(this.paymentDetails);

      this.Nationality=this.paymentDetails.Nationality;
      this.paymentid = this.paymentDetails.paymentId;
      this.insureeFullName=this.paymentDetails.TransactionReceipt.customer.fullName;
      this.insPeriod = (insPeriod== 1)? `${insPeriod} Year` : `${insPeriod} Years`;
      this.civilID=this.paymentDetails.TransactionReceipt.customer.civilID;
      this.insAmount=this.paymentDetails.TransactionReceipt.insAmount;
      this.knetPaymntId=this.paymentDetails.TransactionReceipt.knetPaymntId;

      this.imageUrl = this.configuration.Server + this.configuration.HomePageUrl+'print/QRcode/' +this.knetPaymntId;

      this.StartDate = this.utilService.convertTimestamp(response.TransactionReceipt.insCoveringStartDate);
      this.EndDate = this.utilService.convertTimestamp(response.TransactionReceipt.insCoveringEndDate);

        localStorage.setItem("payid",this.paymentDetails.TransactionReceipt.knetPaymntId);
      });
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

// {
//   "paymentId" : 2123864282081130,
//   "TransactionReceipt" : {
//     "createdAt" : 1524504479541,
//     "updatedAt" : 1524504479531,
//     "id" : 91,
//     "createdBy" : "admin",
//     "updatedBy" : "admin",
//     "customer" : {
//       "createdAt" : 1524390741000,
//       "updatedAt" : 1524502538054,
//       "id" : 122,
//       "createdBy" : "admin",
//       "updatedBy" : "admin",
//       "user" : {
//         "createdAt" : 1524389665000,
//         "updatedAt" : 1524489620069,
//         "id" : 1,
//         "updatedBy" : "company",
//         "userName" : "admin",
//         "fullName" : "asas",
//         "password" : "$2a$10$9/fZr3xyCw6.XgqwoUa02eNyG47FnoaNZ.E7/XB.T2KdtVafQzoYC",
//         "emailId" : "kamal.kishore@tekmindz.com",
//         "block" : "002",
//         "street" : "asas",
//         "building" : "asas",
//         "districtCode" : 418,
//         "districtName" : "sasa",
//         "passwordChangeRequired" : false,
//         "invalidAttemptCount" : 0,
//         "userRole" : [ {
//           "createdAt" : 1524389677000,
//           "id" : 1,
//           "userMenu" : [ ],
//           "roleName" : "admin",
//           "active" : true
//         } ],
//         "active" : true
//       },
//       "civilID" : 269020501000,
//       "lawSerial" : 19,
//       "lawCode" : "22",
//       "fullName" : "asas",
//       "padeValue" : 150,
//       "coveringEnd" : 1539801000000,
//       "sponsId" : 301000,
//       "bloodGroup" : "ا+",
//       "familiType" : 1,
//       "gender" : "Male",
//       "districtCode" : 418,
//       "districtName" : "sasa",
//       "block" : "002",
//       "dob" : 584755200000,
//       "govCode" : 4,
//       "govName" : "كحاعم افجمراء",
//       "street" : "asas",
//       "building" : "asas",
//       "jobTitle" : "zdfdsf",
//       "poBox" : "2222",
//       "active" : true
//     },
//     "receiptId" : 0,
//     "insureeCivilId" : 269020501000,
//     "insureeFullName" : "asas",
//     "txnSequenceNo" : 0,
//     "insCoveringStartDate" : 1490985000000,
//     "insCoveringEndDate" : 1554057000000,
//     "insPeriod" : 2,
//     "articleNo" : 0,
//     "insAmount" : 101,
//     "knetPaymntId" : "2123864282081130",
//     "pscServiceCharges" : 0,
//     "sponsorId" : 0
//   },
//   "Nationality" : null
// }



