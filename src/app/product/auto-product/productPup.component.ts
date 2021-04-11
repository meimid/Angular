import { Component, Input,Output, EventEmitter,OnInit, OnChanges,SimpleChange,DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { Http, Response } from '@angular/http';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import {AuthHttp,ProductService } from 'app/services/index';

import { Product } from 'app/services/product';

@Component({
  selector: 'prd-dialog',
  templateUrl: './productPup.component.html',
  styleUrls: ['./productPup.component.scss']
})
export class ProductPupComponent   implements  OnChanges, OnInit {
public form: FormGroup;
  dialogRef: MatDialogRef<ProductListComponent>;
  lastCloseResult: string;
  @Input()
  numPrd:string;
  @Input()
  libelle: string ;
  product:Product=new Product('','',0);
  @Input()
  reste: boolean=false;
 
  
  @Output()
  changeNumCompte = new EventEmitter<Product>();
  
 
 
  config: MatDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  
  
  fireNumCompte() {	  
	  this.product.libelle=this.libelle;
	  this.product.refProduct=this.numPrd;
	 this.reste=false;
      this.changeNumCompte.emit(this.product);
  }

  constructor(public dialog: MatDialog,private fb: FormBuilder,translate: TranslateService,private prdSer :ProductService) {
	   this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      numPrd:''
	  
  })
  

  
      this.form.controls['numPrd'].valueChanges.subscribe(function (value) {
       	this.form.patchValue({libelle: ''});
		this.numPrd='';
		this.libelle='';
		if(value.length == 6){
		this.prdSer.validateProduct(value).subscribe(
        (data) => {
			this.form.patchValue({libelle: data['libelle']});
	     	this.numPrd=value;
		    this.libelle=data['libelle'];
             this.reste=false;			
		    this.fireNumCompte();
		    this.reste=false;
			},
        err => this.showSnackBar('erreur los call from angular '+err)// complete
    );
			
			

    
		}
		
			
    }.bind(this));
  
  }

  open() {
    this.dialogRef = this.dialog.open(ProductListComponent, this.config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;	 
	 
	    this.numPrd=this.lastCloseResult[0]['numPrd'];
         this.libelle=this.lastCloseResult[0]['libelle'];
		 this.form.patchValue({libelle: this.libelle, numPrd:this.numPrd});
		 this.dialogRef = null;
	     this.fireNumCompte();
    });
	
	
  }
  
  ngOnInit() {
	     
  
  }

  ngOnChanges(changes : {[propKey:string]: SimpleChange}){
	    if(this.reste){
		  
		  this.form.patchValue({libelle: '', numPrd: ''});
		  
		  this.reste=false;
	 }

    }
  
  
  
  
}

@Component({
  selector: 'prd-compte-dialog',
   templateUrl: './ProductListPup.component.html',
    styleUrls: ['./productPup.component.scss']
  
 
})
export class ProductListComponent implements OnInit{
	
	selected: any[] = [];
	mond=MatDialogRef;
	 AllAccount= [];
	
	 rows = [];
  count = 0;
  offset = 0;
  limit = 7;

  ngOnInit() {
    this.prdSer.getAllProudct().subscribe(data => {		 
		 this.AllAccount=data; 
		 this.page(this.offset, this.limit);});
   
  }
  

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
      console.log('Page Results', start, end, rows);
    });
  }

  fetch(cb) {
    cb(this.AllAccount);
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }

  
   onSelect(event) {
	     let x=this.getSelectedIx();	  
	     console.log('Event: select', event, this.selected);
		this.dialogRef.close(this.selected);
  }

  onActivate(event) {
		 
    console.log('Event: activate', event);
  }
  
  constructor(public dialogRef: MatDialogRef <ProductListComponent> ,private prdSer :ProductService) {}
  
   getSelectedIx() {
	
    return this.selected[0]['$$index'];
  }
  
 
  
}
