import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Configuration } from "../common-services/app-constant";
import { HttpService } from "../common-services/http-service";

@Injectable()
export class LoginService {
  constructor(private httpService: HttpService, private configuration: Configuration) {
   }

  login(username:string, password: string, userType: string) { 

    console.log('LOGIN Response', JSON.stringify({
      username: username,
      password: password,
      userType : userType
    }));

      return this.httpService.postWithoutLogin(this.configuration.API_LOGIN_URL, {
        username: username,
        password: password,
        userType : userType
    });

    }
  
}
 