import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { Router, CanActivate } from '@angular/router';

import {AuthHttp,CarService } from 'app/services/index';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-list-carton',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-marque.component.scss']
})
export class ListModelComponent implements OnInit {
rows= [];
AllAccount= [];
AllAccountPr= [];
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  shortPrd:boolean=false;
  rowsPr= [];
   modePrint=false;
  private sub: any;
  
  constructor(private carSer :CarService,private translate: TranslateService,private http: AuthHttp,private router :Router,private route: ActivatedRoute) {
	
	
	  
  }
  
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	   
	    this.sub = this.route.params.subscribe(params => {
       let idPrd = params['id']; // (+) converts string 'id' to a number
	   if(idPrd ){
		   
		   this.shortPrd=true;
	  
	   }
  
       // In a real app: dispatch action to load the details here.
    });
	  if(!this.shortPrd){
		  this.fetch((data) => {			
      this.rows = data;
	  this.rowsPr = data;
    });
	  }else {
		   this.fetchShort((data) => {			
      this.rows = data;
	  this.rowsPr = data;
    });
	  }
 
	     }



  fetch(cb) {
    
		this.carSer.getAllModel().subscribe(data => {		 
		 this.AllAccount=data; 
		 this.AllAccountPr=data;
		 cb( this.AllAccount);
		 
		 });
	 }
	 
	 fetchShort(cb) {
    
		this.carSer.getAllModel().subscribe(data => {		 
		 this.AllAccount=data; 
		 this.AllAccountPr=data; 		 
		 cb( this.AllAccount);
		 
		 });
	 }

  onPage(event) {
    console.log('Page Event', event);
  
  }
  signUp(){
		window.print();
	}
  
  modelDetail(value){
	 this.router.navigate(["car/model/"+value]);
	  
  }
  
  
  updateFilter(event) {
    const val = event.target.value;
    
    const temp = this.AllAccount.filter(function(d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || d.code.toLowerCase().indexOf(val) !== -1;
    });
    // update the rows
    this.rows = temp;
  }
}
