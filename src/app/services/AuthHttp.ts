import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request, Connection, ConnectionBackend} from '@angular/http';
import { Observable } from 'rxjs/Observable'
//import * as Rx from 'rxjs';
//
import {Config}   from 'app/services/Config';
import { Router, CanActivate } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


export enum Action { QueryStart, QueryStop };

@Injectable()
export class AuthHttp {
  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();
 public urlPath:string=Config.url_path;

  constructor(private _http: Http,private router :Router,private _snackBar: MatSnackBar) { }

  public _buildAuthHeader(): string {
	  return sessionStorage.getItem('currentUser');
   // return localStorage.getItem("authToken");
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Get, url, null, options);
  }
  
  public getSpecial(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._requestSpecial(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Put, url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Head, url, null, options);
  }
  
  public options(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Options, url, body, options);
  }

  private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
	 // url=this.urlPath+url;
	
    let requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: this.urlPath+url,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
	  requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    }

    requestOptions.headers.set("Authorization", this._buildAuthHeader())
	requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    return Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      this._http.request(new Request(requestOptions))
        .map( (res: Response)=> {
			
			
			 var myHeader:Headers=res.headers;
			
			//var headers=res.headers.values();
			
			var currentvalu:string=myHeader.get('currentUser');
			
			
			
			
			if(currentvalu){
				sessionStorage.setItem('currentUser',currentvalu);
			}
			
			
			//res.json
			let body = res.json();
			 
	        return body || [];
			
			})
        /*.finally(() => {
			
        this.process.next(Action.QueryStop);
      })*/
        .subscribe(
        (res) => {	
       
          observer.next(res);
          observer.complete();
        },
        (err) => {
			
          switch (err.status) {
            case 401:
              //intercept 401
			 
			  this.router.navigate(["Accounts/login"]);
              this.authFailed.next(err);
              observer.error(err);
              break;
			 case  403:
              //intercept 401
			  this.router.navigate(["Accounts/interdit"]);
              this.authFailed.next(err);
              observer.error(err);
              break;
			  case 0:
              //intercept 401
			 
			  this.router.navigate(["Accounts/login"]);
              this.authFailed.next(err);
              observer.error(err);
              break;
			   
             default:			
              observer.error(err);
			  this.router.navigate(["Accounts/login"]);
              break;
          }
        })
    })
  }
  
  
  
  
  public isAuthentified():boolean {		
		let currentUser = sessionStorage.getItem('currentUser');		
        if (currentUser) 
		{return true;}
	else{
		 //this.myROute.navigateByUrl("apps/interdit");
		//this.myROute.navigate(["apps/interdit"]);
		 return false;
		
	}
	}
  
    private _requestSpecial(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
	 // url=this.urlPath+url;
    let requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: this.urlPath+url,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.set("Authorization", this._buildAuthHeader())
	  

    return Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      this._http.request(new Request(requestOptions))
        .map( (res: Response)=> {
			var headers =res.headers.values();
			var currentvalu=headers[1][1];
			//alert('currentvalu '+currentvalu);
			
			//sessionStorage.setItem('currentUser',currentvalu);
			
			//res.json()
			let body = res.json();
	        return body || [];
			})
        /*.finally(() => {
			
        this.process.next(Action.QueryStop);
      })*/
        .subscribe(
        (res) => {			
          observer.next(res);
          observer.complete();
        },
        (err) => {
			
          switch (err.status) {
            case 401:
              //intercept 401
			  this.router.navigate(["Accounts/login"]);
              this.authFailed.next(err);
              observer.error(err);
              break;
			 case  403:
              //intercept 401
			  this.router.navigate(["Accounts/interdit"]);
              this.authFailed.next(err);
              observer.error(err);
              break;
            default:
              observer.error(err);
              break;
          }
        })
    })
  }
  
  
  
  
}