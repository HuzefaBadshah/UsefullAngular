import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { RegisterService } from '../../../services/register.service';
import { UtilService } from '../../../common-services/util-services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Configuration } from "../../../common-services/app-constant";
import 'rxjs/Rx';
import { TranslateLangService } from '../../../services/translate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
   
 


  companyRegForm: FormGroup;
  SponsorId;
  MandoobId;
  customerDetails;
  showCustDetails:boolean = false;  
  OTP;
  hasOTP: boolean = false;
  responseWithOTP;
  constructor(private searchService: SearchService, private registerService: RegisterService, private utilService: UtilService, private router: Router,
  private _toastrService: ToastrService, private configuration:Configuration, private translateService: TranslateLangService, private translate: TranslateService) { 
   
  } 

  
  ngOnInit() {

    this.translate.setDefaultLang('en');

        this.companyRegForm = new FormGroup({
      companyCivilId: new FormControl(null, [Validators.required,Validators.pattern(this.configuration.NUMBER_REGEX)]),//
      companyName: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),//
      password: new FormControl(null, [Validators.required]),//
      email: new FormControl(null, [Validators.required,Validators.pattern(this.configuration.EMAIL_REGEX)]),//
      aSponsor: new FormArray([new FormControl(null, [])]),
      chamberId: new FormControl(null, [Validators.pattern(this.configuration.NUMBER_REGEX)]),
      loginId: new FormControl(null, [Validators.required]),//
      phoneNo: new FormControl(null, [Validators.required,Validators.pattern(this.configuration.NUMBER_REGEX)]),//
      poBox: new FormControl(null, [Validators.pattern(this.configuration.NUMBER_REGEX)]),
      fax: new FormControl(null, [Validators.pattern(this.configuration.NUMBER_REGEX)]),
      mandoob: new FormArray([new FormControl(null, [])]),
      block: new FormControl(null, [Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
      street : new FormControl(null, [Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
      districtCode: new FormControl(null, [Validators.pattern(this.configuration.NUMBER_REGEX)]),
      districtName: new FormControl(null, [Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
      building: new FormControl(null, [Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
    });

    this.SponsorId = this.companyRegForm.get('aSponsor') as FormArray;
    this.MandoobId = this.companyRegForm.get('mandoob') as FormArray;

    this.translateService.translateObject.subscribe((obj)=>{ //alert(obj.usertype);

      //if(obj.usertype==='servicecenter'){
        this.translate.use(obj.language);
      //}
      
    });

  }// ngOnInit ends.

  onSubmit(){ 
  
    //console.log('ON Submit:', (this.companyRegForm.value.sponsorId));
    (<FormArray>this.companyRegForm.get('sponsorId'));
    if(this.companyRegForm.valid){ 
      this.hasOTP = false;
    this.registerService.companyRegistration(this.companyRegForm.value)
                        .subscribe((response)=>{ 
                         
                            this.hasOTP = false;
                            console.log("RESPONSE: ", response);
                          this.OTP = +response.OTP;
                          if(this.OTP !== null || this.OTP !== '')
                          {
                              this.hasOTP = true;
                              this.responseWithOTP = response;
                              this._toastrService.success("Your OTP has been sent to your mail id");
                         }
                        else
                        {  this.hasOTP = false;
                           this._toastrService.error("You've missed something", 'Oops!');
                        }
                                                 
                      });
    }
    else{
      this._toastrService.error("You've missed something", 'Oops!');
      this.utilService.validateAllFormFields(this.companyRegForm); 
    }
  }

  onAddSponsorID(){  
    (<FormArray>this.companyRegForm.get('aSponsor')).push(new FormControl());
  }

  onAddMandoobID(){
    (<FormArray>this.companyRegForm.get('mandoob')).push(new FormControl());
  }

  onRemoveID(idType: string, i:number){ 
    (<FormArray>this.companyRegForm.get(idType)).removeAt(i); 
  }

  // onSearch(id: number) { 
  //   this.searchService.companySearch({"companyCivilId": +id})   
  //     .subscribe((response:any) => { 

  //       if(response.message=='Successful'){
  //         //this.companyRegForm.get('districtcode').patchValue('1111');
  //         this.companyRegForm.patchValue({
  //           companyCivilId: response.result.companyCivilId,  
  //           companyName: response.result.companyName,
  //           password: response.result.password,  
  //           email: response.result.email,
  //           address: response.result.address,
  //          // sponsorId: new FormArray([new FormControl(null, [Validators.required])]),
  //           chamberId: '1234',
  //           loginId: response.result.loginId,
  //           phoneNo: response.result.phoneNo,
  //           poBox: response.result.poBox,
  //           fax: response.result.fax,
  //          // mandoob_id: new FormArray([new FormControl(null, [Validators.required])]),
  //           block: response.result.block,
  //           street : response.result.street,
  //           districtCode: response.result.districtCode, 
  //           districtName: response.result.districtName, 
  //           building: response.result.building,  
  //         });
  //         this.showCustDetails = true;
          
  //       }else if(response.message=='Data Not Found'){
  //         this.companyRegForm.reset();
  //         this.showCustDetails = true;
  //       }
        
  //     }); 
  // }

  verifyOTP(OTP:number){  
    if(this.OTP=== +OTP){    
      //alert('OTP Veriified.');
      //console.log('Response With OTP: ', this.responseWithOTP);
      this.searchService.whenOptVerified(this.responseWithOTP).subscribe(res=>{
         
          if(res.message==='OTP Verified'){
            console.log('verifyOTP', {password:res.result.password, loginId:res.result.loginId});
            // this.searchService.emitUsernamePass({password:res.result.password, loginId:res.result.loginId});
            // this.loginusername = res.result.loginId;
            // this.loginpassword =res.result.password;
            localStorage.setItem('loginusername',res.result.loginId);
            localStorage.setItem('loginpassword',res.result.password);       
            this.router.navigate(['/dashboard/submitsuccess']);
          }else{
           // alert('Some error occurred while verifying your OTP');
           this._toastrService.error("Some error occurred while verifying your OTP", 'Oops!');
      
          }
      })
    }else{
     // alert('You Entered Incorrect OTP!');   
     this._toastrService.error("You Entered Incorrect OTP!", 'Oops!');
    }
  }
  onCancel(){
    this.router.navigate(['/']);
  }
 
}//class ends... 
