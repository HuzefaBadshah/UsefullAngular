import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Configuration } from "../common-services/app-constant";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class HttpService {
apiUrl: string;
  headers: any;
  requestUrl: string;
  responseData: any;
  options: any;
  baseUrl: any;

  Login_Response: any;


 constructor(private _http: HttpClient, private configuration: Configuration, private http: Http) {
    let myLocation = window.location.href;
    // let contx = myLocation.split('#')[0].split('/')[4];
    // if (contx == null || contx === "")
    //   contx = "";
    // this.CONTEXT_PATH = contx;
  }


  CONTEXT_PATH: string = '';

  putWithoutLogin(url: string, data: any): Observable<any> {
    // debugger;
    let getUrl = this.configuration.ApiUrl + url;
    return this._http.put(getUrl, JSON.stringify(data), { headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .map(this.extractData)
      .catch(this.handleError);
  }

  postLogin(url: string, data: any){
    //for login
    // debugger;
    let getLoginUrl = this.configuration.ApiUrl +this.configuration.API_LOGIN_URL;
     this._http.post(getLoginUrl, JSON.stringify({userName: 'apiuser', password: 'password@1','userType':'apiuser'}), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .map(res=> this.Login_Response=res)
      .catch(this.handleError);

      let getUrl = this.configuration.ApiUrl + url;
    return this._http.post(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', this.Login_Response.result.token) })
      .map(this.extractData)
      .catch(this.handleError);
   }

   putLogin(url: string):Observable<any>{
    //for login
    let getLoginUrl = this.configuration.ApiUrl +this.configuration.API_LOGIN_URL;
    return this._http.post(getLoginUrl, {"username":"admin","password":"password@1","userType":"admin"}, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
     .map(this.extractData)
     .catch(this.handleError);
   }

   putLogin1(url: string, data: any, token: any):Observable<any> {
    let getUrl = this.configuration.ApiUrl + url;
    return this._http.put(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', token.result.token) })
      .map(this.extractData)
      .catch(this.handleError);
   }
   putLogin2(url: string, data: any, token: any):Observable<any> {
    let getUrl = this.configuration.ApiUrl + url;
    return this._http.put(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', token.result.token) })
      .map(this.extractData)
      .catch(this.handleError);
   }

   putLogin3(url: string, data: any, token: any):Observable<any> {
    let getUrl = this.configuration.ApiUrl + url;
    return this._http.post(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', token.result.token) })
      .map(this.extractData)
      .catch(this.handleError);
   }



  postWithoutLogin(url: string, data: any): Observable<any> {
    ////debugger;
    let getUrl = this.configuration.ApiUrl + url;
    return this._http.post(getUrl, JSON.stringify(data), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .map(this.extractData)
      .catch(this.handleError);
  }


putAfterLogin(url: string, data: any): Observable<any> {
      //debugger;
       let getUrl = this.configuration.ApiUrl + url;
    return this._http.put(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', localStorage.getItem('token')) })
      .map(this.extractData)
      .catch(this.handleError);
    //.filter(x => x.result.data.token != '') //Filter Or check the resonse data
    //.delay(2000) //Wait the response for 2 seconds

   }
   

    postAfterLogin(url: string, data: any): Observable<any> {
      //debugger;
       let getUrl = this.configuration.ApiUrl + url;
    return this._http.post(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', localStorage.getItem('token')) })
      .map(this.extractData)
      .catch(this.handleError);
    //.filter(x => x.result.data.token != '') //Filter Or check the resonse data
    //.delay(2000) //Wait the response for 2 seconds

   }
   
   /*postLogin(url: string, data: any){  
    //for login
    let getLoginUrl = this.configuration.ApiUrl +this.configuration.API_LOGIN_URL;
     this._http.post(getLoginUrl, JSON.stringify({userName: 'apiuser', password: 'password@1'}), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .map(res=> this.Login_Response=res)
      .catch(this.handleError);

      let getUrl = this.configuration.ApiUrl + url;
    return this._http.post(getUrl, JSON.stringify(data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-Auth-Token', this.Login_Response.result.token) })
      .map(this.extractData)
      .catch(this.handleError);
   }*/


 private extractData(response: Response) {
    return response;
  }

  private handleError = (error: any) => {
    //this._router.navigate(['/error']);

    // if(Object.keys(error).length > 0 && error.status == 406){
    //   this._toastr.error(error.error.message);
    // }

    return Observable.of([]);
 }

 postFile(url: string, data: any) {
  //this.configuration.ApiUrl + url
  //http://192.168.10.196:8787/mohips/api/customer/fileuplaod
  let postUrl = this.configuration.ApiUrl + url;
  this.headers = new Headers();
  // if (localStorage.getItem('token')) {
  //   this.headers.set('X-Auth-Token', localStorage.getItem('token'));
  // }
  this.headers.set("Accept", "application/json; charset=utf-8");

  return this.http.post(postUrl, data, { 
    headers: this.headers
  })
    .map(this.extractData)
    .catch((error: any) => Observable.throw(error))

}

//  getContextURL() {
//     let getContextUrl = window.location.protocol + '//' + window.location.hostname +
//       (window.location.port ? ':' + window.location.port : '');
//     this.baseUrl = getContextUrl;
//     if (this.configuration.AppMode === 'PROD') {
//       this.apiUrl = getContextUrl + this.configuration.ApiUrl;
//     } else {
//       this.apiUrl = this.configuration.ServerWithApiUrl;
//     }
//   }

//    get(url: string) {
//     let getUrl = this.apiUrl + url;
//     this.createAuthorizationHeader();
//     return this.http.get(getUrl, {
//       headers: this.headers
//     })
//       //.retry(3) //If we were expecting network connectivity issues, we could define a number of times to retry the request.
//       .map(this.extractData)
//       .catch(this.handleError.bind(this));
//     //.filter(x => x.result.data.token != '') //Filter Or check the resonse data
//     //.delay(2000) //Wait the response for 2 seconds
//   }

//    postWithoutLogin(url: string, data: any) {
//       //////debugger;
//       //this.configuration.ServerWithApiUrl
//     let postUrl =  url;
//     this.createTextPlainHeader();
//     return this.http.post(postUrl, data, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
//       //.retry(3) //If we were expecting network connectivity issues, we could define a number of times to retry the request.
//       .map(this.extractData)
//       .catch(this.handleError.bind(this));
//     //.filter(x => x.result.data.token != '') //Filter Or check the resonse data
//     //.delay(2000) //Wait the response for 2 seconds

//    }
//     postAfterLogin(url: string, data: any) {
//     let postUrl = url;
//     this.createAuthorizationHeader();
//     return this.http.post(postUrl, data, {
//       headers: this.headers
//     })
//       //.retry(3) //If we were expecting network connectivity issues, we could define a number of times to retry the request.
//       .map(this.extractData)
//       .catch(this.handleError.bind(this));
//     //.filter(x => x.result.data.token != '') //Filter Or check the resonse data
//     //.delay(2000) //Wait the response for 2 seconds

//   }
 
//   extractData(res: Response) {
//     let body = res.json();
//     return body || {};
//   }

//   handleError(error: any) {
//     console.log(error);
//     let errorMsg: string;
//     if (error._body) {
//       if (typeof error._body === 'string' && error._body.startsWith('{')) {
//         let errorObj = (error._body);
//         errorMsg = errorObj.message;
//       } else {
//         errorMsg = error._body.message;
//       }
//     }
//     if (error.status === 400) {
//       if (error._body) {
//         errorMsg = JSON.parse(error['_body']).message
//         // if (typeof error._body === 'string' && error._body.startsWith('{')) {
//         //   let errorObj = (error._body);
//         //   errorMsg = errorObj.message;
//         // } else {
//         //   errorMsg = error._body.message;
//         // }
//       }
//     }
//     if (error.status === 401) {
//       localStorage.setItem('token_expire_msg', errorMsg);
//      // this.logout();
//     }
//     return Observable.throw(error);
//   }

//   createTextPlainHeader() {
//     this.headers = new Headers();
//     this.headers.set('Content-Type', 'application/json');
//   }

//   createAuthorizationHeader() {
//     ////debugger;
//       console.log('token' + localStorage.getItem('token'));
//      this.headers.set('Content-Type', 'application/json');
//     // this.refreshTokenIfRequired();
//      if (localStorage.getItem('token')) {
//        this.headers.set('x-auth-token', localStorage.getItem('token'));
//     //   if(this.utilService.getData('loginDataDetail').loginId.toString()!== localStorage.getItem('loginId')){
//     //     this.logout();
//       }
//       this.headers.set('id',"");
//     //  this.headers.set('rid',this.utilService.getData('loginDataDetail').roleId);
//     //   //   console.log(this.headers);
//     // }
//   }


}
