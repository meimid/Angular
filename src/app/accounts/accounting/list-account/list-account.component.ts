import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
rows= [];
AllAccount: any;
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  temp = [];
  
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
	  this.accountSer.getAllAccount().subscribe(data => {		 
		 this.AllAccount= data; 		
		   cb(this.AllAccount);		
		 });   
    }
  
 
  
 updateFilter(event) {
    const val = event.target.value;
    
    const temp = this.AllAccount.filter(function(d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || d.numAccount.toLowerCase().indexOf(val) !== -1;
    });
    // update the rows
    this.rows = temp;
  }
etatAccount(value){
	  this.router.navigate(["Accounts/etatCompteLink/"+value]);
	  
  }

}
