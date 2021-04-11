import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { Router, CanActivate } from '@angular/router';

import {AuthHttp,FactureService } from 'app/services/index';


@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.scss']
})
export class ListFactureComponent implements OnInit {
rows= [];
rowsDt= [];
showDet=false;
AllFacture= [];
AllFactureOrgine= [];
  count = 0;
  offset = 0;
  limit = 7;
  val:boolean;
   nomClient= '';
   currentCompte = '';
  
  constructor(private factSer :FactureService,private translate: TranslateService,private http: AuthHttp,private router :Router) {
	
	
	  
  }
  
   from ='';
  to ='';

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
    
		/*this.factSer.getAllFacture().subscribe(data => {		 
		 this.AllFacture=data; 
		 cb( this.AllFacture);
		 });
		 */
		 this.factSer.getAllFacture().subscribe(data => {		 
		 this.AllFacture=data; 
		 cb( this.AllFacture);
		 });
		 
     
  
  }

  onPage(event) {
    console.log('Page Event', event);
  
  }
  
  
  factureDetail(value){
	  this.router.navigate(["product/facture-details/"+value]);
	  
  }
  
    
  updateFilter(event) {
    const val = event.target.value;
    if(!this.showDet){
		 const temp = this.AllFacture.filter(function(d) {
      return String(d.numFacture).indexOf(val)!=-1|| d.date===val;
    });
    // update the rows
    this.rows = temp;
	}
	else{
		 const temp = this.AllFacture.filter(function(d) {
      return d.refProduct.indexOf(val)!=-1|| d.libelle.indexOf(val)!=-1;
    });
    // update the rows
    this.rowsDt = temp;
	}
   
  }
  
  	public setMomentDt1(moment: any): any {
		 this.showDet=false;
	 let  dt :Date;
	  dt=moment;
	 this.to=dt.toISOString().slice(0, 10);
	 
}


public setMomentDt2(moment: any): any {
	  this.showDet=false;
	
	  let  dt :Date;
	  dt=moment;	 
	  this.from=dt.toISOString().slice(0,10);
  
}
  
  public rerechData(){
	 this.showDet=false;
	 
	 let val={from: this.from,to: this.to};
	      this.factSer.getAllFactureByDate(this.from,this.to,this.nomClient).subscribe(data => {
//this.factSer.getAllFactureByDateVal(val).subscribe(data => {			  
			  this.AllFacture=data; 
			  this.rows = this.AllFacture;
			 
		
		
		});
	  
  }
  
  public GrourerechData(){
	
	      this.factSer.getAllGroupFactureByDate(this.from,this.to,this.nomClient).subscribe(data => {			  
			  this.AllFacture=data; 
			  this.rowsDt = this.AllFacture;
		// cb( this.AllFacture);
		
		});
	  
  }
  
getUpdateNumcompte(evt) {
    this.currentCompte = '';
	this.nomClient = '';
    if (evt && evt['numAccount']) {
      this.currentCompte = evt['numAccount'];
	  this.nomClient= evt['libelle'];
    }

  }

 
 

  getTotal() {
	 let total = 0.00;
   for (let i = 0; i < this.AllFacture.length; i++) {
      total += this.AllFacture[i].balance;
    }
    return total;
  }  
  
  print(){
	  window.print();
  }
  
  
  
  
  
}
