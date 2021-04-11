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
  selector: 'app-signinNewExt',
  templateUrl: './signinNewExt.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninNewExtComponent implements OnInit {
 model: any = {};
    loading = false;
    error = '';
  public form: FormGroup;
   messageSave:string;
    messagePasswordDiff:string;
	  send:boolean=true;
   //,private accountSer,
     private sub: any;
	 stateCtrl: FormControl;
	 currentState='';
	 AllAccount= [];
	  accounts =[];
	  currentNumCompte = '';
	  
  reactiveAccounts: any;
  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute, private translate: TranslateService,private snackBar: MatSnackBar, private accountSer:AccountService) {
	  
	  this.stateCtrl = new FormControl({numAccount: '', libelle: ''});
	  
  }

  ngOnInit() {
    this.form = this.fb.group ( {
      userLogin: [null , Validators.compose ( [ Validators.required ] )] ,
	  name: [null , Validators.compose ( [ Validators.required ] )] ,
	  primaryRole: [null , Validators.compose ( [ Validators.required ] )] ,	  
	  password: [null , Validators.compose ( [ Validators.required ] )],
      created:false ,	
	//  enabled:'1',
	  newPassword: [null , Validators.compose ( [ Validators.required ] )]
    } );
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	this.messagePasswordDiff=this.translate.instant('passwordDiff'); 
	
	this.accountSer.getAccountLight().subscribe(data => {		 
		 this.accounts=data;
		 });
		 
		this.reactiveAccounts = this.stateCtrl.valueChanges
      .startWith(this.stateCtrl.value)
	  .debounceTime(400)
      .map(val => this.displayFn(val))
      .map(libelle => this.filterAccount(libelle));
	    this.currentNumCompte='';
	     
	
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
		 this.accountSer.saveNewUser(formData)
            .subscribe(result => {
				
				  let user = result;
               	if (user && user['message'] =='') {
          			this.showSnackBarWith(this.messageSave);
					this.form.patchValue({created: user['created']});
					
                }else {
						
							
							this.showSnackBarWith(user['message']);
						
					
					
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
	
	doSaveAccount(){
		
		
		
	}
	
	redirect() {
    this.router.navigate(['./']);
  }
  
  displayFn(value: any): string {
	  this.currentNumCompte=value['numAccount'];
	 
    return value && typeof value === 'object' ? value.libelle : value;
  }

   
  filterAccount(val: string) {
    return val ? this.accounts.filter((s) => s.libelle.match(new RegExp(val, 'gi'))) : this.accounts;
  }
createUser(){
	
	let val={numCompte:this.currentNumCompte};
	this.accountSer.ceateOnlineAccount(val).subscribe((result) => {
             let user = result;
               	if (user && user['message'] =='') {
                   	this.showSnackBarWith(this.messageSave);
					this.form.patchValue({created: user['created']});
					
                }else {
						
							
							this.showSnackBarWith(user['message']);
						
					
					
					return false;
				}		
		  
		   
		  });
	
	
}
}
