import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

import { Http, Response } from '@angular/http';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { AuthHttp, ProductService } from 'app/services/index';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/services/product';
import { Router, CanActivate } from '@angular/router';
@Component({
  selector: 'prd-autodisp',
  templateUrl: './productDispAuto.component.html',
  styleUrls: ['./productAuto.component.scss']
})
export class ProductDispAutoComponent implements OnChanges, OnInit {
  public form: FormGroup;

  @Input()
  refProduct: string;
  @Input()
  libelle: string;
  product: Product = new Product('', '', 0);
  @Input()
  reste: boolean = false;


  @Output()
  gridShowHide = new EventEmitter<boolean>();
  @Output()
  changeProduct = new EventEmitter<Product>();
  @Output()
  bareCodeInsert = new EventEmitter<boolean>();

  filteredOptions: Observable<Product[]>;
  AllPersonneFliter: any;
  selectedProduct: Product;
  gridShowHideFlag: boolean = false;
  BareCodevalue: any;

  constructor(private fb: FormBuilder, translate: TranslateService, private prdSer: ProductService, private router: Router, private http: AuthHttp, ) {
    this.form = this.fb.group({
      libelle: '',
      refProduct: '',
      compte: ''

    });
  //  this.prdSer.getAllProudctDisp().subscribe(data => { this.AllPersonneFliter = data; });
  }


  ngOnInit() {

    if (!this.http.isAuthentified()) {
      this.router.navigate(["Accounts/login"]);

    }


    this.filteredOptions = this.prdSer.getAllProudctDisp();
    this.filteredOptions.subscribe(data => {
      this.AllPersonneFliter = data;
    });
    this.filteredOptions = this.form.valueChanges
      .startWith(null)
      .debounceTime(400)
      .map(user => user && typeof user === 'object' ? user.compte : user)
      .map(name => name ? this.filter(name) : this.AllPersonneFliter);


    /*this.filteredOptions = this.myControl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.AllPersonneFliter.slice());
	    this.filteredOptions =this.form.valueChanges
        .startWith(this.AllPersonneFliter)
		.debounceTime(400)		
        .map(user => user && typeof user === 'object' ? user.compte : user)
        .map(name => name ? this.filter(name) : this.AllPersonneFliter);
	*/

  }

  selectedItemChange = function (prd: any) {
    // some stuff with selectedItem
    if (this.form.controls['compte'].value != undefined) {

      this.changeProduct.emit(this.form.controls['compte'].value);
      // this.form.controls['compte'].value=undefined;
      this.form.reset();
    }

  };

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.reste) {

      this.form.patchValue({ libelle: '', refProduct: '' });

      this.reste = false;
    }

  }


  myProduct: Product;
  displayFn(value: any): string {
    // this.currentState=value;

    if (typeof value === 'object') {
      this.myProduct = value;


    }

    return value && typeof value === 'object' ? value.libelle + " " + value.refProduct + " " : value;
  }


  // filterAccount(val: string) {
  //   return val ? this.accounts.filter((s) => s.libelle.match(new RegExp(val, 'gi'))) : this.accounts;
  // }

  filter(name: string): Product[] {
    return this.AllPersonneFliter.filter(option =>
      option.libelle.toLowerCase().indexOf(name) === 0 || option.refProduct.toLowerCase().indexOf(name) === 0);
    //option.name.toLowerCase().indexOf(name) === 0);
    // option.name.indexOf(name) === 0);
  }

  showGrid() {
    this.gridShowHideFlag = !this.gridShowHideFlag;
    this.gridShowHide.emit(this.gridShowHideFlag);
  }

  getBareCode(evn) {
    if (evn.keyCode == 13) {
      this.bareCodeInsert.emit(this.BareCodevalue);
      this.BareCodevalue = "";
    }
  }

}


