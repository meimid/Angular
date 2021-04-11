import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { AccountService } from 'app/accounts/accounting/AccountService';
import { Account } from 'app/accounts/accounting/account';
import {TranslateService} from '@ngx-translate/core';

import { Router, CanActivate,ActivatedRoute } from '@angular/router';
//import {HttpService} from 'app/services/index';
//import { DateTimePickerModule } from 'ng2-date-time-picker';
import {AuthHttp } from 'app/services/index';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";


@Component({
  selector: 'app-autocomplete',
 templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.scss']
})
export class EtatComponent implements OnInit {

  stateCtrl: FormControl;
  etatCtrl: FormControl;
  currentState = '';
  AllAccount= [];
  currentNumCompte = '';
  from ='';
  to ='';
  
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
   AllAccountPr= [];
    rowsPr= [];
   modePrint=false;   
 private sub: any;
  constructor(private accountSer:AccountService,private translate: TranslateService,private http: AuthHttp,private router :Router, private route: ActivatedRoute) {
    
    this.stateCtrl = new FormControl({numAccount: '', libelle: ''});
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
	 
	 	 
	  this.sub = this.route.params.subscribe(params => {
      let idPrd = params['id'];
	  // alert('numcompte '+idPrd);
      // (+) converts string 'id' to a number
      if (idPrd) {
this.currentNumCompte=idPrd;
this.send();

      }

      // In a real app: dispatch action to load the details here.
    });
	  
  }

  displayFn(value: any): string {
	  this.currentState=value;
    return value && typeof value === 'object' ? value.libelle : value;
  }

   
  filterAccount(val: string) {
    return val ? this.accounts.filter((s) => s.libelle.match(new RegExp(val, 'gi'))) : this.accounts;
  }
  
  
  
  ngOnInit() {
	 if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	
	 this.accountSer.getAccountLight().subscribe(data => {		 
		 this.accounts=data;
		 });
	
	 
	
  }
  
  getAccountDetail(value:any){
	  
	      this.accountSer.getAccountDetail(value).subscribe((data) => {		 
		  this.AllAccount=data['listMvt'];
		  this.AllAccountPr=data['listMvt'];
		 
		  this.showsold=true;
		  this.solde=data['solde'];
		  if(this.solde>0)
			  this.message=this.credit +' '+this.solde;
		  else
		  this.message=this.debit +' '+this.solde;
	   this.fetch((data) => {
			 //this.AllAccount
      this.rows = data;
    });
	
	   this.fetch1((data) => {
			 //this.AllAccount
      this.rowsPr = data;
    });
		   
		  });
	  
  }
  
  
 solde:number=0;
  rows = [];
  count = 0;
  offset = 0;
  limit = 7;
  


  fetch(cb) {
	  cb(this.AllAccount);
     
		 }
		 
		  fetch1(cb) {
	  cb(this.AllAccountPr);
     
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
	 this.send();
	
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
	 
	 this.send();
	
    // Do whatever you want to the return object 'moment'
}


public send(){
	//this.valueCompte();
	//let formData = this.etatCtrl.value;		
	if(this.currentNumCompte !=''){
		let val={numCompte:this.currentNumCompte,from: this.from,to: this.to};
		this.getAccountDetail(val);
	}
	
	
	 
}

doSolde(){
	
	if(this.currentNumCompte !=''){
	let val={numCompte:this.currentNumCompte};
	 let body: string = JSON.stringify({numCompte: this.currentNumCompte})
 // let urlSearchParams = new URLSearchParams();
  // urlSearchParams.append('numCompte', this.currentNumCompte);
//urlSearchParams.append('password', password);
//let body = urlSearchParams.toString()	
	this.accountSer.soldeAccountDetail(this.currentNumCompte).subscribe((data) => {		 
		 this.send();
		  
		  });
	
	}
	
	
}

valueCompte(){
	    
		
		this.etatCtrl.patchValue({to: this.to});
		this.etatCtrl.patchValue({from: this.from});
		this.etatCtrl.patchValue({numCompte: this.currentNumCompte});
		
	}
	
	
	signUp(){
		window.print();
	}
	
	

}
