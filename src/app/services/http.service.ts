import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import {Config}   from 'app/services/Config';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class HttpService extends Http {
	urlPath:string=Config.url_path;
	
private myROute :Router;
private snackBar: MatSnackBar
  constructor (backend: XHRBackend, options: RequestOptions, router :Router,_snackBar: MatSnackBar) {
   
    super(backend, options);
	let currentUser = sessionStorage.getItem('currentUser');; // your custom token getter function here
    options.headers.set('Authorization', currentUser);
	this.myROute=router;
	 this.snackBar=_snackBar;
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let currentUser = sessionStorage.getItem('currentUser');
	
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = this.jwt();
		url=this.urlPath+url;
		
		      }
      options.headers.set('Authorization',  currentUser);
	  
    } else {
		url.url=this.urlPath+url.url;
		//alert('url is not '+url.url);
    // we have to add the token to the url object
      url.headers.set('Authorization',  currentUser);
    }
	
    return super.request(url, options).catch(this.catchAuthError(this));
  }
  
  
  public jwt() {
        // create authorization header with jwt token
        let currentUser = sessionStorage.getItem('currentUser');		
        if (currentUser) 
		{
			let headers = new Headers();
            headers.append('Access-Control-Allow-Origin', '*');
			headers.append('Access-Control-Allow-Headers', '*');			
			headers.append('Authorization',  currentUser);
			headers.append('Content-Type', 'application/json');			
			let options = new RequestOptions({ headers: headers });
			return options;			
        }
		else{
			  this.myROute.navigate(["/login"]);
			return new RequestOptions();
		}
    }

  private catchAuthError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
		
      //console.log(res);
	  if(res.status ===403){
		              //alert('redrecting vers '+res.status);
		           //this.myROute.navigate(['apps/interdit']);
					// this.router.navigate(["apps/interdit"]);
					// this.router.navigate( [ 'Details', { id: company.id }] );
					//this.router.navigate(["Accounts/login"]);
					  this.myROute.navigate(["Accounts/interdit"]);
					return Observable.throw(res);
					//return ;
				}
				
      if (res.status === 401 ) {
        this.myROute.navigate(['Accounts/login']);
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
  
  public showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
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
	
}