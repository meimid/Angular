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

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
import { BillService } from '../../services/bill.service';
import { ProductAutoComponent } from '../auto-product/productAuto.component';
import { Product } from 'app/services/product';
import { AuthHttp, ProductService } from 'app/services/index';
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
  selector: 'buy-goods',
  templateUrl: './buy-goods.component.html',
  // template: '<simple-notifications [options]="options"></simple-notifications>',
  styleUrls: ['./buy-goods.component.scss'],
  animations: [SlideInOutAnimation]
})
export class BuyGoodsComponent implements OnInit {
  public form = null;
  // public form =FormGroup
  billService = new BillService();
  bill = this.billService.getBill();
  socite = {
    libelle: 'Company Name',
    adresse: 'BLA BLA',
    email: '',
    tel: ' 55555',
    url: '',
    tax: 0
  };
  refFacture = '';
  restAccout: boolean = false;
  livred: true;
  //public header:Header;
  // public account:Account;
  public static PATH: string = 'http://diffter.com/creditAJS//admin/saveAccount';
  errorMsg: string;
  userStatus: string;
  private data: any;
  //reset:boolean =true;
  gridShowHideFlag: boolean = false;
  AllProductList: any;
  typePaiement: string = "ESPECE";
  messageSave: '';
  restForm = true;
  currentCompte = '';
  currentCompteName = '';
  submitBtnDisaple: boolean = false;
  newFact: boolean = true;
  paidAmmount = 0;
  todayDate = new Date();
  constructor(private fb: FormBuilder, private http: AuthHttp, private translate: TranslateService, private router: Router, public snackBar: MatSnackBar, private prdSer: ProductService) {
    this.http = http;


  }
  ngOnInit() {
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      numCompte: '',
      numPersonne: '',
	  nomClient: '',
      adresse: '',
      tel: ' ',
      type: ' ',

      message: ''
    });
    let sociteFromSt = localStorage.getItem('company');

    if (sociteFromSt) {

      this.socite = JSON.parse(sociteFromSt);
      this.livred = this.socite['livred'];
      if (this.socite['tax'])
        this.tax = this.socite['tax'];


    }
    let re = localStorage.getItem('restForm');
    if (!re) {
      if (re == 'false')
        this.restForm = false;
    }
    this.prdSer.getAllProudct().subscribe(data => { this.AllProductList = data; });
    this.messageSave = this.translate.instant('saveAvecSucces');
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

      var ac: Product;
      ac = evt;
      // alert('product '+evt['refProduct']);
      this.product.refProduct = evt['refProduct'];
      this.product.libelle = evt['libelle'];
      this.product.price = evt['price'];
      this.product.id = this.uuidv4();
	  if(this.product.price == undefined)
	  this.product.price=1
      this.product.total = this.product.price * this.product.qnt;
      this.checkOut();
    }
    // Do something with the notification (evt) sent by the child!
  }

  gridShowHide(value) {
    this.gridShowHideFlag = value;
  }

  bareCodeInsert(value) {
    //debugger;
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
      for (var i = 0; i < this.bill.products.length; i++) {
        if (this.bill.products[i].refProduct == this.product.refProduct) {
          added = true;
          this.bill.products[i].qnt = this.product.qnt + this.bill.products[i].qnt;
          this.bill.products[i].total = this.bill.products[i].qnt * this.bill.products[i].price;
        }
      }

      this.bill.customer.name = "Customer Name";
      this.bill.customer.accountNumber = "123-123-123-345";
      this.bill.customer.detail = "This are good product, Please come again";
      this.bill.customer.libelle = this.product.libelle;
      this.bill.customer.refProduct = this.product.refProduct;
      this.bill.customer.refProduct = this.product.refProduct;


      if (!added) {
        this.bill.products.push({ refProduct: this.product.refProduct, libelle: this.product.libelle, price: this.product.price, qnt: this.product.qnt, total: this.product.total });
        this.bill.products = [...this.bill.products]
      }
      this.product.refProduct = '';
      this.product.libelle = '';
      this.product.price = 0;
      this.product.qnt = 1;
      this.product.total = 0;
      this.netTotal = 0;
      this.grandTotal = 0;
      for (var i = 0; i < this.bill.products.length; i++) {
        this.netTotal += Object.assign(this.bill.products[i].total);
        this.grandTotal += Object.assign(this.bill.products[i].total);
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

  doSaveAccount() {
    //this.service
    //this.withOverride();

    let formData = this.form.value;
    let header = new Headers();
    header.append('Content-Type', 'application/json');


    this.http.post(BuyGoodsComponent.PATH, formData, { headers: header })
      .map((res: Response) => res.json())
      .subscribe(
      (data) => {
        this.form = data;

      },
      err => alert('erreur los call from angular ' + err)// complete
      );
  }

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
    this.bill.products.splice(this.bill.products.indexOf(row), 1);


  }

  invoiceTotals: any = [{
    'subtotal': this.getSubTotal(),
    'tax': this.getCalculatedTax(),
    'discount': 0.00,
    'total': 0
  }];

  getSubTotal() {
	  
	 
    let total = 0.00;
    for (let i = 0; i < this.bill.products.length; i++) {
      total += (this.bill.products[i].price * this.bill.products[i].qnt);
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
    numCompte: ''

  }

  signUp = function () {
    if (this.bill.products.length > 0 && !this.submitBtnDisaple) {
      this.submitBtnDisaple = true;
      //this.factureJeson.operationLigne.value=JSON.stringify(this.bill.products);

      let formData = this.factureJeson;
      formData['operationLigne'] = this.bill.products;
      formData['typePaiement'] = this.typePaiement;
      formData['livred'] = this.livred;
      if (this.refFacture != '' && !this.restForm) {
        alert('this.refFacture  ' + this.refFacture);
        formData['refFacture'] = this.refFacture;
      }
      formData['numCompte'] = this.currentCompte;
	  formData['nomClient'] = this.currentCompteName;
	  


      //this.restAccout=false;
      this.bill.customer.typePaiement = this.typePaiement;
      this.bill.customer.paid = this.paidAmmount;
      this.http.post(`/facture/saveFacture`, formData).subscribe(
        (data) => {
          this.newFact = false;
          if (this.livred) {
            this.newFact = false;
          }
          if (!data['message'] || data['message'] == '' || data['message'] == "") {
            this.showSnackBarT(this.messageSave, 'sb-success');
            this.refFacture = data['refFacture'];
            this.submitBtnDisaple = false;
            var that = this;
			/*
            setTimeout(function () {
              window.print();
              that.clearForm()

            }, 500);
			*/
            if (!this.restForm) {
              this.bill.products = [];
              this.restAccout = true;
              this.currentCompte = '';
			  this.currentCompteName = '';
              this.typePaiement = 'ESPECE';
              this.newFact = true;
              this.livred = true;
              this.bill.customer.paid = false;
              this.paidAmmount = 0;
              this.netTotal = 0;
            }

            //this.refFacture = '';
          }
          else {
            this.showSnackBarT(data['message'], 'sb-error');
          }
          this.submitBtnDisaple = false;

          //this.router.navigate(['./product/buy-goods-print']);
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
      duration: '200',
      extraClasses: [type]
    })
  }


  printFun() {
    window.print();
    this.refFacture = '';
  }

  clearForm() {
    this.bill.products = [];
    this.restAccout = true;
    this.currentCompte = '';
	this.currentCompteName= '';
    this.typePaiement = 'ESPECE';
    this.newFact = true;
    this.livred = true;
    this.refFacture = '';
    this.bill.customer.paid = false;
    this.paidAmmount = 0;
    this.netTotal = 0;
  }



  getUpdateNumcompte(evt) {
    this.currentCompte = '';
	this.currentCompteName= '';
    if (evt && evt['numAccount']) {
	   this.currentCompte = evt['numAccount'];
	  this.currentCompteName= evt['libelle'];
	}
    //  var ac: Account;

    // this.restAccout=true;
    //  this.form.patchValue({numCompteTo: ac.numAccount,name: ac.libelle});
    // Do something with the notification (evt) sent by the child!
  }
}