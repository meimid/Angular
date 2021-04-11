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
import {Product } from './product';

@Injectable()
export class FactureService {
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
	
	
	 public saveProduct(product: Product): Observable<any[]>  {
	   return this.http.post(`/products/saveProduct`,JSON.stringify(product)).catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data

	
	 // return this._authHttp.get(`/account/listAllAccounts`).map(this.extractData);
  }
	
	
	
	
	
	public getAllFacture(): Observable<any> {
	  return this.http.get(`/facture/listAllFactureNoDate`);
	
	
  }
  public getAllFactureFourn(): Observable<any> {
	  return this.http.get(`/facture/listAllFactureFourn`);
	
	
  }
  
  
   public getAllBordMiseEncarton(): Observable<any> {
	  return this.http.get(`/facture/listAllBordMiseEncart`);
	
	
  }
  
  
  public getAllNlivredFacture(): Observable<any> {
	  return this.http.get(`/facture/listAllNonLivred`);
	
	
  }
  
  public getAllNlivredProductByNumFact(numFact:String): Observable<any> {
	  return this.http.get(`/bordeau/listProductForBord?numFacture=`+numFact);
	
	
  }
  
  
  
   public getAllFactureByDate(fromDt1:any,todat:any,clientNom:any): Observable<any> {
	 
   
	     let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	     return this.http.post('/facture/listAllFacture' , JSON.stringify({from: fromDt1, to: todat,nomClient: clientNom }),{headers: header});
         
	
	
  }
   public getAllFactureByDateVal(numPrd:any): Observable<any> {
	 
   
	     let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
		// let val={from: fromDt1,to: todat,nomClient: clientNom};
	    //return this.http.post('/facture/listAllFacture' , JSON.stringify({from: fromDt1, to: todat,nomClient: clientNom }),{headers: header});
		return this.http.post('/facture/listAllFacture',numPrd);
		//return this.http.post('/facture/listAllFacture' , JSON.stringify({from: fromDt1, to: todat,nomClient: clientNom }));
		//return this.http.post('/facture/listAllFacture' ,val,{headers: header});
		 // return this.http.post('/facture/listAllFacture' ,val);
         
	
	
  }
  
  
   public getAllGroupFactureByDate(fromDt1:any,todat:any,clientNom:any): Observable<any> {
	 
   
	     let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	     return this.http.post('/facture/groupAllFacture' , JSON.stringify({from: fromDt1, to: todat,nomClient: clientNom }),{headers: header});
         
	
	
  }
  
  public getAllBordeaux(): Observable<any> {
	  return this.http.get(`/bordeau/getAllBord`);
	
	
  }
  
  
  archive(){
	  return this.http.get(`/operation/archive`);
  }
  
   public validateProduct(numPrd:String) {	 
 
   return  this.http.get(`/products/getProductDetailJson?numProduct=`+numPrd);
}
  
   private extractData(res:Response) {
		 
    let body = res.json();
    return body || [];
}


public  geFactureDetail(numFact:any){
	
	 return  this.http.get(`/facture/factureDetailJson?numFacture=`+numFact);
	 }
  public  geFactureFournDetail(numFact:any){
	
	 return  this.http.get(`/facture/factureFournDetailJson?numFacture=`+numFact);
	 }

  
public  getBordDetail(numBord:any){
	
	 return  this.http.get(`/bordeau/getBordDetail?numBord=`+numBord);
	 }
	 
	 public  getBordRecpDetail(numBord:any){
	
	 return  this.http.get(`/facture/bonRecepDetailJson?numBonMiseEnCarton=`+numBord);
	 }
}