import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
// import { Account } from './account';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from "lodash";
import 'rxjs/add/operator/startWith';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";


import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Headers } from '@angular/http';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

//import { SimpleNotificationsModule } from 'angular2-notifications';

//import {Headers} from 'angular2/http';

import { MatSnackBar } from '@angular/material';
import { CanActivate } from '@angular/router';
import {ActivatedRoute} from "@angular/router";

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
import { FactureAutoComponent } from 'app/product/list-facture/factureAuto.component';

import { Product } from 'app/services/product';
import { Facture } from 'app/services/facture';

import { AuthHttp, ProductService,FactureService } from 'app/services/index';
import { Account } from 'app/accounts/accounting/account';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'in-goodsGros',
  templateUrl: './bordliv.component.html',
  styleUrls: ['./bordliv.component.scss']
})
export class BordLivComponent implements OnInit {
  public form = null;
  // public form =FormGroup
  
  	products = [];
  socite = {
    libelle: 'Company Name',
    adresse: 'BLA BLA',
    email: '',
    tel: ' 55555',
    url: '',
    tax: 0
  };
  refFacture: '';
  numBord: '';
  restAccout:boolean=false;
  livred: true;
  errorMsg: string;
  userStatus: string;
  private data: any;
  //reset:boolean =true;
  gridShowHideFlag: boolean = false;
  AllProductList: any;
  typePaiement: string = "ESPECE";
  messageSave:'';
  restForm=false;
  currentCompte='';
  submitBtnDisaple:boolean=false;
  newFact:boolean=true;
  clientNom='';
   private sub: any;
   typeOp='E';
   modifiedFact=true;
   remarque:''
  todayDate=new Date().toISOString().slice(0,10);
  stateCtrl: FormControl;
  AllFactureFliter=[];
  filteredOptions: Observable<Facture[]>;
  constructor(private fb: FormBuilder, private http: AuthHttp, private translate: TranslateService, private router: Router, public snackBar: MatSnackBar, private prdSer: ProductService, private factSer: FactureService,private route: ActivatedRoute) {
    this.http = http;
 this.stateCtrl = new  FormControl();

  }
  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      numCompte: '',
      numPersonne: '',
      adresse: '',
      tel: ' ',
      type: ' ',
      numBord: '',
      message: ''
    });
	this.products = [];
	
		
    let sociteFromSt = localStorage.getItem('company');
	
    if (sociteFromSt) {

      this.socite = JSON.parse(sociteFromSt);
	
	   this.livred=this.socite['livred'];
      if (this.socite['tax'])
        this.tax = this.socite['tax'];
	   
	
    }
	let re=localStorage.getItem('restForm');
	if(re){
		if(re=='true')
		this.restForm=true;
	}
this.messageSave=this.translate.instant('saveAvecSucces'); 

this.sub = this.route.params.subscribe(params => {
      let idPrd = params['id'];
      // (+) converts string 'id' to a number
      if (idPrd) {

        this.factSer.getBordDetail(idPrd).subscribe(data => {

          this.products = data['operationLigne'];
          this.livred = data['livred'];
          this.numBord = idPrd;
		  this.refFacture = data['refFacture'];
            
          this.modifiedFact = false;        
          this.todayDate = new Date(data['dateOperation']).toISOString().slice(0, 10);
          this.currentCompte = data['numCompte'];
          this.clientNom = data['nomClient'];
		  this.remarque=data['remarque'];
		  

        });

      }

      // In a real app: dispatch action to load the details here.
    });



  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  product = {
    refProduct: '',
    libelle: '',
    price: 0,
    qnt: 1,
    total: 0,
    id: ''
  };
  getNotification(evt) {
    if (evt != undefined) {
		
		
 this.factSer.getAllNlivredProductByNumFact(evt.numFacture).subscribe(data => {
		this.refFacture=evt.numFacture;	
       this.products=[];		
    for (var i = 0; i < data.length; i++) {		
	  this.product.refProduct = data[i].refProduct;
      this.product.libelle = data[i].libelle;
	  this.product.qnt=data[i].balance;
      //this.product.price = evt['price'];  
        this.products.push({ refProduct: this.product.refProduct, libelle: this.product.libelle, qnt: this.product.qnt });
        this.products=[...this.products];
    // this.checkOut();
      }		
		
		
		
		});
		
		
		

      var ac: Product;
      ac = evt;
      
      
    }
    
  }

  gridShowHide(value) {
    this.gridShowHideFlag = value;
  }


  redirect() {
    this.router.navigate(['./']);
  }

  public title: string = 'just a title';
  public content: string = 'just content';
  public type: string = 'success';

  public deleteId: string;

  public temp: boolean[] = [true, false];


  isActive: boolean = false;



  show_message() {

  }
  onCreate(event) {
    console.log(event);
  }

  onDestroy(event) {
    console.log(event);
  }

  rows = [];
  selecteds = [];
  netTotal = 0;
  tax = 0;
  grandTotal = 0;


  delete = function (row) {
    // console.log(row);

    // console.log(this.rows.indexOf(row));
    this.products.splice(this.products.indexOf(row), 1);


  }

  invoiceTotals: any = [{
    'subtotal': this.getSubTotal(),
    'tax': this.getCalculatedTax(),
    'discount': 0.00,
    'total': 0
  }];

  getSubTotal() {
    let total = 0.00;
    
    return total;
  }

  getCalculatedTax() {
	  
    return 0;
  }

  getTotal() {
    return (this.getSubTotal() + this.getCalculatedTax());
  }

  factureJeson = {
    typeOp: this.typeOp,
    operationLigne: [],
     numCompte:''

  }

  signUp = function () {
    if (this.products.length > 0 && !this.submitBtnDisaple) {
         this.submitBtnDisaple=true;
      //this.factureJeson.operationLigne.value=JSON.stringify(this.products);

      let formData = this.factureJeson;
      formData['operationLigne'] = this.products;
	
      if (this.refFacture != '') {
        formData['refFacture'] = this.refFacture;      }
		  if (this.numBord != '') {
        formData['numBord'] = this.numBord;      
		}
	   formData['typeOp'] =  this.typeOp;
	 
	  
	    if (this.remarque != '') {
        formData['remarque'] = this.remarque;
      }
	  
	  formData['numCompte'] = this.currentCompte;
	  
      this.http.post(`/bordeau/saveBord`, formData).subscribe(
        (data) => {
           
		 
          if (!data['message'] || data['message'] == '' || data['message'] == "") {
			  
			   this.refFacture = data['refFacture'];
            	this.numBord=data['numBord'];	
			 
		  
           
          //  window.print();
			this.submitBtnDisaple=false;
			
			 this.showSnackBarT(this.messageSave, 'sb-success');
			//this.refFacture = '';
			this.products=[];
		
			//this.refrecheBrd();
			//window.location.reload();
			 
  
			
          }
          else {

            this.showSnackBarT(data['message'], 'sb-error');

          }
this.submitBtnDisaple=false;
        }
        //,err => alert('erreur los call from angular '+err)// complete
      );





    }
    else
      this.showSnackBarT("There is no product in the invoice");
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
  showSnackBarT = function (message: string, type: string) {
    this.snackBar.open(message, null, {
      duration: '400',
      extraClasses: [type]
    })
  }
  
  
  print(){
	  window.print();
  }
  
  
  displayFn(value: any): string {
    // this.currentState=value;

    if (typeof value === 'object') {
    //  this.myProduct = value;


    }

    return value && typeof value === 'object' ? value.refFacture + " " + value.total + " " : value;
  }
   filter(name: string): Facture[] {
    return this.AllFactureFliter.filter(option =>
	 option.refProduct.indexOf(String(name)) === 0||option.indexOf(name) === 0);
     
  }
  getUpdateNumcompte(evt) {
	
    }
	
	
	 refrecheBrd(){
	 this.router.navigate(["product/bord-add"]);
	  
  }
}