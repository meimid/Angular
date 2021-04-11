import { BrowserModule } from '@angular/platform-browser';
//import { Http, Response,HttpModule,Headers } from '@angular/http';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { catchError } from 'rxjs/operators/catchError';

import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable'


//import {AuthenticationService} from 'app/services/index';
//import {HttpService } from 'app/services/index';
import {Config}   from 'app/services/index';
import {AuthHttp } from 'app/services/index';

@Injectable()
export class PecheService {	

 public myROute :Router;
     //private http:HttpService,
 public constructor(  private router :Router,private _authHttp: AuthHttp) { 
 this.myROute=router;
 }

 
 
 public getAllEspece() {	 
	  return this._authHttp.get(`/operation/allEspece`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
 
  
  
  

//public saveNewUser(numAc:any): Observable<any[]>  {
 public saveNewEspece(numAc:any)  {
	 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
		//  return this.http.post(Config.url_path+'/signup/sendeNewPass' , JSON.stringify({userLogin: username, password: password }),{headers: header});
		  
	     //return this.http.post(Config.url_path+'/welcome/token' , JSON.stringify({userLogin: username, password: password }),{headers: header});
	   return this._authHttp.post(`/operation/saveEspece`,numAc);
       
	   
	  // catch((error:any) => Observable.throw(error.json().erro));
	   //.and calling .json() on the response to return data

	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
	 
	 
				 
      
}
