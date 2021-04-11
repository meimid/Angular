import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

//import { Account } from './account';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Headers } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';

import { CanActivate } from '@angular/router';

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
//import {HttpService } from 'app/services/index';
import {Config}   from 'app/services/index';
//import {Md5} from 'ts-md5/dist/md5';

//import {ToasterService,ToasterConfig} from 'angular2-toaster/angular2-toaster';

import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-company-create-comp',
  templateUrl: './company-create-comp.component.html',
  styleUrls: ['./company-create-comp.component.scss']
})

export class CompanyCreateCompComponent implements OnInit {
	 public form =null;
	// public form =FormGroup
	 public http:AuthHttp;
		messageSave :string;
	disableAccount :boolean =false;
	 isValid:boolean =false;
	 //public header:Header;
	 public account:Account;
     public static PATH:string = '/operation/saveCompany';
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
	 
  constructor(private fb: FormBuilder, http: AuthHttp,private translate: TranslateService,private router: Router, private snackBar: MatSnackBar) {
	  this.http=http;
	 
	  
	
  }
  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      adresse:'',
      tel:' ',
	  message:'',
      url:'',
      user:'',
      password:'',
	  numompany:'',
	  email:'',
	  restForm:false,
	  livred:false,
	   tax:0
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 	
	this.getIbfo();
	
	
	
  }
  
  onSubmit(form: any): void {  
  this.doSaveCompany();
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
    this.router.navigate(['./']);
  }

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public deleteId: string;

    public temp: boolean[] = [true, false];

isActive:boolean=false;
  
    doSaveCompany() {
		
		
       let formData = this.form.value;
       let header = new Headers();
	   header.append('Content-Type', 'application/json');
	    let password = formData.password;
	// if('admin' != formData.password)
	  // password = Md5.hashStr(formData.password);
	  
   formData['password']=password;
   
	this.http.post(CompanyCreateCompComponent.PATH, formData).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
				this.showSnackBarT(this.messageSave,'sb-success');				
				this.form.patchValue({libelle: data['libelle']});
				this.form.patchValue({tel: data['tel']});
				this.form.patchValue({adresse: data['adresse']});
				this.form.patchValue({url: data['url']});
				this.form.patchValue({user: data['user']});
				this.form.patchValue({pssword: data['password']});
				this.form.patchValue({livred: data['livred']});
				localStorage.setItem('company',JSON.stringify(data));
				localStorage.setItem('restForm',formData.restForm);
			
			  
			}
			else {
	         
		      this.showSnackBarT(data['message'],'sb-error');
			  
		     //let mess: string= this.account.message as string;
		     //this.show_message("mess");
		      //alert(''+mess);
		     //this._service.success('bla', mess);
			}
          
        }
		//,err => alert('erreur los call from angular '+err)// complete
    );
	
	
	
	
  }
  
   getIbfo = function(){
    this.http.get("/operation/infoComm").subscribe(
        (data) => {
			
			 
			if(data){
				 
				this.form.patchValue({libelle: data['libelle']});
				this.form.patchValue({tel: data['tel']});
				this.form.patchValue({adresse: data['adresse']});
				this.form.patchValue({url: data['url']});
				this.form.patchValue({user: data['user']});
				this.form.patchValue({pssword: data['password']});
				this.form.patchValue({numompany: data['numompany']});
				this.form.patchValue({email: data['email']});
				this.form.patchValue({tax: data['tax']});
				this.form.patchValue({livred: data['livred']});
				let re=localStorage.getItem('restForm');
				
				if(re)
				{
					if(re=='true')
				this.form.patchValue({'restForm': true});
				}			
				localStorage.setItem('company',JSON.stringify(data));
				
				
			}
			
          
        })
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