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
//import {AuthHttp } from './AuthHttp';
import {Product } from './product';
import {AuthHttp } from 'app/services/index'

@Injectable()
export class ProductService {
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
	
	
	
	public getAllgoodsGros(): Observable<any> {
	  return this.http.get(`/dist/product/buy-goodsGros`);
  }
	
	public getAllProudct(): Observable<any> {
	  return this.http.get(`/products/listAllProduct`);
  }
  
  public getAllProudctDisp(): Observable<any> {
	  return this.http.get(`/products/listAllProductDispo`);
  }
  	public getAllProudctFact(): Observable<Response> {
	  return this.http.get(`/products/listAllProductDispo`);
  }
  public getAllProudctAng(): Observable<any> {
	  return this.http.get(`/products/listAllProductAngPup`);
	
	
  }
  
  public getlistshortProduct(): Observable<any> {
	  return this.http.get(`/products/listshortProduct`);
	
	
  }
   public saveBordEntSrt(bord: any): Observable<any> {
	  return this.http.post(`/products/saveBordEntSrt`,JSON.stringify(bord)).catch((error:any) => Observable.throw(error.json().erro));
	
	
  }
  
  
  
  public getAllPassedOperation(): Observable<any> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/operation/listTodayAllDailyOpJeson`);
	
	
  }
  
  
   public getAllCategory(): Observable<any> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/products/listAllProductCat`);
	
	
  }
  
   public getAllArchivedOperation(): Observable<any> {
	 
     //return this.http.post(`http://localhost:8080/creditAJS/account/listAllAccounts`,params).map(this.extracteData);
	 
	  return this.http.get(`/operation/listArchiveDailyOpJeson`);
	
	
  }
  
  archive(){
	  return this.http.get(`/operation/archive`);
  }
  
   public validateProduct(numPrd:String) {	 
 
   return  this.http.get(`/products/getProductDetailJson?numProduct=`+numPrd);
}
  
   private extractData(res:Response) {
	let body = res.json().Locations.Location;  	 
   // let body = res;
    return body || [];
}

//: Observable<any[]>
public  gePrdDetail(numPrd:any):Observable<any>  {
	return  this.http.post(`/products/mvtProduct`,numPrd);//.map(this.extractData).catch(this.handleError);//.catch((error:any) => Observable.throw(error.json().erro));;
 }
 
 
  public saveCarton1(carton: any): Observable<any> {
	  return this.http.post(`/products/savCarton`,JSON.stringify(carton)).catch((error:any) => Observable.throw(error.json().erro));
	
  }
    public saveCarton(carton: any): Observable<any> {
	  return this.http.post(`/products/savCarton`,carton);
	
  }
  
   public getAllCartonShortList(): Observable<any> {
	  return this.http.get(`/products/listAllCartonsState`);
	
	
  }
  
   public getAllCarton(): Observable<any> {
	  return this.http.get(`/products/listAllCartons`);
	
	
  }
   public getALlCartonLigt(): Observable<any> {
	  return this.http.get(`/products/listAllCartonsLight`);
	
	
  }
  
    public getAllPrdDto(): Observable<any> {
	  return this.http.get(`/products/listPrdtDot`);
	
	
  }
  
  handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
public removeProduct(idPrd): Observable<Response> {
	  return this.http.get(`/admin/removeProduct?refPrd=`+idPrd);
	
	
  }
   
  
  
}