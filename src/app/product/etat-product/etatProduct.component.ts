import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import {TranslateService} from '@ngx-translate/core';

import { Router, CanActivate } from '@angular/router';
//import {HttpService} from 'app/services/index';
//import { DateTimePickerModule } from 'ng2-date-time-picker';
import { AuthHttp, ProductService } from 'app/services/index';
import { Product } from 'app/services/product';

import { ProductAutoComponent } from '../auto-product/productAuto.component';

@Component({
  selector: 'etat-product',
 templateUrl: './etatProduct.component.html',
  styleUrls: ['./etatProduct.component.scss']
})
export class EtatProductComponent implements OnInit {

  stateCtrl: FormControl;
  etatCtrl: FormControl;
  currentState = '';
  AllAccount= [];
   AllAccountPr= [];
   rowsIn=[];
  currentNumCompte = '';
  from ='';
  to ='';
  productName ='';
  
  reactiveAccounts: any;
  tdAc: any[];

  tdDisabled = false;

  tdAuto: string;

  reactiveAuto: string;
  reactiveAcAuto: string;
  accounts =[];
  showsold:boolean=false;
  credit='';
  debit='';
  message='';
  modePrint=false;
  
  constructor(private prdSer:ProductService,private translate: TranslateService,private http: AuthHttp,private router :Router) {
   
        this.etatCtrl= new FormControl({from :'',to:'',numCompte:''});   
   /* this.stateCtrl = new FormControl({numAccount: '', libelle: ''});
	this.etatCtrl= new FormControl({from :'',to:'',numCompte:''});
    this.reactiveAccounts = this.stateCtrl.valueChanges
      .startWith(this.stateCtrl.value)
	  .debounceTime(400)
      .map(val => this.displayFn(val))
      .map(libelle => this.filterAccount(libelle));
	    this.currentNumCompte='';
	  this.stateCtrl.valueChanges.subscribe(data => {
      if(data['numAccount']!=undefined){
		   this.from ='';
           this.to='';
		   this.currentNumCompte=data['numAccount'];		  
		  this.etatCtrl.patchValue({numCompte:data['numAccount']});
		 
		  this.send();
		 
		 // this.getAccountDetail(data['numAccount']);
		 //alert(data['numAccount']);
	  }else {
		  this.etatCtrl.patchValue({numCompte:''});
	  }
    })
	// reactiveAccounts.valueChanges()
	 this.credit=translate.instant('CREDIT');
     this.debit=translate.instant('DEBIT');
	  */
  }

 
  
  
  ngOnInit() {
	 if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	
	
	 
	
  }
  
   solde:number=0;
  rows = [];
  count = 0;
  offset = 0;
  limit = 7
page(offset, limit) {
    this.fetch((results) => {
      this.count = results.length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rows];

      for (let i = start; i < end; i++) {
        rows[i] = results[i];
      }

      this.rows = rows;
     
    });
  }

  fetch(cb) {
   cb(this.AllAccount);
  }
fetch1(cb) {
   cb(this.AllAccountPr);
  }
  

  
  onPage(event) {   
    this.page(event.offset, event.limit);
  }
  
  public setMomentDt1(moment: any): any {
	
	 let  dt :Date;
	  dt=moment;
	  //dt.setDate(dt.getDate() + 1);
	  this.to=dt.toISOString().slice(0, 10);
    //this.momentValue = dt.toISOString().slice(0, 10);
	//.toISOString().slice(0, 10);
	//this.form.patchValue({date:  this.momentValue});
	this.etatCtrl.patchValue({to: this.to});
	 this.sendData();
	
    // Do whatever you want to the return object 'moment'
}

public setMomentDt2(moment: any): any {
	
	 let  dt :Date;
	  dt=moment;
	 // dt.setDate(dt.getDate() + 1);
	  this.from=dt.toISOString().slice(0, 10);
    //this.momentValue = dt.toISOString().slice(0, 10);
	//.toISOString().slice(0, 10);
	//this.form.patchValue({date:  this.momentValue});
	 this.etatCtrl.patchValue({from: this.from});
	 
	 this.sendData();
	
    // Do whatever you want to the return object 'moment'
}
  
  currentRefProduct='';
  
  
  
  getProductDetail(value:any){
	  this.productName ='';
	  if(value&&value['refProduct']){
		   this.currentRefProduct=value['refProduct'];
		   this.productName=value['libelle'];
		   this.qntDisp=value['balance'];
		 this.sendData();
	    
	  }
	     
	  
  }
  
  qntDisp='';
  
  sendData() {
	   
	   let val={refProduct:this.currentRefProduct,from: this.from,to: this.to};
	   
	     this.prdSer.gePrdDetail(val).subscribe((data) => {	
		  //let body = data.json();
		  //alert(body);
          this.AllAccount=data;
		  this.AllAccountPr=data;
		  this.page(this.offset, this.limit);	
	  this.fetch1((data) => {			
      this.rowsIn = data;
    });		  
		  
		  
		  });
	 //  this.getProductDetail(val);
  }
 
  gridShowHide(value) {
    //this.gridShowHideFlag = value;
  }
  
  
	signUp(){
		window.print();
	}
  
 print(){
	
	 window.print();
 }
}
