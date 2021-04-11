import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService,md5} from 'app/services/index';
//import {Md5} from 'ts-md5/dist/md5';


import {Config}   from 'app/services/index';
import { MatSnackBar,  MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
 model: any = {};
    loading = false;
    error = '';
  public form: FormGroup;
  active=true;
  constructor(private fb: FormBuilder, private router: Router,private translate: TranslateService,private authenticationService:AuthenticationService,private snackBar: MatSnackBar) {
	  sessionStorage.removeItem('currentUser');
	  
  }

  ngOnInit() {
    this.form = this.fb.group ( {
      username: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )],codeAct:'test'
    } );
	sessionStorage.removeItem('currentUser');
	
	   //let urlcode=localStorage.getItem("codeElkarna");
	//if(!urlocal)
		//if(urlcode != null){
		//this.active=true;
		//}

	
  }

  onSubmit() {
	   
	  this.loading = true;
	  let formData = this.form.value;
	  let password = formData.password;
	  let codeAct = formData.codeAct;
	 if('admin' != formData.password)
	 password = md5(formData.password);// 
     	      //     if(!this.active){
		        //     if(codeAct === null || codeAct == ''){
			   //Config.updateURL('test');
		     //}else {
			 //Config.updateURL(codeAct);
		       // }
	           //}
	     this.authenticationService.login(formData.username,password )
            .subscribe(result => {
				
				  let user = result.json();
               	if (user && user['code'] !='ko') {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
					
				sessionStorage.setItem('currentUser', user['value']);
				 if(codeAct!=null && codeAct!='test'){
						 localStorage.setItem("codeElkarna",codeAct);
					 }
				this.router.navigate(['/']);
					return true;
                }else {
						if (user && user['code'] =='ko'){
 
							let messageSave=this.translate.instant('motsPassIncorrect');
							if(user['expire'] =='1'){
								messageSave=this.translate.instant('expireUser');
						  }
							
							this.showSnackBarT(messageSave,'sb-error');
							//this.showSnackBarWith(messageSave);
						}
					
					 //alert('problem');
					
					 
					return false;
				}
					
					// this.router.navigate ( [ '/dashboard' ] );
                    
               
            },err => alert('vlue  '+err))
	  
   
  }
  
  showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change		
        this.snackBar.open(elementText, '', config);
    }
	
	
	showSnackBarT = function(message: string, type : string){
    this.snackBar.open(message,null,{
      duration : '200',
      extraClasses : [type]
    })
  }

  signUP(){
	this.router.navigate(["Accounts/signUp/"]);
	
}

  reseTpass(){
	  let formData = this.form.value;
	   if(formData.username &&   formData.username !=null && formData.username !='')
	  {
        this.loading = true;
	  	this.authenticationService.signForNewPass(formData.username,'').subscribe(result => {
			this.loading = false;
			let messageSave=this.translate.instant('sendEmail');
			this.showSnackBarT(messageSave,'sb-error');
		 },err => alert('vlue  '+err));
	 }
	 else {
		 
		 let messageSave=this.translate.instant('EmailORUSER');
		 this.showSnackBarT(messageSave,'sb-error');
		
	 }
	
	
}
  

}
