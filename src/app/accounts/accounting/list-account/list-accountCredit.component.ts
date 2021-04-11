import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { Router, CanActivate } from '@angular/router';

import {AuthenticationService} from 'app/services/index';
//import {HttpService } from 'app/services/index';
import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-list-account',
  templateUrl: './list-accountCredit.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountCreditComponent implements OnInit {
rows= [];
AllAccount: any;
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  modePrint=false;
  sumCont=0;
  constructor(private accountSer :AccountService,translate: TranslateService,private http: AuthHttp,private router :Router) {
	
	
	  
  }
  
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	  
	       this.fetch((data) => {
			 //this.AllAccount
      this.rows = data;
    });
	
           
  }

 

  
  
  
  
  fetch(cb) {
      this.accountSer.getAllAccountCredit().subscribe(data => {		 
		 this.AllAccount=data; 
		 cb(this.AllAccount);
              this.AllAccount.forEach((rowItem, rowIndex) => {
				  this.sumCont+=rowItem.balance;
				  });
  
		 
		 });
		 }

		 
		 signUp(){
		window.print();
	}
 
}
