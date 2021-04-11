import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import 'rxjs/add/operator/startWith';
//import { AccountPupComponent } from 
import { AccountPupComponent } from 'app/accounts/accounting/auto-account/accountPup.component';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response,RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

//import 'rxjs/Rx';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/do';
import { HttpModule,Headers } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
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

@Component({
  selector: 'app-operation',
  templateUrl: './operation.diver.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationDiverComponent implements OnInit {
 
  public form: FormGroup;
  rows= [];
  count = 0;
  offset = 0;
  limit = 7;
  AllOperation= [];
  private numAc :string;
  momentValue:Date=new Date();
  reset:boolean =false;
  submitFo:boolean=true;
  showGreeting: boolean=false;
  constructor(private fb: FormBuilder,private http: AuthHttp,private translate: TranslateService,public snackBar: MatSnackBar,private autService :AuthenticationService, private router :Router) {
	 
	  
  }
  //constructor(private fb: FormBuilder,private http: Http) {}
  messageSave:string;
  date1 = new Date();
  myDatepicker = new Date();
  minDate: Date;;
  
  maxDate: Date;
  touch: boolean;
  date: string;
  
  ngOnInit() {
	  if(!this.http.isAuthentified())
	   {this.router.navigate(["Accounts/login"]);
		   
	   }
    this.form = this.fb.group({
      montant: [null, Validators.compose([Validators.required, CustomValidators.number])],
      name: [null, Validators.compose([Validators.required])],
	  numCompteFrom: [null, Validators.compose([Validators.required])],
	  numCompteTo: [null, Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required, CustomValidators.date])],
      remarque:''
    });
	  this.date = new Date().toISOString().slice(0, 10);
	  //this.date.setValue(new Date().toISOString());
	this.form.patchValue({date:this.date});
	
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	 this.page(this.offset, this.limit);
	 this.numAc='710000';
	
	
  }
  
  public setMoment(moment: any): any {
	 let  dt :Date;
	  dt=moment;
	 // dt.setDate(dt.getDate() + 1);
    //this.momentValue = dt.toISOString().slice(0, 10);
	//.toISOString().slice(0, 10);
	//this.form.patchValue({date:  this.momentValue});
	this.form.patchValue({date: dt.toISOString().slice(0, 10)});
	
    // Do whatever you want to the return object 'moment'
}
  
   //public static PATH:string = 'http://localhost:8080/creditAJS/secure/addMvtTodayOperationAn'; 
    public static PATH:string = 'http://localhost:8080/creditAJS/operation/addMvtTodayOperationAn'; 
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
  
   onSubmit(form: any): void {  
      console.log('you submitted value:', form); 
	this.doSaveAccount();
	
	//console.log(this.vm);
  }
   getNotificationFrom(evt) {
	  var ac: Account;
	  ac= evt;
      this.form.patchValue({numCompteFrom: ac.numAccount,name: ac.libelle});
        // Do something with the notification (evt) sent by the child!
    }
	
	getNotificationTo(evt) {
	  var ac: Account;
	  ac= evt;
      this.form.patchValue({numCompteTo: ac.numAccount,name: ac.libelle});
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
	
	this.reset=false;
		if(this.submitFo){
			this.submitFo=false;
       let formData = this.form.value;	  
       let header = new Headers();
		this.http.post('/operation/saveOperationDiverAn', formData).subscribe(
        (data) => {
		
		if(data['message']==''){
			this.reset=true;
				this.showSnackBarT(this.messageSave,'sb-success');
				this.AllOperation.push(data);
				this.rows.push(data);
				this.showGreeting=true;
				
			    this.formRest();
				  this.date = new Date().toISOString().slice(0, 10);
	             //this.date.setValue(new Date().toISOString());
	         this.form.patchValue({date:this.date});
	        
	         this.numAc='';
            //this.form=data;	
		
				this.submitFo=true;
			}
			else {
	         this.submitFo=true;
		     this.showSnackBarT(data['message'],'sb-error');
			  
		   
			}
	
	
		  
		
          
        },
        err => {this.showSnackBar('erreur los call from angular '+err);this.submitFo=true;}// complete
		
    );
	
  }
	
	
  }
  
  formRest(){
	  this.form.reset();
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
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }
  showSnackBarT = function(message: string, type : string){
    this.snackBar.open(message,null,{
      duration : '2000',
      extraClasses : [type]
    })
  }
}
