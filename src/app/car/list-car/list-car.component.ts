import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { Router, CanActivate } from '@angular/router';

import {AuthHttp,CarService } from 'app/services/index';
import {ActivatedRoute} from "@angular/router";

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Voiture } from 'app/services/voiture';

@Component({
  selector: 'app-list-carton',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-marque.component.scss']
})
export class ListCarComponent implements OnInit {
rows:any;
AllAccount:any;
AllAccountPr:any;
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
  shortPrd:boolean=false;
  rowsPr:any;
  modePrint=false;
  private sub: any;
  allLocalisation= [];
 lvoiyure:Voiture;
 idLocal:0;
 public form =null;  
  constructor(private carSer :CarService,private fb: FormBuilder,private translate: TranslateService,private http: AuthHttp,private router :Router,private route: ActivatedRoute) {
	
	
	  
  }
  
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	   this.rows= [];
       this.AllAccount= [];
       this.AllAccountPr= [];
	    this.rowsPr= [];
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
	  
	  
	  
	  this.carSer.getAllLocalisation().subscribe(data => {		 
	  this.allLocalisation=data; }
	  
	  );
	  
	  
	   this.form = this.fb.group({
      
        numChassi:'',
		numeroLot:'',
        idLocalisation:true,
        message:''
    });
 
	     }



  fetch(cb) {
    
		this.carSer.getAllVOiture().subscribe(data => {		 
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
  
  voitureDetail(value){
	 this.router.navigate(["car/car-detail/"+value]);
	  
  }
  
  doLook(){
	  this.AllAccount=[]; 
		 this.AllAccountPr=[]; 
		 this.rows = this.AllAccount;
		 this.rowsPr=this.AllAccount;
	 let formData = this.form.value;
	 this.lvoiyure=new Voiture(formData['numChassi'],formData['numChassi']);
     this.lvoiyure.setIdLocalisation(this.idLocal);
	 this.lvoiyure.numeroLot= formData['numeroLot'];
	   
	this.carSer.getAllVoitureByCriteria(this.lvoiyure).subscribe(
        (data) => {
	    this.AllAccount=data; 
		 this.AllAccountPr=data; 		 
		// this.cb( this.AllAccount);
		this.rows = data;
	   this.rowsPr = data;
	  //this.form.reset();
		 
		 });
		}; 
	  
  
  
  
  updateFilter(event) {
    const val = event.target.value;
    
    const temp = this.AllAccount.filter(function(d) {
      return d.numChassi.toLowerCase().indexOf(val) !== -1 || d.numChassi.toLowerCase().indexOf(val) !== -1;
    });
    // update the rows
    this.rows = temp;
  }
}
