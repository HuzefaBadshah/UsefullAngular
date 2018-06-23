import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Configuration } from './app-constant';
import { ActivatedRoute, Router } from '@angular/router';

// Google's login API namespace
declare var gapi: any;

@Injectable()
export class Authentication {
  token: string;
  data: any;
  constructor( private configuration: Configuration,private router:Router) {
    this.token = localStorage.getItem('token');
  }

 
  logout() {
    //this.token = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('uname');
    localStorage.removeItem('token_expires_at');
    localStorage.removeItem('token_expire_msg');
    localStorage.removeItem('token_requested'); //Added
    localStorage.removeItem('cpassword');
    localStorage.removeItem('userid');
    localStorage.removeItem('fullname');
    // TO DO HTTP client clear this.httpclient.headers.delete('X-Auth-Token');
    localStorage.clear();
        //this.signOut();
    return Observable.of(true);

  }

  public signOut(): void {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
  }
}
