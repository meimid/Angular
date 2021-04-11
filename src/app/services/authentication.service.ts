import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
//import { RouterModule } from '@angular/router';
import { Router, CanActivate } from '@angular/router';
import {Config}   from 'app/services/Config';

@Injectable()
export class AuthenticationService {
	public token: string;
	public myROute :Router;
   public  constructor(private http: Http, private router :Router) { 
   this.myROute=router;
	 //  var currentUser = sessionStorage.getItem('currentUser');
       //this.token = currentUser && (currentUser['code']=='ok');
	//  this.logout();
	}

  

	
	
    login(username: string, password: string) {
       // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
	    let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
		//  return this.http.post(Config.url_path+'/signup/sendeNewPass' , JSON.stringify({userLogin: username, password: password }),{headers: header});
		  
	     return this.http.post(Config.url_path+'/welcome/token' , JSON.stringify({userLogin: username, password: password }),{headers: header});
		//return signForNewPass()
         
            
    }
	 
	
    public logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
	
	
	
	 public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    //return tokenNotExpired();
	let user = sessionStorage.getItem('currentUser');
				
                if (user ) {
					return true;
				}
				return false;
  }
  
  
  
  public jwt() {
        // create authorization header with jwt token
        let currentUser = sessionStorage.getItem('currentUser');		
        if (currentUser) 
		{
			let headers = new Headers();
            //headers.append('Content-Type', 'application/json');
			  
			headers.append('Access-Control-Allow-Origin', '*');
			headers.append('Access-Control-Allow-Headers', '*');
			//headers.append('Access-Control-Request-Headers', '*');
			
			//headers.append('Access-Control-Allow-Headers', ',DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
			headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
			//headers.append('Access-Control-Max-Age', '1728000');
			//headers.append('Access-Control-Allow-Credentials', 'true'); 
			//headers.append('Access-Control-Request-Headers', '*');
			headers.append('Authorization',  currentUser);
			headers.append('token',  currentUser);
			headers.append('Content-Type', 'application/json');
			
			let options = new RequestOptions({ headers: headers });
			return options;

              /*let options = new RequestOptions({ headers: headers });
			
			
			let headers = new Headers();
			 headers.set('token', `${currentUser}`);
            return new RequestOptions({ headers: headers });*/
			
        }
		else{
			alert('we did not find token ');
			  this.router.navigate(["apps/login"]);
			return new RequestOptions();
		}
    }
	
	     public getJwt() {
        // create authorization header with jwt token
        //let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));	
		   let currentUser = sessionStorage.getItem('currentUser');		
             return currentUser;
                 }
			
			
	public getValide(type):boolean {
		
		if(type){
			
					 if(type.status =='403'){
						 this.myROute.navigate(["apps/interdit"]);					   
						  return false;
					 }					 
					 if(type.status =='401') {
						 this.router.navigate(["apps/login"]);
					    return false;
						 
					 }					  
				  
			
		}return true;
	
				  }
				  
				  
				  
	   public  signForNewPass(username: string, password: string)  {		   
		  // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
	   	 let header = new Headers();		 
	     header.append('Content-Type', 'application/json');
		 header.append('Access-Control-Allow-Origin', '*');
		//
		let val1 = this.validateEmaille(username);
		 if( val1 == true)
		 {
			  return this.http.post(Config.url_path+'/signup/sendeNewPass' , JSON.stringify({email: username, password: password }),{headers: header});
		 }
		 return this.http.post(Config.url_path+'/signup/sendeNewPass' , JSON.stringify({userLogin: username, password: password }),{headers: header});
		//return signForNewPass()
		
	
	
}


 validateEmaille(emaill) { 

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if (!reg.test(emaill)) return false;
   return true; 
}
				  
		
  
  
  
}