import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { Router, CanActivate } from '@angular/router';

import {AuthHttp,ProductService } from 'app/services/index';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-list-carton',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {
rows:any;
AllAccount:any;
AllAccountPr:any;
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  shortPrd:boolean=false;
  rowsPr= [];
   modePrint=false;
  private sub: any;
  
  constructor(private prdSer :ProductService,private translate: TranslateService,private http: AuthHttp,private router :Router,private route: ActivatedRoute) {
	
	
	  
  }
  
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	   this.AllAccount= [];
       this.AllAccountPr= [];
	   this.rows= [];
	   
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
	  //this.rowsPr = data;
    });
	  }else {
		   this.fetchShort((data) => {			
      this.rows = data;
	 // this.rowsPr = data;
    });
	  }
 
	     }



  fetch(cb) {
    
		this.prdSer.getAllCategory().subscribe(data => {		 
		 this.AllAccount=data; 
		 this.AllAccountPr=data;
		 cb( this.AllAccount);
		 
		 });
	 }
	 
	 fetchShort(cb) {
    
		this.prdSer.getAllCategory().subscribe(data => {		 
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
  
  productsDetail(value){
	 this.router.navigate(["product/product-details/"+value]);
	  
  }
  
  
  updateFilter(event) {
    const val = event.target.value;
    
    const temp = this.AllAccount.filter(function(d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || d.refProduct.toLowerCase().indexOf(val) !== -1;
    });
    // update the rows
    this.rows = temp;
  }
}
