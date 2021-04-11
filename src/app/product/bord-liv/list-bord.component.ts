import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { Router, CanActivate } from '@angular/router';

import {AuthHttp,FactureService } from 'app/services/index';


@Component({
  selector: 'app-list-bord',
  templateUrl: './list-bord.component.html',
  styleUrls: ['./list-bord.component.scss']
})
export class ListBordComponent implements OnInit {
rows= [];
AllFacture= [];
AllFactureOrgine= [];
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  
  constructor(private factSer :FactureService,private translate: TranslateService,private http: AuthHttp,private router :Router) {	
	
	  
  }
  
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	  
  this.fetch((data) => {
			
      this.rows = data;
    });
	      
	
           
  }



  fetch(cb) {
    
		this.factSer.getAllBordeaux().subscribe(data => {		 
		 this.AllFacture=data; 
		 cb( this.AllFacture);
		 });
		 
		 
     
  
  }

  onPage(event) {
    console.log('Page Event', event);
  
  }
  
  
  factureDetail(value){
	  this.router.navigate(["product/borddet/"+value]);
	  
  }
  
    
  updateFilter(event) {
    const val = event.target.value;
    
    const temp = this.AllFacture.filter(function(d) {
      return String(d.numFacture).indexOf(val)!=-1|| d.date===val;
    });
    // update the rows
    this.rows = temp;
  }
}
