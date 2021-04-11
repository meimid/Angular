import { Component, OnInit } from '@angular/core';
//import {formatNumber} from '@angular/common';
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
@Component({
  selector: 'app-sell-goods',
  templateUrl: './sell-goods.component.html',
  styleUrls: ['./sell-goods.component.scss']
})

export class SellGoodsComponent implements OnInit {

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
  public static PATH: string = 'http://diffter.com/creditAJS//admin/saveAccount';
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
  private sub: any;
  modifiedFact = true;
  todayDate = new Date().toISOString().slice(0, 10);
  startPrint=false;
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
    this.prdSer.getAllProudct().subscribe(data => { this.AllProductList = data; });
    this.messageSave = this.translate.instant('saveAvecSucces');


    this.sub = this.route.params.subscribe(params => {
      let idPrd = params['id'];
      // (+) converts string 'id' to a number
      if (idPrd) {

        this.factSer.geFactureFournDetail(idPrd).subscribe(data => {

          this.products = data['operationLigne'];
          this.livred = data['livred'];
          this.refFacture = idPrd;
          this.typePaiement = data['typePaiement'];
          if (this.livred) {
            this.modifiedFact = false;
          }

          this.todayDate = new Date(data['dateOperation']).toISOString().slice(0, 10);

          this.currentCompte = data['numCompte'];
          this.clientNom = data['nomClient'];

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

      var ac: Product;
      ac = evt;
      // alert('product '+evt['refProduct']);
      this.product.refProduct = evt['refProduct'];
      this.product.libelle = evt['libelle'];
      this.product.price = evt['priceA'];
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
        this.products=[...this.products];
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
    numCompte: ''

  }

  signUp = function () {
    if (this.products.length > 0 && !this.submitBtnDisaple) {
      this.submitBtnDisaple = true;
      //this.factureJeson.operationLigne.value=JSON.stringify(this.products);
 this.startPrint=false;
      let formData = this.factureJeson;
      formData['operationLigne'] = this.products;
      formData['typePaiement'] = this.typePaiement;
      formData['livred'] = this.livred;
      if (this.refFacture != '') {
        formData['refFacture'] = this.refFacture;
      }
      formData['numCompte'] = this.currentCompte;

      this.http.post(`/facture/saveFactureFourn`, formData).subscribe(
        (data) => {


          if (!data['message'] || data['message'] == '' || data['message'] == "") {
			  this.refFacture = data['refFacture'];
			  this.showSnackBarT(this.messageSave, 'sb-success');
            if (this.livred) {
              this.modifiedFact = false;
            }
            else {
              this.modifiedFact = true;
            }
            

            
            this.submitBtnDisaple = false;
            if (this.restForm) {
              this.products = [];
              this.restAccout = true;
              this.currentCompte = '';
              this.typePaiement = 'ESPECE';
              this.newFact = true;
              this.modifiedFact = true;


            }
			let that=this;
           // this.startPrint=true;
			
              setTimeout(function () {
             // window.print();
			   that.clearForm();
            }, 500);
             

          
          //this.PrintFact();

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
      duration: '400',
      extraClasses: [type]
    })
  }


 

  getUpdateNumcompte(evt) {
    this.currentCompte = '';
    if (evt && evt['numAccount']) {
      this.currentCompte = evt['numAccount'];
    }

  }
  
  print = function (){
	   
	  if (this.startPrint){
		  
		window.print();
	  }
		
	}
	
	 clearForm() {
    this.products = [];
    this.restAccout = true;
    this.currentCompte = '';
    this.typePaiement = 'ESPECE';
    this.newFact = true;
    this.livred = true;
    this.refFacture = '';
   // this.bill.customer.paid = false;
   // this.paidAmmount = 0;
    this.netTotal = 0;
  }
  



}