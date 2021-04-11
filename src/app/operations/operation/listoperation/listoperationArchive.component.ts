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
  templateUrl: './listoperationArchive.component.html',
  styleUrls: ['./listoperationPassed.component.scss']
})
export class ListoperationArchivedComponent implements OnInit {

message:string;

  constructor(translate: TranslateService, private operationServ: OperationService,private http: AuthHttp,private router :Router,private confirme :ConfirmationDialogsService,public snackBar: MatSnackBar) {
	  // this.source = new LocalDataSource(this.data);
	  
    
  }
 solde:number=0;
  
  AllOperation= [];
 rows= [];
  count = 0;
  offset = 0;
  limit = 7;
  
  rowsIn= [];
  countIn = 0;
  offsetIn = 0;
  limitIn = 7;
  rowsOut= [];
  countOut = 0;
  offsetOut = 0;
  limitOut = 7;
  

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
	this.rerechData();
	  
	  
	  
    
  }
  public rerechData(){
	  this.operationServ.getAllArchivedOperation().subscribe(data => {
		  this.solde=data['solde'];
		 this.AllOperation=data; 
		 this.pageIn(this.offsetIn, this.limitIn);
	      this.pageOut(this.offsetOut, this.limitOut);
		  this.pageCrt(this.offsetCrt, this.limitCrt);
		});
	  
  }

  pageIn(offset, limit) {
	 
    this.fetch((results) => {
		 if(results&&results['inLista']){
      this.countIn = results['inLista'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsIn];

      for (let i = start; i < end; i++) {
        rows[i] = results['inLista'][i];
      }

      this.rowsIn =results['inLista'];// rows;
      }
    });
  
  }
  
  
  pageOut(offset, limit) {
    this.fetch((results) => {
		if(results&&results['outLista']){
      this.countOut = results['outLista'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsOut];

      for (let i = start; i < end; i++) {
        rows[i] = results['outLista'][i];
      }

      this.rowsOut =results['outLista'];// rows;
      }
    });
  }
  
    rowsCrt=[];
  countCrt= 0;
  offsetCrt = 0;
  limitCrt = 7;
  
  
   pageCrt(offset, limit) {
    this.fetch((results) => {
		if(results['crLista']){
      this.countCrt = results['crLista'].length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rowsCrt];
       this.rowsCrt =results['crLista'];
	   }
      
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
  onPageCrt(event) {
       this.pageCrt(event.offset, event.limit);
  }
  
 
  
}
