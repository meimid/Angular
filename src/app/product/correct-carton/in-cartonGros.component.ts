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
import { ProductAutoComponent } from '../auto-product/productAuto.component';
import { Product } from 'app/services/product';
import { Facture } from 'app/services/facture';

import { AuthHttp, ProductService,FactureService } from 'app/services/index';
import { Account } from 'app/accounts/accounting/account';
import { Observable } from 'rxjs/Observable';
import { CartonAutoComponent } from '../auto-carton/cartAuto';
import { Carton } from 'app/services/carton';

@Component({
  selector: 'in-cartonGros',
  templateUrl: './in-cartonGros.component.html',
  styleUrls: ['./in-cartonGros.component.scss']
})
export class InCartonGrosComponent implements OnInit {
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

      message: ''
    });
	this.products = [];
	this.filteredOptions=this.factSer.getAllNlivredFacture()
	this.filteredOptions.subscribe(data => {		 
		this.AllFactureFliter=data;});
		
		

 
		this.filteredOptions = this.stateCtrl.valueChanges
      .startWith(null)
     .debounceTime(400)
      .map(user => user && typeof user === 'object' ? user.compte : user)
      .map(name => name ? this.filter(name) : this.AllFactureFliter);


		
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
this.prdSer.getAllProudct().subscribe(data => { this.AllProductList = data; });
this.messageSave=this.translate.instant('saveAvecSucces'); 


 this.sub = this.route.params.subscribe(params => {
       let idEnt = params['id']; 
	   // (+) converts string 'id' to a number
	   if(idEnt ){
		   
		   if(idEnt=='S')
			   this.typeOp='S';
		   
	  
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
	numCartons: 0,
    refProduct: '',
    libelle: '',
    price: 0,
    qnt: 1,
    total: 0,
	poids:0,
	nbCartons:1,
    id: ''
  };
  getNotification(evt) {
    if (evt != undefined) {

       var ac: Carton;
      ac = evt;
      // alert('product '+evt['refProduct']);
      this.product.numCartons = evt['numCartons'];
      this.product.libelle = evt['libelle'];
      this.product.poids = evt['poids'];
      this.product.id = this.uuidv4();
      this.product.total = this.product.poids * this.product.qnt;
      this.checkOut();
    }
    // Do something with the notification (evt) sent by the child!
  }

  gridShowHide(value) {
    this.gridShowHideFlag = value;
  }

  checkOut = function () {
    if (this.product.numCartons == "")
      this.showSnackBar("Select Carton");

    else if (this.product.total == 0) {
      this.showSnackBar("Check Quantity or Price, it is not valid");
    } else {

      let added = false;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].numCartons == this.product.numCartons) {
          added = true;
          this.products[i].qnt = this.product.qnt + this.products[i].qnt;
         
        }

      }
      if (!added) {
        this.products.push({numCartons: this.product.numCartons, libelle: this.product.libelle, poids: this.product.poids,nbCartons:this.product.nbCartons, qnt: this.product.qnt, total: this.product.total });
       this.products=[...this.products];
      }
	   this.product.numCartons = 0;
      this.product.libelle = '';
      this.product.price = 0;
	  this.product.poids = 0;
      this.product.qnt = 1;
      this.product.total = 0;
	  this.nbCartons=1
      this.netTotal = 0;
      this.grandTotal = 0;
      for (var i = 0; i < this.products.length; i++) {
        this.netTotal += Object.assign(this.products[i].total);
        this.grandTotal += Object.assign(this.products[i].total);
      }
    }
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
    for (let i = 0; i < this.products.length; i++) {
      total += (this.products[i].price * this.products[i].qnt);
    }
    return total;
  }

  getCalculatedTax() {
	  
    return ((this.tax * this.getSubTotal()) / 100);
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
        formData['refFacture'] = this.refFacture;
      }
	   formData['typeOp'] =  this.typeOp;
	 
	  
	    if (this.remarque != '') {
        formData['remarque'] = this.remarque;
      }
	  
	  formData['numCompte'] = this.currentCompte;
	  
      this.http.post(`/products/saveBordEntSrtCart`, formData).subscribe(
        (data) => {
           
		 
          if (!data['message'] || data['message'] == '' || data['message'] == "") {
			  if(this.livred){
		  this.modifiedFact=false;
		  }
		  else {
			   this.modifiedFact=true;
		  }
            this.refFacture = data['refFacture'];
            			
            window.print();
			this.submitBtnDisaple=false;
			if(this.restForm){
			this.products = [];
			this.restAccout=true;
		     this.currentCompte='';

			 this.newFact=true;
			 this.modifiedFact=true;
			  
          
			}
			 this.showSnackBarT(this.messageSave, 'sb-success');
			//this.refFacture = '';
			
			 
  
			
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

    return value && typeof value === 'object' ? value.numCartons + " " + value.total + " " : value;
  }
   filter(name: string): Facture[] {
    return this.AllFactureFliter.filter(option =>
	 option.refProduct.indexOf(String(name)) === 0||option.indexOf(name) === 0);
     
  }
  getUpdateNumcompte(evt) {
	 this.currentCompte='';
	 if(evt &&evt['numAccount']){
	this.currentCompte=	 evt['numAccount'];
	 }
	//  var ac: Account;
	
	// this.restAccout=true;
    //  this.form.patchValue({numCompteTo: ac.numAccount,name: ac.libelle});
        // Do something with the notification (evt) sent by the child!
    }
}