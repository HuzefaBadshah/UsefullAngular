import { Component } from '@angular/core';
import { PrintService } from "../../../services/report.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'reprintsummary.component.html'
})
export class RePrintComponent {
 public paymentDetails;
  totalAmount:number=0;
  knetPaymntId:number=0;
  showpayementDetails:boolean = false; 

  constructor(private printService:PrintService,private router: Router) { }

   onSearch(id: number) {
    this.printService.printSummaryById({"civilId": +id})
      .subscribe((response) => {
        // debugger;
        console.log('Search Results: ', response);
        this.paymentDetails = response;
        this.totalAmount = this.paymentDetails.insAmount
        this.knetPaymntId = this.paymentDetails.knetPaymntId
        localStorage.setItem("payid",this.paymentDetails.knetPaymntId);
        if(this.totalAmount == null || this.totalAmount == 0)
        {
          this.totalAmount=0;
          this.knetPaymntId=0;
          this.showpayementDetails=true;
        }
        else{
          this.showpayementDetails=true;
        }
        
      });
  }
  onPrint()
  {

      this.router.navigate(['dashboard/print']);
  }


}
