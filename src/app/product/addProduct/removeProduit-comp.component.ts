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
  templateUrl: './removeProduit-comp.component.html',
  styleUrls: ['./product-create-comp.component.scss']
})

export class RemoveProduitCompComponent implements OnInit {
	 public form =null;
	// public form =FormGroup
	 public http:AuthHttp;
		messageSave :string;
	disableAccount :boolean =false;
	 isValid:boolean =false;
	 //public header:Header;
	
     public static PATH:string = '/products/saveCat';
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
	   refPrd:'';
   private sub: any;
   
   remove=false;
	 products=[]
  constructor(private prdSer :ProductService,private fb: FormBuilder, http: AuthHttp,private translate: TranslateService,private router: Router,private route: ActivatedRoute, private snackBar: MatSnackBar) {
	  this.http=http;
	 
	  
	
  }

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
	   
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      refProduct:'',	
      newCat:true,
      qnt:0,	  
      message:''
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	
	
	
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
  
    doRemoveProduct() {
		
		
       let formData = this.form.value;
      // let header = new Headers();
	  // header.append('Content-Type', 'application/json');
	  
    let idPrd =formData['refProduct'];
   
	this.prdSer.removeProduct(idPrd).subscribe(
        (data) => {
			
			 
			if(data['libelle']==''){
				 this.showSnackBarT(this.messageSave,'sb-success');	

				
				//this.newCat=true;
				this.form.reset();
				this.remove=false;
				}
			else {
	         
		      this.showSnackBarT(data['libelle'],'sb-error');
			  
		    
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

  onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }
	 
  
   doLookProduct() {
	  let formData = this.form.value;
	  let idPrd =formData['refProduct'];
	    this.remove=false;
	  this.prdSer.validateProduct(idPrd).subscribe(data => {
			   
			  // this.form.patchValue({refProduct: data['refProduct']});
			   this.form.patchValue({libelle: data['libelle']});
			  // this.form.patchValue({qnt: data['price']});
			   //this.form.patchValue({priceA: data['priceA']});
			   //this.form.patchValue({codeBare: data['codeBare']});
			   this.form.patchValue({qnt: data['balance']});
			   this.remove=true;
			   //this.form.patchValue({seuilMin: data['quntite']});
			   //this.form.patchValue({refCat: data['refCat']});
			   //this.form.patchValue({newProduct: false});
			   //this.newProduct=false;
				 
		   });
	  
  }
  

  
}