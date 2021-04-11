import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PecheService } from 'app/peche/pecheService';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import {AuthHttp } from 'app/services/index';


@Component({
  selector: 'app-list-espece',
  templateUrl: './list-espece.component.html',
  styleUrls: ['./list-espece.component.scss']
})
export class ListEspeceComponent implements OnInit {
rows= [];
AllAccount: any;
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  temp = [];
  
  constructor(private pecheService :PecheService,translate: TranslateService,private http: AuthHttp,private router :Router) {
	
	
	  
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
	  this.pecheService.getAllEspece().subscribe(data => {		 
		 this.AllAccount= data; 		
		   cb(this.AllAccount);		
		 });   
    }
  
 
  
 updateFilter(event) {
    const val = event.target.value;
    
    const temp = this.AllAccount.filter(function(d) {
      return d.lable.toLowerCase().indexOf(val) !== -1 || d.code.toLowerCase().indexOf(val) !== -1;
    });
    // update the rows
    this.rows = temp;
  }
etatAccount(value){
	  this.router.navigate(["Accounts/etatCompteLink/"+value]);
	  
  }

}
