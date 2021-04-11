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
  templateUrl: './category-create-comp.component.html',
  styleUrls: ['./product-create-comp.component.scss']
})

export class CategoryCreateCompComponent implements OnInit {
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
   newCat=true;
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
      refCat:'',	
      newCat:true,		  
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
  
    doSaveProduct() {
		
		
       let formData = this.form.value;
       let header = new Headers();
	   header.append('Content-Type', 'application/json');
	  
   
   
	this.http.post(CategoryCreateCompComponent.PATH, formData).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
				 this.showSnackBarT(this.messageSave,'sb-success');	

				this.form.patchValue({refCat: data['refCat']});
				this.form.patchValue({newCat: false});
				this.newCat=true;
				this.form.reset();
				}
			else {
	         
		      this.showSnackBarT(data['message'],'sb-error');
			  
		    
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
	 
  
  
  

  
}