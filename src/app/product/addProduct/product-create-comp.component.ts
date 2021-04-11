import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Headers } from '@angular/http';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { CanActivate } from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
//import {HttpService } from 'app/services/index';
import {Config}   from 'app/services/index';
//import {ToasterService,ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {AuthHttp,ProductService } from 'app/services/index';


@Component({
  selector: 'app-product-create-comp',
  templateUrl: './product-create-comp.component.html',
  styleUrls: ['./product-create-comp.component.scss']
})

export class ProductCreateCompComponent implements OnInit {
	 public form =null;
	// public form =FormGroup
	 public http:AuthHttp;
		messageSave :string;
	disableAccount :boolean =false;
	 isValid:boolean =false;
	 //public header:Header;
	
     public static PATH:string = '/products/saveProduct';
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
	   refPrd:'';
   private sub: any;
   newProduct=true;
	 products=[]
	  category=[]
  constructor(private prdSer :ProductService,private fb: FormBuilder, http: AuthHttp,private translate: TranslateService,private router: Router,private route: ActivatedRoute, private snackBar: MatSnackBar) {
	  this.http=http;
	 
	  
	
  }

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
	    this.products=[]
	    this.sub = this.route.params.subscribe(params => {
       let idPrd = params['id']; // (+) converts string 'id' to a number
	   if(idPrd ){
		   
		   this.prdSer.validateProduct(idPrd ).subscribe(data => {
			   
			   this.form.patchValue({refProduct: data['refProduct']});
			   this.form.patchValue({libelle: data['libelle']});
			   this.form.patchValue({price: data['price']});
			   this.form.patchValue({priceA: data['priceA']});
			   this.form.patchValue({codeBare: data['codeBare']});
			   this.form.patchValue({balance: data['balance']});
			   this.form.patchValue({seuilMin: data['quntite']});
			   this.form.patchValue({refCat: data['refCat']});
			   this.form.patchValue({newProduct: false});
			   this.newProduct=false;
				 
		   });
	  
	   }
  
       // In a real app: dispatch action to load the details here.
    });
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      refProduct:'',
	  price:'',
      priceA:'',
	  codeBare:'',
      balance:'',
	  seuilMin:'',	
     newProduct:true,	
      refCat:'',	 
      message:''
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	
	 this.prdSer.getAllCategory().subscribe(data => {			   
			   this.category=data;
	 });
	
	
	
	
  }
  
  onSubmit(form: any): void {  
    console.log('you submitted value:', form); 
	
	//console.log(this.vm);
  }
  
  
 fullUpdate() {
    this.form.patchValue({libelle: 'Partial', password: 'monkey'});
}
  reset() {
    this.form.reset();
}



showSnackBar(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, 'OK', config);
    }
	
	
	showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
    }
	
redirect() {
    this.router.navigate(['product/listPrd']);
  }

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public deleteId: string;

    public temp: boolean[] = [true, false];

isActive:boolean=false;
  
    doSaveProduct() {
		
		
       let formData = this.form.value;
       let header = new Headers();
	   header.append('Content-Type', 'application/json');
	  
   
   
	this.http.post(ProductCreateCompComponent.PATH, formData).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
				 this.showSnackBarT(this.messageSave,'sb-success');	
                 let quntite=this.form.value['seuilMin'];
				
				this.form.patchValue({refProduct: data['refProduct']});
				this.form.patchValue({newProduct: false});
				 this.products.push({refProduct: data['refProduct'],libelle: data['libelle'],price: data['price'],priceA: data['priceA'],balance: data['balance'],seuilMin: quntite})
			  
				// let ctrl = this.form.get('numCompte');
				// ctrl.disabled();
				//this.form.controls['numCompte'].disabled();
	             this.newProduct=true;
				 this.form.reset();
				//this.account=data;
			}
			else {
	         
		      this.showSnackBarT(data['message'],'sb-error');
			  
		     //let mess: string= this.account.message as string;
		     //this.show_message("mess");
		      //alert(''+mess);
		     //this._service.success('bla', mess);
			}
          
        }
		//,err => alert('erreur los call from angular '+err)// complete
    );
	
	
	
	
  }
  
  
  showSnackBarT = function(message: string, type : string){
    this.snackBar.open(message,null,{
      duration : '2000',
      extraClasses : [type]
    })
  }
  updateProduct(data:any){
	           this.form.patchValue({refProduct: data['refProduct']});
			   this.form.patchValue({libelle: data['libelle']});
			   this.form.patchValue({price: data['price']});
			   this.form.patchValue({priceA: data['priceA']});
			   this.form.patchValue({codeBare: data['codeBare']});
			   this.form.patchValue({balance: data['balance']});
			   this.form.patchValue({seuilMin: data['seuilMin']});
			   this.form.patchValue({newProduct: false});
			   this.newProduct=false;
	  
  }
  onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }
	 
  
  
  

  
}