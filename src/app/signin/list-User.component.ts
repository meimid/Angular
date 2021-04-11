import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { Router, CanActivate } from '@angular/router';

import {AuthenticationService} from 'app/services/index';
//import {HttpService } from 'app/services/index';
import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-User.component.html',
  styleUrls: ['./signin.component.scss']
})
export class ListUserComponent implements OnInit {
rows= [];
AllAccount= [];
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  
  constructor(private accountSer :AccountService,translate: TranslateService,private http: AuthHttp,private router :Router) {
	
	
	  
  }
  
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	  
	      this.accountSer.getAllUser().subscribe(data => {		 
		 this.AllAccount=data; 
		 this.page(this.offset, this.limit);});
	
           
  }

    page(offset, limit) {
    this.fetch((results) => {
		
		if(results){
			this.count = results.length;
  this.rows = results;
     
		}
      
      
    });
  }

  fetch(cb) {
    
		
      cb(this.AllAccount);
    

  
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }
  modifyUser(value){
	   this.router.navigate(['Accounts/getUser/', value]);
	  
  }
   activerUser(value){
	   this.accountSer.activeDesactiveUser(value).subscribe(data => {		 
		 this.accountSer.getAllUser().subscribe(data => {		 
		 this.AllAccount=data; 
		 this.page(this.offset, this.limit);});
		 }
		 );
	    
	  
  }
  
  
}
