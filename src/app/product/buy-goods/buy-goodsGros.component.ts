import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
// import { Account } from './account';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from "lodash";

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Headers } from '@angular/http';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

//import { SimpleNotificationsModule } from 'angular2-notifications';

//import {Headers} from 'angular2/http';

import { MatSnackBar } from '@angular/material';
import { CanActivate } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
import { ProductAutoComponent } from '../auto-product/productAuto.component';
import { Product } from 'app/services/product';
import { AuthHttp, ProductService, FactureService } from 'app/services/index';
import { Account } from 'app/accounts/accounting/account';


import {
  trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('true', style({
      'max-height': '250px', 'opacity': '1', 'visibility': 'visible'
    })),
    state('false', style({
      'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
    })),
    transition('true => false', [group([
      animate('400ms ease-in-out', style({
        'opacity': '0'
      })),
      animate('600ms ease-in-out', style({
        'max-height': '0px'
      })),
      animate('700ms ease-in-out', style({
        'visibility': 'hidden'
      }))
    ]
    )]),
    transition('false => true', [group([
      animate('1ms ease-in-out', style({
        'visibility': 'visible'
      })),
      animate('600ms ease-in-out', style({
        'max-height': '250px'
      })),
      animate('800ms ease-in-out', style({
        'opacity': '1'
      }))
    ]
    )])
  ]),
]

@Component({
  selector: 'buy-goodsGros',
  templateUrl: './buy-goodsGros.component.html',
  styleUrls: ['./buy-goodsGros.component.scss'],
  animations: [SlideInOutAnimation]
})
export class BuyGoodsGrosComponent implements OnInit {
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
  restAccout: boolean = false;
  livred: true;
  //public header:Header;
  // public account:Account;
  errorMsg: string;
  userStatus: string;
  private data: any;
  //reset:boolean =true;
  gridShowHideFlag: boolean = false;
  AllProductList: any;
  typePaiement: string = "ESPECE";
  messageSave: '';
  restForm = false;
  currentCompte = '';
  submitBtnDisaple: boolean = false;
  newFact: boolean = true;
  clientNom = '';
  nomClient = '';
  private sub: any;
  modifiedFact = true;
  todayDate = new Date().toISOString().slice(0, 10);
  startPrint = false;
  constructor(private fb: FormBuilder, private http: AuthHttp, private translate: TranslateService, private router: Router, public snackBar: MatSnackBar, private prdSer: ProductService, private factSer: FactureService, private route: ActivatedRoute) {
    this.http = http;


  }
  ngOnInit() {
    if (!this.http.isAuthentified()) {
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
    let sociteFromSt = localStorage.getItem('company');

    if (sociteFromSt) {

      this.socite = JSON.parse(sociteFromSt);

      this.livred = this.socite['livred'];
      if (this.socite['tax'])
        this.tax = this.socite['tax'];


    }
    let re = localStorage.getItem('restForm');
    if (re) {
      if (re == 'true')
        this.restForm = true;
    }
    this.prdSer.getAllProudctFact().subscribe(data => { this.AllProductList = data; });
    this.messageSave = this.translate.instant('saveAvecSucces');


    this.sub = this.route.params.subscribe(params => {
      let idPrd = params['id'];
      // (+) converts string 'id' to a number
      if (idPrd) {

        this.factSer.geFactureDetail(idPrd).subscribe(data => {

          this.products = data['operationLigne'];
          this.livred = data['livred'];
          this.refFacture = idPrd;
          this.typePaiement = data['typePaiement'];
          if (this.livred) {
            this.modifiedFact = false;
          }

          this.todayDate = new Date(data['dateOperation']).toISOString().slice(0, 10);

          this.currentCompte = data['numCompte'];
          this.nomClient = data['nomClient'];

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
    id: '',
    qntDisp: 0,
  };
  getNotification(evt) {
	 
    if (evt != undefined) {
	
      var ac: Product;
      ac = evt;
      // alert('product '+evt['refProduct']);
      this.product.refProduct = evt['refProduct'];
      this.product.libelle = evt['libelle'];
      this.product.price = evt['price'];
      this.product.id = this.uuidv4();
	  this.product.qntDisp=evt['balance'];
      this.product.total = this.product.price * this.product.qnt;
      this.checkOut();
    }
    // Do something with the notification (evt) sent by the child!
  }

  gridShowHide(value) {
    this.gridShowHideFlag = value;
  }

  bareCodeInsert(value) {

   // debugger;
    //console.log(this.AllProductList);
    //console.log(value);
    var selectedProduct = "";
    for (var i = 0; i < this.AllProductList.length; i++) {
      if (this.AllProductList[i].codeBare == value) {
        selectedProduct = this.AllProductList[i];
      }
    }
    this.getNotification(selectedProduct);
  }
  checkOut = function () {
    if (this.product.refProduct == "")
      this.showSnackBar("Select Product");

    else if (this.product.total == 0) {
      this.showSnackBar("Check Quantity or Price, it is not valid");
    } else {

      let added = false;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].refProduct == this.product.refProduct) {
          added = true;
          this.products[i].qnt = this.product.qnt + this.products[i].qnt;
          this.products[i].total = this.products[i].qnt * this.products[i].price;
		  	
        }

      }
      if (!added) {
	
        this.products.push({ refProduct: this.product.refProduct, libelle: this.product.libelle, price: this.product.price, qnt: this.product.qnt, total: this.product.total });
        this.products = [...this.products];
	 
      }
      this.product.refProduct = '';
      this.product.libelle = '';
      this.product.price = 0;
      this.product.qnt = 1;
      this.product.total = 0;
      this.netTotal = 0;
      this.grandTotal = 0;
      for (var i = 0; i < this.products.length; i++) {
        this.netTotal += Object.assign(this.products[i].total);
        this.grandTotal += Object.assign(this.products[i].total);
      }
    }
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);

    //console.log(this.vm);
  }


  fullUpdate() {
    this.form.patchValue({ libelle: 'Partial', password: 'monkey' });
  }
  reset() {
    this.form.reset();
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
    typePaiement: 'ESPECE',
    operationLigne: [],
    livred: this.livred,
    numCompte: '',
    nomClient: ''

  }

  signUp = function () {
    if (this.products.length > 0 && !this.submitBtnDisaple) {
      this.submitBtnDisaple = true;
      //this.factureJeson.operationLigne.value=JSON.stringify(this.products);
      this.startPrint = false;
      let formData = this.factureJeson;
      formData['operationLigne'] = this.products;
      formData['typePaiement'] = this.typePaiement;
      formData['livred'] = this.livred;
      if (this.refFacture != '') {
        formData['refFacture'] = this.refFacture;
      }
      formData['numCompte'] = this.currentCompte;
      formData['nomClient'] = this.nomClient;

      this.http.post(`/facture/saveFacture`, formData).subscribe(
        (data) => {


          if (!data['message'] || data['message'] == '' || data['message'] == "") {
			  this.showSnackBarT(this.messageSave, 'sb-success');
            this.refFacture = data['refFacture'];            
            if (this.livred) {
              this.modifiedFact = false;
            }
            else {
              this.modifiedFact = true;
            }
            this.submitBtnDisaple = false;
            if (this.restForm) {
              setTimeout(function () {
              window.print();
            }, 500);
              
			 
       this.restAll();
            }
            
          }
          else {

            this.showSnackBarT(data['message'], 'sb-error');

          }
          this.submitBtnDisaple = false;
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
      duration: '300',
      extraClasses: [type]
    })
  }




  getUpdateNumcompte(evt) {
    this.currentCompte = '';
    if (evt && evt['numAccount']) {
      this.currentCompte = evt['numAccount'];
      this.nomClient = evt['libelle'];
    }

  }

  print() {


    window.print();


  }
  
  restAll(){
	         this.products = [];
              this.restAccout = true;
              this.currentCompte = '';
              this.typePaiement = 'ESPECE';
              this.newFact = true;
              this.modifiedFact = true;
              this.nomClient = '';
			  this.refFacture ='';
  }
}