import { Injectable } from '@angular/core';
import { Configuration } from './app-constant';
import * as _ from "lodash";
import { FormGroup, FormControl } from '@angular/forms';

declare let jQuery: any;
/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 */
@Injectable()
export class UtilService {
    error: boolean = false;
    errorMsg: string = '';
    /**
     * Ask user to confirm an action. `message` explains the action and choices.
     * Returns promise resolving to `true`=confirm or `false`=cancel
     */


    constructor(public configuration: Configuration) {

    }

    confirm(message?: string) {
        return new Promise<boolean>((resolve, reject) =>
            resolve(window.confirm(message || 'Is it OK?')));
    };

   
    getContextURL() {
        let contextUrl = window.location.protocol + '//' + window.location.hostname +
            (window.location.port ? ':' + window.location.port : '');
        return contextUrl;
    }

   

    logError(err: any) {
        console.log(err);
        this.error = true;
        if (err._body) {
            if (typeof err._body === 'string') {
                let error = (err._body);
                this.errorMsg = error.message;
            } else {
                this.errorMsg = err._body.message;
            }
        }
    }

    setData(jsonObj: any, itemObjectName: string) {
        localStorage.setItem(itemObjectName, JSON.stringify(jsonObj));
    }

    getData(itemObjectName: string) {
        let jsonData = JSON.parse(localStorage.getItem(itemObjectName));
        return jsonData;
    }
    
    isEmpty(data){
        return _.isEmpty(data);
    }

    // To validate a form on submit
    validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  convertTimestamp(timeStamp){
    let date = new Date(timeStamp);
    return `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
  }

  convertTimestampDash(timeStamp){
    let date = new Date(timeStamp);
    if(date.getMonth().toString.length < 2){
        var month = '0'+(date.getMonth()+1);
    }
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }
    
}//class ends//





