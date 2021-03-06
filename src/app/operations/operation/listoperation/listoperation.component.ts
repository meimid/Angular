import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { OperationService } from 'app/services/index';
import { Router, CanActivate } from '@angular/router';
import {AuthHttp} from 'app/services/index';
import {ConfirmationDialogsService } from 'app/services/confirmation-dialog.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {Config}   from 'app/services/index';


@Component({
  selector: 'app-listoperation',
  templateUrl: './listoperation.component.html',
  styleUrls: ['./listoperation.component.scss']
})
export class ListoperationComponent implements OnInit {
@ViewChild('sampleT') public sampleT: TemplateRef<any>;
message:string;

  constructor(translate: TranslateService, private operationServ: OperationService,private http: AuthHttp,private router :Router,private confirme :ConfirmationDialogsService,public snackBar: MatSnackBar) {
	  // this.source = new LocalDataSource(this.data);
	  this.message=translate.instant('DELETESUCCES');
    
  }
  
  modePrint=false;
  solde:number=0;
  soldeIn:number=0;
  soldeOut:number=0;
  soldeCrt:number=0;
  AllOperation:any
 rows= [];
  count = 0;
  offset = 0;
  limit = 7;
  AllRowsIn= [];
  AllRowsOut= [];
  AllRowsCr= [];
AllRowsCrA= []; 
AllRowsBN= []; 
AllRowsDV= []; 
  rowsIn= [];
  countIn = 0;
  offsetIn = 0;
  limitIn = 7;
  rowsOut= [];
  countOut = 0;
  offsetOut = 0;
  limitOut = 7;
  
  rowsCrt=[];
  countCrt= 0;
  offsetCrt = 0;
  limitCrt = 7;
  rowsCrtA=[];
  countCrtA= 0;
  offsetCrtA = 0;
  limitCrtA = 7;
  rowsBN=[];
  countBN= 0;
  offsetBN = 0;
  limitBN = 7;
  rowsDV=[];
  countDV= 0;
  offsetDV = 0;
  limitDV = 7;
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	   
	this.rerechData();
	this.AllOperation=[];
	  
	  
	  
    
  }
  public rerechData(){
	  this.operationServ.getAllOperation().subscribe(data => {
		  this.solde=data['solde'];
		 this.AllOperation=data; 
		 // data = JSON.parse(data['_body']);
		  this.AllRowsIn= data['inList']	
          this.AllRowsOut= data['outList'];
	       this.AllRowsCr= data['crList'];	
          this.AllRowsCrA= data['acrList'];		
          this.AllRowsBN= data['bnList'];
          this.AllRowsDV= data['divList'];
		  this.pageIn(this.offsetIn, this.limitIn);
	      this.pageOut(this.offsetOut, this.limitOut);
		  this.pageCrt(this.offsetCrt, this.limitCrt);
		  this.pageCrtA(this.offsetCrtA, this.limitCrtA);
		  this.pageBN(this.offsetBN, this.limitBN);
		  this.pageDV(this.offsetDV, this.limitDV);
		   this.soldeIn=data['someIn'];
   this.soldeOut=data['someOut'];
   this.soldeCrt=data['someCr'];
		});
	  
  }

  pageIn(offset, limit) {
    this.fetch((results) => {
      this.countIn = results['inList'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsIn];

      for (let i = start; i < end; i++) {
        rows[i] = results['inList'][i];
      }

      this.rowsIn =results['inList'];// rows;
      
    });
  }
  
  
  pageOut(offset, limit) {
    this.fetch((results) => {
      this.countOut = results['outList'].length;
this.rowsOut =results['outList'];
    
      
    });
  }
  
  
  
 fetch(cb) {
	  cb(this.AllOperation);
   
  }

  onPageIn(event) {
       this.pageIn(event.offset, event.limit);
  }
onPageOut(event) {
       this.pageOut(event.offset, event.limit);
  }
  
  
  deleteOperation(event) {
	  this.confirme.confirMNoYes().subscribe(result => {
		  
		  if(result){
			  this.operationServ.delete(event).subscribe(resu => {
				 
				  //this.http.showSnackBarWith(resu);
				  if(resu && resu['code']=='ok'){
					  this.showSnackBarWith(this.message);
					  this.rerechData();
					  
					  
					  
				  }
				  else {
					  this.showSnackBarWith(resu['libelle']);
					
				  }
				  
			  });
			  
		  }
			  
		  
	  });
	//let varth= this.confirme.confirm('title', 'message',this.viewContainerRef);
	//this.showConfirMatialog();
	  //this.confirme.confirm('');
	  //alert('we will delete '+event);
  }
 
 showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
    }
	
	valide(){
		 this.operationServ.valideAllOperation().subscribe(resu => {
				 
				  //this.http.showSnackBarWith(resu);
				  if(resu && resu['code']=='ok'){
					  this.showSnackBarWith(this.message);
					  this.rerechData();
					  
					  
					  
				  }
				  else {
					  this.showSnackBarWith(resu['libelle']);
					
				  }
				  
			  });
		
	}
	
	
	
	pageCrt(offset, limit) {
    this.fetch((results) => {
      this.countCrt = results['crList'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsCrt];

      for (let i = start; i < end; i++) {
        rows[i] = results['crList'][i];
      }

      this.rowsCrt =results['crList'];// rows;
      
    });
  }
  onPageCrt(event) {
       this.pageCrt(event.offset, event.limit);
  }
  
  
  pageCrtA(offset, limit) {
    this.fetch((results) => {
      this.countCrtA = results['acrList'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsCrtA];

      for (let i = start; i < end; i++) {
        rows[i] = results['acrList'][i];
      }

      this.rowsCrtA =results['acrList'];// rows;
      
    });
  }
  
  onPageCrtA(event) {
       this.pageCrtA(event.offset, event.limit);
  }
  
  
  
    pageBN(offset, limit) {
    this.fetch((results) => {
      this.countBN = results['bnList'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsBN];

      for (let i = start; i < end; i++) {
        rows[i] = results['bnList'][i];
      }

      this.rowsBN =results['bnList'];// rows;
      
    });
  }
  
  onPageBN(event) {
       this.pageBN(event.offset, event.limit);
  }
  
   pageDV(offset, limit) {
    this.fetch((results) => {
      this.countDV = results['divList'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsDV];

      for (let i = start; i < end; i++) {
        rows[i] = results['divList'][i];
      }

      this.rowsDV =results['divList'];// rows;
      
    });
  }
  
  onPageDV(event) {
       this.pageDV(event.offset, event.limit);
  }
  
	signUp(){
		window.print();
	}
	
  
}
