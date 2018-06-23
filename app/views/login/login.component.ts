import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../services/login.service';
import { Response, Http, Headers } from '@angular/http';
import { UtilService } from "../../common-services/util-services";
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  //res: any;
  error: boolean = false;
  errorMsg: string = '';
  

  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService, private loginService: LoginService,
  private utilService : UtilService, private http: Http,private _toastrService: ToastrService
    ) { 
       translate.setDefaultLang('en'); 
     }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userType: new FormControl('Individual', [])
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language); 
  } 

   
  onSubmit() {  
    let obj = this.loginForm.value;   
    this.loginService.login(obj.username, obj.password, obj.userType).subscribe(
      (response) => {
        console.log('Type Of Response 2: ',this.utilService.isEmpty(response));
        if(this.utilService.isEmpty(response)){
          this._toastrService.error("Please Enter Correct Username or Password", 'Oops!');
        }
        if (response.code === 200) { 
           let loginDataTest = {
                            expiresIn: response.result.expiresIn,
                            loggedIn: 'true',
                            userType: obj.userType
                        }
          this.utilService.setData(loginDataTest, 'loginDataDetail');
          //set token and get profile
          localStorage.setItem('token', response.result.token);
          console.log('Login Response: ', response);
          this.router.navigate(['dashboard']);
        }    
      },

      (error) => {
        console.log('Login error: ', error);
        this.utilService.logError(error);
        this.errorMsg = error;
        this.error = true;
      },
      () => { console.log('Login Complete'); }   


    );


  }


}//class ends//
