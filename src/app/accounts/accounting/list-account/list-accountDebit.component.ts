import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { Router, CanActivate } from '@angular/router';

import {AuthenticationService} from 'app/services/index';
//import {HttpService } from 'app/services/index';
import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-list-account',
  templateUrl: './list-accountDebit.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountDebitComponent implements OnInit {
rows= [];
AllAccount: any;
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
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

  page(offset, limit) {
    this.fetch((results) => {
		
		if(results){
			this.count = results.length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rows];

      for (let i = start; i < end; i++) {
        rows[i] = results[i];
      }

      this.rows = rows;
		}
      
      
    });
  }

  fetch(cb) {
    
		
   this.accountSer.getAllAccountDebit().subscribe(data => {		 
		 this.AllAccount=data;
 this.AllAccount.forEach((rowItem, rowIndex) => {
				  this.sumCont+=rowItem.balance;
				  });	 
	cb(this.AllAccount);
		
		 });
    

  
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }
}
