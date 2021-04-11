import { BrowserModule } from '@angular/platform-browser';
//import { Http, Response,HttpModule,Headers } from '@angular/http';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { catchError } from 'rxjs/operators/catchError';

import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Account } from './account';
//import {AuthenticationService} from 'app/services/index';
//import {HttpService } from 'app/services/index';
import {Config}   from 'app/services/index';
import {AuthHttp } from 'app/services/index';

@Injectable()
export class AccountService {	

 private accounts: Observable<Array<Account>>;
 public myROute :Router;
     //private http:HttpService,
 public constructor(  private router :Router,private _authHttp: AuthHttp) { 
 this.myROute=router;
 }

 
 
 public getAllAccount() {	 
	  return this._authHttp.get(`/account/listAllAccounts`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  public getAllAccountPupb(): Observable<any> {	 
	  return this._authHttp.get(`operation/listAllAccountPupJson`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  
   public getAccountLight(): Observable<any> {	 
	  return this._authHttp.get(`/account/listAllAccountsLigth`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  
   public getAccountLightForFacture(): Observable<any> {	 
	  return this._authHttp.get(`/account/listAllAccountsFact`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  public getAllAccountDebit() {	 
	  return this._authHttp.get(`/account/listAllAccountDebit?credit=d`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  
  public getAllAccountCredit(): Observable<any> {	 
	  return this._authHttp.get(`/account/listAllAccountDebit?credit=c`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  
  
  public getAllUser(): Observable<any> {	 
	  return this._authHttp.get(`/admin/listAllUser`);	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  
  
  public getAccountDetail(numAc:any) {
  return this._authHttp.post(`/account/accountDetail`,numAc);//.catch((error:any) => Observable.throw(error)); // ...and calling .json() on the response to return data
  
  }
  
   public getAccountDetailFromArchive(numAc:any) {
	//  let urlSearchParams = new URLSearchParams();
	let headers = new Headers();
           
			headers.append('Content-Type', 'application/json');			
			let options = new RequestOptions({ headers: headers });
	 return this._authHttp.post(`/account/accountDetailHisto`,numAc);//.catch((error:any) => Observable.throw(error)); // ...and calling .json() on the response to return data
  }
  
  
   public soldeAccountDetail(numAc:any): Observable<any> {
	   
	       let headers = new Headers();
            headers.append('Access-Control-Allow-Origin', '*');
			headers.append('Access-Control-Allow-Headers', '*');			
			//headers.append('Authorization',  currentUser);
			headers.append('Content-Type', 'application/json');			
			let options = new RequestOptions({ headers: headers });
			let url:string=`/account/soldeCompte?numCompte=`+numAc;
	  
  //return this._authHttp.post(`/account/solde`,numAc,{ headers: headers }).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
   return this._authHttp.get(url).catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
  }
  
	 private extractData(res:Response) {
 	 if(res ){
		
    let body = res.json();
	 return body || [];
	 }
	 else {
		 return res;
	 }
	 
}
//public saveNewUser(numAc:any): Observable<any[]>  {
 public saveNewUser(numAc:any)  {
	   return this._authHttp.post(`/admin/savemodifyUserP`,numAc);
       
	   
	  // catch((error:any) => Observable.throw(error.json().erro));
	   //.and calling .json() on the response to return data

	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  
  // public saveNewPassword(numAc:any): Observable<any[]>  {
   public saveNewPassword(numAc:any)  {
	   return this._authHttp.post(`/account/modifyPass`,numAc); // ...and calling .json() on the response to return data

	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
  //public saveNewPasswordADM(numAc:any): Observable<any[]> 
  public saveNewPasswordADM(numAc:any) {
	   return this._authHttp.post(`/admin/modifyPass`,numAc); // ...and calling .json() on the response to return data

	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
                 
//public getCurrentUserent(): Observable<any[]>  {				 
	public getCurrentUserent()  {
	   return this._authHttp.get(`/operation/currentUser`); // ...and calling .json() on the response to return data

	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }		
//public getUserByLogin(userLogin): Observable<any[]>
public getUserByLogin(userLogin) :Observable<Response> {	 

           
   // return  this._authHttp.get(`/admin/getUser?userLogin=`+userLogin).catchError((error:any) => Observable.throw(error.json().erro));

 return this._authHttp.get(`/admin/getUser?userLogin=`+userLogin);
   // )

}  

public activeDesactiveUser(userLogin:any): Observable<Response> {	 

           
   return  this._authHttp.get(`/admin/AcctiveDesactiveUser?userLogin=`+userLogin);//.catch((error:any) => Observable.throw(error.json().erro));
}

 public validateAccount(numAc:String) {	 
 
   return  this._authHttp.get(`/operation/isAccountValide?numCompte=`+numAc);
}

public ceateOnlineAccount(numAc:any) {
  return this._authHttp.post(`/account/createOnlineAccount`,numAc);//.catch((error:any) => Observable.throw(error)); // ...and calling .json() on the response to return data
  
  }


  public signUpNewUser(numAc:any)  {
	return this._authHttp.post(`/signup/registreNewUser`,numAc);
	
	
   // catch((error:any) => Observable.throw(error.json().erro));
	//.and calling .json() on the response to return data

 
  // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
}
	 
	 
				 
      
}
