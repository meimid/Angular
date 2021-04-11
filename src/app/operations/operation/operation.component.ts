import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import 'rxjs/add/operator/startWith';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

//import { AccountPupComponent } from 
//import { AccountPupComponent } from 'app/accounts/accounting/auto-account/accountPup.component';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response,RequestOptions,URLSearchParams } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

//import 'rxjs/Rx';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/do';
//import { HttpModule,Headers } from '@angular/http';
import { Account } from 'app/accounts/accounting/account';
//import { ViewContainerRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {AuthenticationService} from 'app/services/index';
import {Config}   from 'app/services/index';
import {AuthHttp } from 'app/services/index';
import { Router, CanActivate } from '@angular/router';
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
//import { DatePickerOptions, DateModel } from 'ng2-datepicker';
//import { DatepickerModule } from 'angular2-material-datepicker'
import { AccountService } from 'app/accounts/accounting/AccountService';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { DataService } from 'app/services/data.service';


@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
 
  public form: FormGroup;
  rows= [];
  count = 0;
  offset = 0;
  limit = 7;
  AllOperation= [];
  private numAc :string;
  momentValue:Date=new Date();
  reset:boolean =false;
  showGreeting: boolean=false;
   AllPersonneFliter:any;
   filteredOptions: Observable<Account[]>;
   submitBtnDisaple:boolean=false;
  constructor(private fb: FormBuilder,private http: AuthHttp,private translate: TranslateService,public snackBar: MatSnackBar,private autService :AuthenticationService,private accountSer:AccountService, private router :Router,dateAdapter:DateAdapter<NativeDateAdapter>,public dtservice:DataService) {
	 
	  dateAdapter.setLocale(dtservice.getLang());
  }
  //constructor(private fb: FormBuilder,private http: Http) {}
  messageSave:string;
  date: string;
  nameCompte:string
  ngOnInit() {
	  if(!this.http.isAuthentified())
	   {this.router.navigate(["Accounts/login"]);
		   
	   }
    this.form = this.fb.group({
      montant: [null, Validators.compose([Validators.required, CustomValidators.number])],
      name: '',
	  numCompte: '',
      dateOperation: ['', Validators.compose([Validators.required, CustomValidators.date])],
      remarque:'',
	  compte:'',
      type: [null, Validators.compose([Validators.required])]
    });
	  this.date = new Date().toISOString().slice(0, 10);
	//  this.date.setValue(new Date().toISOString());
	  this.form.patchValue({dateOperation:this.date});
	
	this.filteredOptions =this.accountSer.getAccountLight();
	  this.filteredOptions.subscribe(data => {		 
		 this.AllPersonneFliter=data;
		 });
	  this.filteredOptions =this.form.valueChanges
        .startWith(null)
		.debounceTime(400)
        .map(user => user && typeof user === 'object' ? user.compte : user)
        .map(name => name ? this.filter(name) : this.AllPersonneFliter);
	
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	 this.page(this.offset, this.limit);
	 this.numAc='710000';
	 
	
  }
  
 
  
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
  
   onSubmit(form: any): void {  
      console.log('you submitted value:', form); 
	this.doSaveAccount();
	
	//console.log(this.vm);
  }
   getNotification(evt) {
	  var ac: Account;
	  ac= evt;
      this.form.patchValue({numCompte: ac.numAccount,name: ac.libelle});
	  this.nameCompte=ac.libelle;
        // Do something with the notification (evt) sent by the child!
    }
	
	 getNumcompteValue() {
	  var ac: Account=this.form.value['compte'];
	  if(ac){
		  this.form.patchValue({numCompte: ac.numAccount,name: ac.libelle});
	  this.nameCompte=ac.libelle;
	  }
	 
      
        // Do something with the notification (evt) sent by the child!
    }
	
	showMessage(message:string){
	//	this._service.alert('test','not');
		
	}
	 public title: string = 'just a title';
    public content: string = 'just content';
	 actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 10000;
  addExtraClass = false;
  message = 'Snack Bar opened.';
   open() {
    const config = new MatSnackBarConfig();
    config.duration = this.autoHide;
    config.extraClasses = this.addExtraClass ? ['party'] : null;
    //this.snackBar.open(this.message, this.action && this.actionButtonLabel, config);
  }
 
  doSaveAccount() {
	if(!this.submitBtnDisaple) {
	this.submitBtnDisaple=true;
	this.getNumcompteValue();
	 let forMatata = this.form.value;	 
	  
       let header = new Headers();
		this.http.post('/operation/addMvtTodayOperationAn', forMatata).subscribe(
        (data) => {
		
		if(data['message']=='ok'){
			  
				this.showSnackBarWith(this.messageSave);
				this.AllOperation.push(data);
				this.AllOperation = [...this.AllOperation]
	 
				//this.rows.push(data);
				this.showGreeting=true;
				
			    this.formRest();
				 this.submitBtnDisaple=false;
				  this.date = new Date().toISOString().slice(0, 10);
	             //this.date.setValue(new Date().toISOString());
	         this.form.patchValue({dateOperation:this.date});
	        
	         this.numAc='';
            //this.form=data;	
		
				
			}
			else {
	        
		      this.showSnackBar(data['message']);
			  this.submitBtnDisaple=false;
		   
			}
	
	
		  
		
          
        },
        err =>  {this.submitBtnDisaple=false; this.showSnackBar('erreur los call from angular '+err)
		
		}// complete
    );
	}
	//this.reset=false;
	//new URLSearchParams();
     // params.set('token', token);
		//this.getNumcompteValue();
      
	
	
	
	
  }
  
  formRest(){
	  this.form.reset();
	   this.nameCompte='';
  }
  
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
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
	
	 page(offset, limit) {
    this.fetch((results) => {
      this.count = results.length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rows];

      for (let i = start; i < end; i++) {
        rows[i] = results[i];
      }

      this.rows = rows;
      
    });
  }

  
  fetch(cb) {
	  cb(this.AllOperation);
   
  }
  
  onPage(event) {
    
    this.page(event.offset, event.limit);
  }
  
   displayFn(value: any): string {
	 // this.currentState=value;
    return value && typeof value === 'object' ? value.libelle+" "+ value.numAccount+" " : value;
  }

   
 // filterAccount(val: string) {
 //   return val ? this.accounts.filter((s) => s.libelle.match(new RegExp(val, 'gi'))) : this.accounts;
 // }
  
 filter(name: string): Account[] {
    return this.AllPersonneFliter.filter(option =>
	 option.libelle.toLowerCase().indexOf(name) === 0||option.numAccount.toLowerCase().indexOf(name) === 0);
      //option.name.toLowerCase().indexOf(name) === 0);
	 // option.name.indexOf(name) === 0);
  }

 
  
  
}
