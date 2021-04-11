import { Component, Input,Output, EventEmitter,OnInit, OnChanges,SimpleChange,DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';

import {TranslateService} from '@ngx-translate/core';

import { AccountService } from 'app/accounts/accounting/AccountService';

import { Account } from 'app/accounts/accounting/account';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'acctier-dialog',
  templateUrl: './accountPupTier.component.html',
  styleUrls: ['./accountPup.component.scss']
})
export class AccountPupTierComponent   implements  OnChanges, OnInit {
public form: FormGroup;
  lastCloseResult: string;
  @Input()
  numAccount:string;
  @Input()
  libelle: string ;
  account:Account=new Account('','');
  @Input()
   resteAccount: boolean=true;
   stateCtrl: FormControl;
  firsttime:boolean=true;
  @Output()
  changeNumCompte = new EventEmitter<any>();
  
  @Input('resteAccount') set categoryId(value: boolean) {

  if(value)
	 this.stateCtrl.reset();

}
  
  
   filteredOptions: Observable<Account[]>;
    AllPersonneFliter:any;
  fireNumCompte() {	  
	  this.account.libelle=this.libelle;
	  this.account.numAccount=this.numAccount;
	 
      this.changeNumCompte.emit(this.account);
	 
  }

  constructor(public dialog: MatDialog,private fb: FormBuilder,translate: TranslateService,private accountSer :AccountService) {
	  this.stateCtrl = new  FormControl();
	  this.accountSer.getAccountLightForFacture().subscribe(data => {		 
		this.AllPersonneFliter=data;}); 
		
		
		this.stateCtrl.valueChanges.subscribe(function (value) {
       	this.changeNumCompte.emit(this.stateCtrl.value);
		}.bind(this));
		
		
	
  }

  
  
  ngOnInit() {
	   
		
	  this.filteredOptions =this.stateCtrl.valueChanges
        .startWith(null)
		.debounceTime(400)
        .map(user => user && typeof user === 'object' ? user.compte : user)
        .map(name => name ? this.filter(name) : this.AllPersonneFliter);
	
	
	     
  
  }
 
  accounts =[];
   displayFn(value: any): string {
	 // this.currentState=value;
    return value && typeof value === 'object' ? value.libelle+" "+ value.numAccount+" " : value;
  }

   

 filter(name: string): Account[] {
    return this.AllPersonneFliter.filter(option =>
	 option.libelle.toLowerCase().indexOf(name) === 0||option.numAccount.toLowerCase().indexOf(name) === 0);
     
  }
  
  
    selectedItemChange = function (prd: any) {
		this.changeNumCompte.emit(this.stateCtrl.value);
	  

  };

  ngOnChanges(changes : {[propKey:string]: SimpleChange}){
	  if(this.resteAccount &&  !this.firsttime){
		//  alert('ngcgange child ');
	 //this.stateCtrl.reset();
	  }
	  this.firsttime=false;
    }
	
  
  
  
  
}

