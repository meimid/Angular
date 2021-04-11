import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { CustomValidators } from 'ng2-validation';
import {ActivatedRoute} from "@angular/router";
import {Config}   from 'app/services/index';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
//import {Md5} from 'ts-md5/dist/md5';
import {md5} from 'app/services/index';

@Component({
  selector: 'app-signinNew',
  templateUrl: './signinNew.componentOnline.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninNewComponentOnline implements OnInit {
 model: any = {};
    loading = false;
    error = '';
  public form: FormGroup;
   messageSave:string;
    messagePasswordDiff:string;
	  send:boolean=true;
   //,private accountSer,
   userLogin:string='';
     private sub: any;
  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute, private translate: TranslateService,private snackBar: MatSnackBar, private accountSer:AccountService) {
	   this.sub = this.route.params.subscribe(params => {
    })
	  
  }

  ngOnInit() {
    this.form = this.fb.group ( {
      userLogin: [null , Validators.compose ( [ Validators.required ] )] ,
	  name: [null , Validators.compose ( [ Validators.required ] )] ,
	  email: [null , Validators.compose ( [ Validators.required ] )] ,	  
	  password: [null , Validators.compose ( [ Validators.required ] )],
      created:false ,	
	//  enabled:'1',
	  newPassword: [null , Validators.compose ( [ Validators.required ] )]
    } );
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	this.messagePasswordDiff=this.translate.instant('passwordDiff'); 
	
	
	     
	
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
	  // formData['password']=Md5.hashStr(p2);
	   formData['newPassword']=md5(p2);
	   formData['password']=md5(p2);
	if(this.send){
		this.send=false;
		 this.accountSer.signUpNewUser(formData)
            .subscribe(result => {
				
				  let user = result;
               	if (user && user['message'] =='') {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
					
				this.messageSave
					this.showSnackBarWith(this.messageSave);
					this.router.navigate ( [ 'Accounts/login' ]);
					
                }else {
						
							
							this.showSnackBarWith(user['message']);
						
							this.send=true;
					
					return false;
				}
					
					// this.router.navigate ( [ '/dashboard' ] );
                    this.send=true;
               
            },err => { this.send=true;alert('vlue  '+err)});
		
	}
	
       
	  
   
  }
  
  showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
    }
	
	doSaveAccount(){}
	
	redirect() {
    this.router.navigate(['./']);
  }
  
  loadUser(){
	  this.accountSer.getUserByLogin(this.userLogin).subscribe(result => {
				
				  let user = result;
               	if (user && user['message'] =='') {
						this.form.patchValue({created: user['created']});
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
					
				this.messageSave
					this.form.patchValue({userLogin: user['userLogin']});
					this.form.patchValue({name: user['name']});
					this.form.patchValue({primaryRole: user['role']});
					
                }else {
						
							
							this.showSnackBarWith(user['message']);
						
					
					
					return false;
				}
					
					
               
            },err => { this.send=true;alert('vlue  '+err)});
	  
  }

  
  
  

}