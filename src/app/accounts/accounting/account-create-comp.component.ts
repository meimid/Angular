import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'
//import 'rxjs/Rx';
/*import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';*/
import { Account } from './account';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Headers } from '@angular/http';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { CanActivate } from '@angular/router';

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
//import {HttpService } from 'app/services/index';
import {Config}   from 'app/services/index';
//import {ToasterService,ToasterConfig} from 'angular2-toaster/angular2-toaster';

import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-account-create-comp',
  templateUrl: './account-create-comp.component.html',
  styleUrls: ['./account-create-comp.component.scss']
})

export class AccountCreateCompComponent implements OnInit {
	 public form =null;
	// public form =FormGroup
	 public http:AuthHttp;
		messageSave :string;
	disableAccount :boolean =false;
	 isValid:boolean =false;
	 //public header:Header;
	 public account:Account;
    // public static PATH:string = 'http://localhost:8080/creditAJS/account/saveAccount'; 
	  public static PATH:string = '/account/saveAccount';
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
	 
	 accountList=[];
	 submitBtnDisaple:boolean=false;
	 
  constructor(private fb: FormBuilder, http: AuthHttp,private translate: TranslateService,private router: Router, private snackBar: MatSnackBar) {
	  this.http=http;
	 
	  
	
  }
  currentPrd={
numAccount:'',
  libelle:'',
  type:'',
  dateCreation:'',
   tel:'',
    adresse:''
	  
  }
  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      numCompte:'',
      numPersonne:'',
	  adresse:'',
      tel:'',
	  type:'',
      message:''
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	this.accountList=[];
	
  }
  
  onSubmit(form: any): void {  
    console.log('you submitted value:', form); 
	
	//console.log(this.vm);
  }
  
  
 fullUpdate() {
    this.form.patchValue({libelle: 'Partial', password: 'monkey'});
}
  reset() {
    this.form.reset();
}



showSnackBar(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, 'OK', config);
    }
	
	
	showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
    }
	
redirect() {
    this.router.navigate(['./Accounts/listAccount']);
  }

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public deleteId: string;

    public temp: boolean[] = [true, false];

isActive:boolean=false;
  
    doSaveAccount() {
		if(!this.submitBtnDisaple) {
		this.submitBtnDisaple=true;
		let formData = this.form.value;
       let header = new Headers();
	   header.append('Content-Type', 'application/json');
	   let numcopt=formData['numCompte'];
	   if(numcopt !='' &&  numcopt.length>0){
		   if(numcopt.length<6){
			   while(numcopt.length<6){
				   numcopt+='0';
		   }
		   formData['numCompte']=numcopt;
		   this.form.patchValue({numCompte: numcopt}); 
	   }
	   }
	   
	   
	   this.http.post(AccountCreateCompComponent.PATH, formData).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
			
this.accountList.push({numAccount:data['numCompte'], libelle:data['libelle'], type:data['type'], tel:data['tel'], adresse:data['adresse'] });
	
				
				//this.accountList.push(this.currentPrd);	
                	
				this.form.reset();
				this.form.patchValue({numCompte:''});
				this.showSnackBarWith(this.messageSave);
				//this.account=data;
			}
			else {
	         
		      this.showSnackBarT(data['message'],'sb-error');
			  
		     //let mess: string= this.account.message as string;
		     //this.show_message("mess");
		      //alert(''+mess);
		     //this._service.success('bla', mess);
			}
          this.submitBtnDisaple=false;
        }
		,err => {this.submitBtnDisaple=false;alert('erreur los call from angular '+err)}// complete
    );
	   
		
		
		
		
		}
		
       
   
   
	
	
	
	
	
  }
  
  
  showSnackBarT = function(message: string, type : string){
    this.snackBar.open(message,null,{
      duration : '2000',
      extraClasses : [type]
    })
  }
  
  onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }
	 
  
  
  

  
}