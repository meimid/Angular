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
import {AuthHttp,CarService } from 'app/services/index';
import {Marque}   from 'app/services/marque';
import {Localisation } from 'app/services/localisation';


@Component({
  selector: 'app-product-create-comp',
  templateUrl: './localisation-create-comp.component.html',
  styleUrls: ['./state-create-comp.component.scss']
})

export class LocalisationCompComponent implements OnInit {
	 public form =null;
	// public form =FormGroup
	 public http:AuthHttp;
		messageSave :string;
	disableAccount :boolean =false;
	 isValid:boolean =false;
	 //public header:Header;
	 localis:Localisation
	
     public static PATH:string = '/products/saveCat';
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
	   refPrd:'';
   private sub: any;
   newMarque=true;
	 products=[]
  constructor(private carSer :CarService,private fb: FormBuilder, http: AuthHttp,private translate: TranslateService,private router: Router,private route: ActivatedRoute, private snackBar: MatSnackBar) {
	  this.http=http;
	 
	  
	
  }

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
	   
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      idLocalisation:'',	
      newMarque:true,
      numorder: ['', Validators.compose([Validators.required])],	  
      message:''
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	
	
	 this.sub = this.route.params.subscribe(params => {
       let idPrd = params['id']; // (+) converts string 'id' to a number
	 
	   if(idPrd ){
		   this.loadLocal(idPrd);
		   }
  
       // In a real app: dispatch action to load the details here.
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

   

isActive:boolean=false;
  
    doSaveLocalisation() {
		
		
       let formData = this.form.value;
       let header = new Headers();
	   this.localis=new Localisation(formData.idLocalisation,formData.libelle,formData.numorder);
	   header.append('Content-Type', 'application/json');
	  
   
   
	this.carSer.saveLocalisation(this.localis).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
				 this.showSnackBarT(this.messageSave,'sb-success');	

				this.form.patchValue({idLocalisation: data['idLocalisation']});
				this.form.patchValue({newMarque: false});
				this.newMarque=true;
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
	 
  
  loadLocal(idLocal){
	   this.carSer.geLocalisationDetail(idLocal ).subscribe(data => {	
	  this.form.patchValue({idLocalisation: data['idLocalisation'].toString() });
	  this.form.patchValue({newMarque: false});
	   this.form.patchValue({libelle: data['libelle']});
	    this.form.patchValue({numorder:data['numorder']});
		this.newMarque=false;
		  });
  }
  

  
}