import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { OperationDto }    from  'app/dto/OperationDto';
import { Observable } from 'rxjs/Observable'
/*import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do'*/
import {AuthenticationService} from 'app/services/authentication.service';
import {AuthHttp } from './AuthHttp';


@Injectable()
export class OperationService {
    constructor(private http :AuthHttp, private autService :AuthenticationService) { }


    delete(id: string) :Observable<any>{
		//let url:string=`/operation/deleteDailyMvt/`+id;
		 let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('numTrans', id);
//urlSearchParams.append('password', password);
let body = urlSearchParams.toString()
		 let params = new URLSearchParams(window.location.search);
  let someParam = params.set('numTrans',id);
			let url:string=`/operation/deleteDailyMvtOper?numTrans=`+id;
			// return this.http.post(url,body).map(this.extractData);
         return this.http.get(url); // ...and calling .json() on the response to return data
  //return this.http.post(`/account/accountDetail`,{numCompte:numAc}).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
  
		
       
    }
	//Observable<any>
	public getAllOperation(): Observable<Response> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/operation/listTodayDailyWithSus`);
	
	
  }
  
  public valideAllOperation(): Observable<any> {
	
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/operation/allDailyMvtValide`);
	
	
  }
  
  
  
  public getAllPassedOperation(): Observable<any> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/operation/listTodayAllDailyOpJeson`);
	
	
  }
  
  
  
  public getAllPassedOperationByDate(fromDt1:any,todat:any): Observable<any> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	
	     let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	     return this.http.post('/operation/listTodayAllDailyOpByDate' , JSON.stringify({from: fromDt1, to: todat }),{headers: header});
         
	 
	 // return this.http.get(`/operation/listTodayAllDailyOpJeson`, JSON.stringify({userLogin: username, password: password });
	
	
  }
  
  
   public getAllArchivedOperation(): Observable<any> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/operation/listArchiveDailyOpJeson`);
	
	
  }
  
  archive(){
	  return this.http.get(`/operation/archive`);
  }
  
  
   private extractData(res:Response) {
		 
    let body = res.json();
    return body || [];
}
  

  
}