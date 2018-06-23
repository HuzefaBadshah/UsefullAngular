import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { PaymentService } from "../../../services/payment.service";
import { FormControl, Validators,FormGroup  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Configuration } from '../../../common-services/app-constant';
import { LoginService } from '../../../services/login.service';
import { UtilService } from '../../../common-services/util-services';
import { PaymentSuccessComponent } from '../paymentsuccess/paymentsuccess.component';
import { HttpService } from '../../../common-services/http-service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

//import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {
 // @ViewChild('fileUploader') fileUploader;
 searchForm: FormGroup;
 public employeeDetails;
 public paymentDetails;
 public paymentResponse;
 public showEmpDetails:boolean = false;
 fileSelect;
 files = [];
 profileUrl:any;
 uploadedFileURL;
 showImg:boolean = false;
 fetchImgPath:string = `http://192.168.10.200:8787/mohips/api/search/image/`;
 //fetchImgPath:string = `http://his.psc.com.kw/mohips/img-dr`;
 invalidImgType:boolean = false;
 showCalendar:boolean = false;
 imageRequired: boolean = false;
 isImageChosen:boolean = false;
  devices:number[] = [1, 2, 3, 4];
  selectedDevice = null;
  totalAmount:number=0;
  serviceCharges:number=0;
  baseAmount:number=0;
  civilID:number=0;
  CheckBox;
  iAgreeMessage:string;
  workPermitStartDate;
  workParmitEndDate; 
  yearInvalidMessage: boolean = false;
  startDateInvalidMsg: boolean = false;
  forDate:boolean = false;
  forYear: boolean = false;
  forAgree: boolean = false;
  afterEmpUpdate: boolean = false;
  isDisable: boolean = false;
  shouldButtonsDisable: boolean = true;
  EditMode: boolean = false;
  empUpdate: FormGroup;
  Current_Month:number;
  Current_Year:number;
  Current_Day:number
  fileToUpload: File = null;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  isAgreed: FormControl = new FormControl('', [Validators.required]);
  startDate: FormControl = new FormControl('', [Validators.required]);
  Year: FormControl = new FormControl(null, [Validators.required]);

  //header = new Headers('Accept', "application/json; charset=utf-8");
  //"civilId": "269020501000"
   //myParams = new URLSearchParams();
//   afuConfig = {
//     formatsAllowed: ".jpg,.png",
//     maxSize: "5",
//     uploadAPI: {
//       url:`http://192.168.10.196:8787/mohips/api/customer/fileuplaod?${this.civilID}`,
//       headers: //this.other_header.set('Accept', 'application/json; charset=utf-8')
//        {
//         //"Content-Type":  
//         "Accept": "application/json; charset=utf-8",        
//         }        
//     },
//     attachPinText:`${this.civilID}`,
//     hideProgressBar: false,
// };

  constructor(private searchService: SearchService, private paymentService: PaymentService, private _toastrService: ToastrService, private loginService :LoginService, private utilService : UtilService, private httpService: HttpService, private appConstantService: Configuration, private router: Router) { }

  // ngAfterViewInit(){
  //   console.log("Filez: ", this.fileUploader);
  // }

  ngOnInit() {
   
    this.isAgreed.valueChanges.subscribe((value)=>{
      //alert(value);
      if(value === false){
        this.iAgreeMessage = "Please confirm that the given information is correct";
      }else{
        this.iAgreeMessage = '';
      }
    });

    this.Year.valueChanges.subscribe((value)=>{
      //alert(typeof( this.startDate.value));
      if(!this.startDate.value){
        this.startDateInvalidMsg = true;
      }

      if(value !== null){
        this.yearInvalidMessage = false;
      }else{
        this.yearInvalidMessage = true;
      }

      });

    this.startDate.valueChanges.subscribe((value)=>{
      if(value !== ''){
        this.startDateInvalidMsg = false;
      }else{
        this.startDateInvalidMsg = true; 
      }
    })
   
    let d = new Date();
    //d.setMonth(d.getMonth() - 1);
    this.Current_Month = d.getMonth();
    this.Current_Year = d.getFullYear();
    this.Current_Day =  d.getDate();
   // console.log(`Month ${d.getMonth()+1}--- Year ${d.getFullYear()}----- day ${d.getDate()}`);    
    //this.mindate = this.utilService.convertTimestampDash(new Date(d));

    this.empUpdate_form();
    
  }// ngOnInit Ends //


  empUpdate_form(){
    this.empUpdate = new FormGroup({

      sponsorName: new FormControl(null, [Validators.required, Validators.pattern(`^[\u0621-\u064A ]+$`)]),

      empName: new FormControl(null, [Validators.required, Validators.pattern(`^[\u0621-\u064A ]+$`)]),

      phoneNo: new FormControl(null, [Validators.required,Validators.pattern(this.appConstantService.NUMBER_REGEX), Validators.maxLength(10)]),

      email: new FormControl(null, [Validators.required,Validators.pattern(this.appConstantService.EMAIL_REGEX)]),

      sponsorID: new FormControl(null, [Validators.required,Validators.pattern(this.appConstantService.NUMBER_REGEX)]),

      fileUpload: new FormControl('')

    });
  }

  resetFormValidationsAndDisableForm(formGroup: FormGroup): void {
    formGroup.markAsPristine();
    formGroup.markAsUntouched();
    formGroup.updateValueAndValidity();
  }

  onEmpUpdate(){ //269020501000
    
   
    console.log('Emp Update: ', this.empUpdate);
    //alert(this.empUpdate.valid);
    if(!this.isImageChosen){
      this.imageRequired = true;
    }else{
      this.imageRequired = false;
    }
    if(this.empUpdate.valid && this.isImageChosen){

      this.resetFormValidationsAndDisableForm(this.empUpdate);
      this.empUpdate.disable();
      // alert('Valid');
     this.httpService.putWithoutLogin(this.appConstantService.API_Customer_Update, {
      "civilID":  this.civilID,
      "sponsId":  this.empUpdate.get('sponsorID').value,
      "sponsName":this.empUpdate.get('sponsorName').value,
      "phoneNo":  this.empUpdate.get('phoneNo').value,
      "email":    this.empUpdate.get('email').value,
      "fullName": this.empUpdate.get('empName').value
    }).subscribe((response)=>{
      //console.log('Customer Update: ', response);
      
      if(response.message === 'Customer updated successfully'){
        this.afterEmpUpdate = true;
        this.shouldButtonsDisable = false;
        
      }else{
        this.empUpdate.enable();
        // Some Error Toaster .........
      }
     });
    }else {
      this._toastrService.error("You've missed something", 'Oops!');
      this.utilService.validateAllFormFields(this.empUpdate);
      this.empUpdate.enable();
    }


  }// onEmpUpdate Ends //

  onSearch(id: number) { 
    this.empUpdate.enable();
    this.civilID = +id;
    this.loginUser();
    this.searchService.searchById({"civilid": +id})
      .subscribe((response) => {
      
        if(response && !this.utilService.isEmpty(response)){
         // debugger;
         //console.log('When Searched: ', response);
         this.afterEmpUpdate = false;
          this.employeeDetails = response;
          this.showEmpDetails = true;
          this.selectedDevice = null;
          this.baseAmount = 0;
          this.serviceCharges = 0;
          this.totalAmount = 0;
          this.isAgreed.setValue('');
          this.startDate.setValue('');
          this.Year.setValue(null);
          this.yearInvalidMessage = false;
          this.startDateInvalidMsg = false;
          this.civilID?this.shouldButtonsDisable = true:null;
          this.getEmpUpdate_patch(response);
          this.profileUrl = this.fetchImgPath+this.civilID;
          this.empUpdate.get('fileUpload').reset();
          if(response.uploadedFile){
            this.showImg = true;
            this.isImageChosen = true;
          }else{
            this.showImg = false;
            this.isImageChosen = false;
          };
         //debugger;
        }else{
          this._toastrService.error("Please use Civil id as mentioned in work permit");
          this.showEmpDetails = false;
        }
       
      });
  }

  // checkStartDateValidation(component:FormControl){
  //   return new Promise((resolve, reject)=>{
  //     if(component.value == 0){
  //       resolve({"yearIsInvalid": true});
  //     }else{
  //       reject(null);
  //     }
  //   });
  // }
 loginUser(){
  this.loginService.login('admin', 'password@1', 'Company').subscribe(
    (response) => {
     
      if (response.code === 200) { 
         let loginDataTest = {
                          expiresIn: response.result.expiresIn,
                          loggedIn: 'true',
                          userType: 'Company'
                      }
        this.utilService.setData(loginDataTest, 'loginDataDetail');
        //set token and get profile
        localStorage.setItem('token', response.result.token);
      
      
      }});
 }
//  onAmountCalculate(){
//     //console.log(this.searchForm.value);
//     let obj =this.searchForm.value;
//     //debugger;
//     let requestPaymentCalculation={
//           civilid: this.employeeDetails.civilID,
//           workParmitStartDate:this.searchForm.get('startdate').value,
//           workParmitEndDate:this.searchForm.get('enddate').value
//     };

//     //console.log("PAYMENT CALCULATION: ", requestPaymentCalculation);

//     // this.paymentService.amountCalculation(requestPaymentCalculation)
//     //   .subscribe((response) => {
    
//     //     console.log(response)
//     //     if(response.code === 200)
//     //     {
//     //     this.paymentDetails = response;
//     //     this.totalAmount= this.paymentDetails.result.totalAmount;
//     //     this.serviceCharges= this.paymentDetails.result.tax;
//     //     this.baseAmount= this.paymentDetails.result.baseAmount;
//     //     this.civilID = this.paymentDetails.result.customer.civilID
//     //        this.noOfYear = this.paymentDetails.result.noOfYear;
//     //     //console.log('Search Results: ', response);
//     //     //this.employeeDetails = response;
//     //     //this.showEmpDetails = true;
//     //     }
//     //     else{
//     //       this._toastrService.error("Please enter valid Work permit dates","Opps!");
//     //     }

 onPaymentCalculation() { 

    // debugger;
    //this.startdate.value;
    //console.log('SELECTED YEAR: ', this.paymentCalculationForm.get('selectYear').value);
     
  //   console.log('onPaymentCalculation', this.paymentCalculationForm.value);
    this.selectedDevice = this.Year.value;
    let requestPaymentCalculation = {
          civilid: this.employeeDetails.civilID,
          noOfyears: this.Year.value,
          workParmitStartDate: this.startDate.value
    }
   
 
  //  if(this.paymentCalculationForm.valid && +this.paymentCalculationForm.get('selectYear').value !== 0){   
     this.paymentService.amountCalculation(requestPaymentCalculation)
      .subscribe((response) => {
        if(+response.code !== 404){

        // debugger;Password@18
        //console.log('onSelectYear', response);
        //this.paymentDetails = response;
        let civil_id = response.result.customer.civilID ? response.result.customer.civilID : null;

        this.totalAmount         = response.result.totalAmount;
        this.serviceCharges      = response.result.tax;
        this.baseAmount          = response.result.baseAmount;
        this.civilID             = civil_id;
        this.workPermitStartDate = response.result.workPermitStartDate;
        //alert(response.result.workParmitEndDate);
       this.workParmitEndDate   =  response.result.workParmitEndDate;
        
       
      }else{
        //this._toastrService.error(response.message);
      }
      });

      
  //   }else{ console.log('onPaymentCalculation', this.paymentCalculationForm.value);
  //   this.selectedDevice = newValue;
  //   let requestPaymentCalculation = {
  //         civilid: this.employeeDetails.civilID,
  //         noOfyears: +this.paymentCalculationForm.get('selectYear').value,
  //         workParmitStartDate: this.paymentCalculationForm.get('startDate').value
  //   }
   
 
  //  if(this.paymentCalculationForm.valid && +this.paymentCalculationForm.get('selectYear').value !== 0){   
  //    this.paymentService.amountCalculation(requestPaymentCalculation)
  //     .subscribe((response) => {
  //       if(+response.code !== 404){

  //       // debugger;Password@18
  //       console.log('onSelectYear', response);
  //       //this.paymentDetails = response;
  //       let civil_id = response.result.customer.civilID ? response.result.customer.civilID : null;

  //       this.totalAmount         = response.result.totalAmount;
  //       this.serviceCharges      = response.result.tax;
  //       this.baseAmount          = response.result.baseAmount;
  //       this.civilID             = civil_id;
  //       this.noOfYear            = response.result.noOfYear;
  //       this.workPermitStartDate = response.result.workPermitStartDate;
  //       this.workParmitEndDate   = response.result.workParmitEndDate;
  //       //console.log('Search Results: ', response);
  //       //this.employeeDetails = response;
  //       //this.showEmpDetails = true;console.log('workPermitStartDate', this.workPermitStartDate);
    // console.log('noOfYear', this.noOfYear);
  //     }else{
  //       this._toastrService.error(response.message);
  //     }
  //     });

      
  //   }else{
  //      this._toastrService.error("Either Work Permit Start Date OR Selected Year is Invalid");
  //   }
  //      this._toastrService.error("Either Work Permit Start Date OR Selected Year is Invalid");
  //   }
    
    
  }
    onCancel(searchVal){      
      this.showEmpDetails = false;
      this.afterEmpUpdate = false;
      this.empUpdate.enable();
      searchVal.value = null;
      }


      onCancelForPayment(){
        this.Year.setValue(null);
        this.startDate.reset();
        this.totalAmount         = 0;
        this.serviceCharges      = 0;
        this.baseAmount          = 0;
      }

  onPayment() { 
             
    if(this.isAgreed.value == '' || this.isAgreed.value == false){
      this.iAgreeMessage = "Please confirm that the given information is correct";
    }else{
      this.iAgreeMessage = '';
    }

    if(this.startDate.value==''){
      this.startDateInvalidMsg = true;
    }else{
      this.startDateInvalidMsg = false;
    }

      if(this.Year.value==null){
      this.yearInvalidMessage = true;
    }else{
      this.yearInvalidMessage = false;
    }

  if(this.isAgreed.value == true && (this.baseAmount!==0 &&this.serviceCharges!==0&&this.totalAmount!==0)){
    debugger;
   
     this.paymentService.paymentProcess({
       "totalAmount": +this.totalAmount,
       "civilid":this.civilID, 
       "noOfYear":this.Year.value, 
       "workParmitStartDate":this.workPermitStartDate,
       "workParmitEndDate":this.workParmitEndDate
      })
      .subscribe((response) => {
        //console.log('Ashutosh: ', response);
        if(response.status == 500){
          this.router.navigate(['knetError']);
        }
        this.paymentResponse = response;
        window.location.href= this.paymentResponse.paymentURL;
        debugger
      }); 
  }
  else 
  {
    //this._toastrService.error("Invalid data","OOPS!");
  }
   
  }

  getEmpUpdate_patch(response){
    this.empUpdate.patchValue({
      sponsorName: response.sponsName,
      empName: response.fullName,
      phoneNo: response.phoneNo?response.phoneNo:null,
      email: response.email,
      sponsorID: response.sponsId?response.sponsId:null
    });
  }

  // onDateSelection(event){
  //   console.log('onDateSelection: ', event);
  // }

//   handleFileInput(files: FileList) {
//     let fileItem = files.item(0);
//     console.log("file input has changed. The file is", fileItem)
//     this.fileToUpload = fileItem
// }

onImageUpload(event){ //269020501000

    //*************************File Upload Code Starts ***********//
    this.files = event.target.files;
    console.log('this.files[0]: ', (this.files[0]));
    console.log('IS Empty: ', this.utilService.isEmpty(this.files[0]));

    if(!(this.files[0])){
      this.isImageChosen = false;
      this.imageRequired = true;
    }else{
      this.isImageChosen = true;
      this.imageRequired = false;
    }

    let formData = new FormData();
    formData.append("file", this.files[0]);
    formData.append('civilId', `${this.civilID}`)
    this.httpService.postFile('customer/fileuplaod', formData)
     .subscribe(
     (data) => { 
      this.showImg = true;
        //http://192.168.10.200:8787/mohips/api/search/image/269020501000

      if (JSON.parse(data._body).code == 200) {
        this.invalidImgType = false;
       this.profileUrl = this.fetchImgPath+this.civilID;
     }
    },
 
     
        (error: any) => { 
          this.invalidImgType = true;
         },
        () => { console.log('Image Uploaded') }
        );
     //*************************** File Upload Code ends *******************
}

}// Class Ends//
