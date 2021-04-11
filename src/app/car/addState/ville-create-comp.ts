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
import {Ville}   from 'app/services/ville';



@Component({
  selector: 'app-product-create-comp',
  templateUrl: './ville-create-comp.html',
  styleUrls: ['./state-create-comp.component.scss']
})

export class VilleCreateCompComponent implements OnInit {
	 public form =null;
	// public form =FormGroup
	 public http:AuthHttp;
		messageSave :string;
	disableAccount :boolean =false;
	 isValid:boolean =false;
	 //public header:Header;
	 ville:Ville
	
     public static PATH:string = '/products/saveCat';
     errorMsg: string;	
	 userStatus: string;	
     private data: any;
	   refPrd:'';
   private sub: any;
   newVille=true;
   AllState: any;
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
      code: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
	  codePostal: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
      newState:true,		  
      message:''
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	
	
	 this.carSer.getAllState().subscribe(data => { this.AllState = data; });	
	
	
	
  }
  
  onSubmit(form: any): void {  
    console.log('you submitted value:', form); 
	
	//console.log(this.vm);
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
  
    doSaveVille() {
		
		
       let formData = this.form.value;
       let header = new Headers();
	   this.ville=new Ville(formData.code,formData.libelle,formData.codePostal);
	   header.append('Content-Type', 'application/json');
	  
   
   
	this.carSer.saveVille(this.ville).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
				 this.showSnackBarT(this.messageSave,'sb-success');	

				this.form.patchValue({code: data['code']});
				this.form.patchValue({newVille: false});
				//this.newVille=false;
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