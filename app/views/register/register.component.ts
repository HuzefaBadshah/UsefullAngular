import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RegisterService } from '../../services/register.service';
import { SearchService } from '../../services/search.service';
import { Response } from '@angular/http';
import { Configuration } from '../../common-services/app-constant';
import { HttpService } from '../../common-services/http-service';
import { UtilService } from '../../common-services/util-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  otpForm: FormGroup;
  searchForm:FormGroup;
  showOTP: boolean = false;
  //indDetails: boolean = false;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  public indDeatils = null;
  public showIndDetails:boolean = false;
  
  constructor( private translate: TranslateService,private register: RegisterService,private searchService: SearchService, private configuration:Configuration,
    private httpService: HttpService,private router:Router,private utilService: UtilService,
    private _toastrService: ToastrService) { 
       translate.setDefaultLang('en');
     }
     ngOnInit() {
      this.registerForm = new FormGroup({
        civilID: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        fullName: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
        birthRegNo: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        dob: new FormControl(null, [Validators.required]),
        jobTitle: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
        sponsId: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        phoneNo: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        emailId: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.EMAIL_REGEX)]),
        faxNo: new FormControl('', [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        gender: new FormControl('2', [Validators.required]),
        poBox: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        block: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
        building: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
        street: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)]),
        
        districtcode: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),
        districtName: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.ALPHANUMERIC_REGEX)])
        
      });
      this.otpForm=new FormGroup({
        OTP: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),

      })
      this.searchForm=new FormGroup({
        civilid: new FormControl(null, [Validators.required, Validators.pattern(this.configuration.NUMBER_REGEX)]),

      });

      this.registerForm.get('dob').valueChanges.subscribe((dob)=>{
       // alert(dob);
        var date = new Date();
        var dobVal = new Date(dob);
        var diff = (date.getTime() - dobVal.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        diff = Math.round(diff);
        if (!(diff >= 6575)) {
          this._toastrService.error("Age should be 18 years or above", 'Oops!');
            
        } 
      });
    }
    
    switchLanguage(language: string) { 
      this.translate.use(language);
    }

    onSubmitReg(){
      if(this.registerForm.valid){
      this.register.register('')
      .subscribe(res => {
        this.showOTP = true
        this.test(res);
        this._toastrService.success("Your OTP has been sent to your mail id");
        
      });
    }else{
      this._toastrService.error("You've missed something", 'Oops!');
      this.utilService.validateAllFormFields(this.registerForm);
    }
  }

  test(yy: any): void{ console.log('WHEN SUBMIT', this.registerForm.value);
      let obj = this.registerForm.value;
    this.httpService.putLogin1(this.configuration.API_Register, obj, yy)
    .subscribe(res => {
    })
  }


  onSubmitOtp(){
    this.register.register('')
      .subscribe(res => {
        this.test1(res);
      });
}

onSubmitSearch(){
 
  this.register.register('')
    .subscribe(res => {
     
      
      this.test2(res);

    });
    if(!this.showIndDetails)
    {
    this._toastrService.error("Please enter a valid Civil Id", 'Oops!');
    }

}

test1(yy: any): void{
  // debugger;
  let obj = this.otpForm.value;
  this.httpService.putLogin2(this.configuration.API_ValidateOTP, obj, yy)
  .subscribe((response:any) => {
    if (response.status === 201 ) {
      // debugger;
      localStorage.setItem('loginusername', response.UserName);
      localStorage.setItem('loginpassword', response.Password);
     
    this.router.navigate(['/pages/success']);

    }else{
      //alert('Please enter a valid OTP');
           this._toastrService.error("Please enter a valid OTP", 'Oops!');
    }
  })
}

onCancel(){
  this.router.navigate(['/']);
}

test2(yy: any): void{
 
  let obj = this.searchForm.value;
  this.httpService.putLogin3(`search/Bycivilid`, obj, yy)
  .subscribe((response:any) => {
    console.log('UPDATE INDIVIDUAL', response);
      
      this.registerForm.patchValue({
        civilID:   response.civilID,
        fullName:     response.fullName,
        birthRegNo:   response.birthRegno,
        jobTitle:     response.jobTitle,
        sponsId:      response.sponsId,
        email:        response.email,
        poBox:        response.poBox,
        districtcode: response.districtCode,
        districtName: response.districtName,
        block:        response.block,
        gender:       response.gender,
        dob:          response.dob,
        phoneNo:      response.phoneNo
      });
      this.showIndDetails = true;
   
    
  })

  
}

/*onSubmitSearch(id: number) {
  
 


  this.searchService.searchById({"civilid": +id})
  
    .subscribe((response:any) => {
      
      this.registerForm.patchValue({
        indCivilId:   response.civilID,
        fullName:     response.fullName,
        birthRegNo:   response.birthRegno,269020501000
        jobTitle:     response.jobTitle,
        sponsId:      response.sponsId,
        email:        response.email,
        poBox:        response.poBox,
        districtcode: response.districtCode,
        districtName: response.districtName,
        block:        response.block,
        gender:       response.gender,
        dob:          response.dob
      });
      this.showIndDetails = true;
    });
    
}*/
}
