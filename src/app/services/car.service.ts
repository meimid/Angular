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
import {Voiture } from './voiture';
import {Marque } from './marque';
import {Model } from './model';
import {Ville } from './ville';
import {Localisation } from './localisation';


import {AuthHttp } from 'app/services/index'

@Injectable()
export class CarService {
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
	
	
	 public saveVoiture(voiture: Voiture): Observable<Response>  {
		  let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return this.http.post(`/voiture/saveVoiture`,JSON.stringify(voiture),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	 public saveMarque(voiture: Marque): Observable<Response>   {
		 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return  this.http.post(`/voiture/saveMarque`,JSON.stringify(voiture),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	public saveModel(voiture: Model):Observable<Response>   {
	   
	    let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return this.http.post(`/voiture/saveModel`,JSON.stringify(voiture),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	
	public getAllMarque(): Observable<any> {
	  return this.http.get(`/voiture/allMarque`);
  }
  
  public getAllModel(): Observable<any> {
	  return this.http.get(`/voiture/allModel`);
  }
  
  
  public getAllVOiture(): Observable<any> {
	  return this.http.get(`/voiture/allVoiyure`);
  }
	
	public  geModelDetail(numPrd:any):Observable<Response>    {
	return  this.http.get(`/voiture/modelDetail?code=`+numPrd);//.map(this.extractData).catch(this.handleError);//.catch((error:any) => Observable.throw(error.json().erro));;
 }
 
 public  geVoitureDetail(numVoi:any):Observable<Response>    {
	return  this.http.get(`/voiture/voitureDetail?numChassi=`+numVoi);//.map(this.extractData).catch(this.handleError);//.catch((error:any) => Observable.throw(error.json().erro));;
 }
	
	
	public getAllModelByMarque(idMarque): Observable<any> {
	  return this.http.get(`/voiture/allModelByMarque?idMarque=`+idMarque);
  }
	
	
	
	
	
	
	 public saveState(state: Ville): Observable<Response>   {
		 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return  this.http.post(`/state/saveState`,JSON.stringify(state),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	
	public saveVille(state: Ville): Observable<Response>   {
		 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return  this.http.post(`/state/saveVille`,JSON.stringify(state),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	
	public getAllState(): Observable<any> {
	  return this.http.get(`/state/allState`);
  }
  
  
  public  geStateDetail(code:any):Observable<Response>    {
	return  this.http.get(`/state/stateDetail?code=`+code);//.map(this.extractData).catch(this.handleError);//.catch((error:any) => Observable.throw(error.json().erro));;
 }
  
  public getAllVille(): Observable<any> {
	  return this.http.get(`/state/allVille`);
  }
  
  
  
  
  public getAlVilleByState(codeState): Observable<any> {
	  return this.http.get(`/state/allStateByVille?codeState=`+codeState);
  }
	
	
	
	
	 public saveLocalisation(local: Localisation): Observable<Response>   {
		 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return  this.http.post(`/state/saveLocalisation`,JSON.stringify(local),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	
	
	public getAllLocalisation(): Observable<any> {
	  return this.http.get(`/state/allLocalisation`);
  }
  
  public  geLocalisationDetail(numVoi:any):Observable<Response>    {
	return  this.http.get(`/state/localisationDetail?idLocalisation=`+numVoi);//.map(this.extractData).catch(this.handleError);//.catch((error:any) => Observable.throw(error.json().erro));;
 }
	
	 public saveEtatComm(local: Localisation): Observable<Response>   {
		 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return  this.http.post(`/state/saveEtatComm`,JSON.stringify(local),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	
	public getAllEtatComm(): Observable<any> {
	  return this.http.get(`/state/allEtatComm`);
  }
	public  geEtatCommDetail(numVoi:any):Observable<Response>    {
	return  this.http.get(`/state/etatCommnDetail?idEtatComercial	=`+numVoi);//.map(this.extractData).catch(this.handleError);//.catch((error:any) => Observable.throw(error.json().erro));;
 }
	
	public getAllVoitureByCriteria(voiture: Voiture): Observable<Response>  {
		  let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return this.http.post(`/voiture/allVoiyureByParam`,JSON.stringify(voiture),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
    }
	
	public getAllFourn(): Observable<any> {
	  return this.http.get(`/state/allFourn`);
  }
	
	public getFraisByComp(local: Localisation): Observable<Response>   {
		 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
	   return  this.http.post(`/state/getFrais`,JSON.stringify(local),{headers: header});//.catch((error:any) => Observable.throw(error.json().erro)); // ...and calling .json() on the response to return data
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
  

  
}