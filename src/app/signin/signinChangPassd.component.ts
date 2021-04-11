import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { CustomValidators } from 'ng2-validation';

import {Config}   from 'app/services/index';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {AuthHttp } from 'app/services/index';
//import {Md5} from 'ts-md5/dist/md5';
import {md5} from 'app/services/index';
//import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-signinChpassd',
  templateUrl: './signinChangPassd.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninChangPassdComponent implements OnInit {
 model: any = {};
    loading = false;
    error = '';
  public form: FormGroup;
   messageSave:string;
    messagePasswordDiff:string;
   //,private accountSer,
  constructor(private fb: FormBuilder,private http: AuthHttp, private router: Router,private translate: TranslateService,private snackBar: MatSnackBar, private accountSer:AccountService) {
	  
	  
  }

  ngOnInit() {
	  
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
    this.form = this.fb.group ( {
      userLogin: [null , Validators.compose ( [ Validators.required ] )] ,
	  name: '',
	  primaryRole: [null , Validators.compose ( [ Validators.required ] )] ,
	  currentPassword: [null , Validators.compose ( [ Validators.required ] )] ,	  
	  password: [null , Validators.compose ( [ Validators.required ] )],
      newPassword: [null , Validators.compose ( [ Validators.required ] )]
    } );
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	this.messagePasswordDiff=this.translate.instant('passwordDiff'); 
	this.loadUser();
  }
  
 

  onSubmit() {
	  
	  this.loading = true;
	  let formData = this.form.value;
	 var p1= formData.newPassword;
	 var p2= formData.password;	
	  if(p2!=p1){
		  this.showSnackBarWith(this.messagePasswordDiff);
		  return false;
		  
	  }
	
	formData['password']=md5(p2);
	formData['newPassword']=md5(p2);
	formData['currentPassword']=md5(formData.currentPassword);
        this.accountSer.saveNewPassword(formData)
            .subscribe(result => {
				
				  let user = result;
               	if (user && user['message'] =="") {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
					
				this.messageSave
					this.showSnackBarWith(this.messageSave);
					this.redirect();
                }else {
						
							
							this.showSnackBarWith(this.translate.instant(user['message']));
						
					
					
					return false;
				}
					
					// this.router.navigate ( [ '/dashboard' ] );
                    
               
            },err => alert('vlue  '+err));
	  
   
  }
  
  showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
    }
	
	doSaveAccount(){}
	
	loadUser(){
		
		this.accountSer.getCurrentUserent()
            .subscribe(result => {
				
				  let user = result;
               	if (user ) {
					this.form.patchValue({userLogin: user['userLogin']});
				    this.form.patchValue({name: user['name']});
					this.form.patchValue({name: user['name']});
					this.form.patchValue({primaryRole: user['primaryRole']});
                  
                }else {
						
							
							this.showSnackBarWith(this.translate.instant(user['Message']));
						
					
					
					return false;
				}
					
					// this.router.navigate ( [ '/dashboard' ] );
                    
               
            },err => alert('vlue  '+err));
		
		
	}
	
	redirect() {
    this.router.navigate(['./']);
  }

}
