import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {
	lang:string='fr';
 // private messageSource = new BehaviorSubject<string>("fr");
 //currentMessage = this.messageSource.asObservable();
  constructor() { 
  }
  
  public setLnag(lan:string){
	  this.lang=lan;
  }
  
  public string;getLang(){
	  return this.lang;
  }
}