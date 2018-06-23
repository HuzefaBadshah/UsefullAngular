import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateLangService {
translateObject = new EventEmitter<any>();
  constructor(private translate: TranslateService) { }

  translateLang(language, usertype=null){
    //debugger;
    this.translateObject.emit({language, usertype});
    //debugger;
  } 

}//class ends//
