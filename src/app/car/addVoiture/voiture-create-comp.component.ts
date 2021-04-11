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
import {Voiture } from 'app/services/voiture';

import {Localisation } from 'app/services/localisation';

@Component({
  selector: 'app-product-create-comp',
  templateUrl: './voiture-create-comp.component.html',
  styleUrls: ['./voiture-create-comp.component.scss']
})

export class VoitureCreateCompComponent implements OnInit {
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
   newVoiture=true;
	 products=[]
	  allModel=[]
	allMarque=[]  
	 currentMarque='' 
	lvoiyure:Voiture;
    allState=[];
    allVile=[];
	allLocalisation=[];
	allEtatComm=[];
	stateTax:number=0;
	taxfed:number=0;
	taxProv:number=0;
	taxProvPourc:number=0;
	frais1:number=0;
	frais2:number=0;
	prixVenteHT:number=0;
	prixAchatHT:number=0;
	prixVenteRef:number=0;
	marge:number=100;
	allfrais:number=0;
	taxProvFrais:number=0;
	taxFedFrais:number=0;
	fraisTranspNKC:number=0;
	fraisTwing:number=0;
	
	allFourn=[];
localis:Localisation;
	
  constructor(private carSer :CarService,private fb: FormBuilder, http: AuthHttp,private translate: TranslateService,private router: Router,private route: ActivatedRoute, private snackBar: MatSnackBar) {
	  this.http=http;
	 
	  
	
  }

  ngOnInit() {
	   if(!this.http.isAuthentified())
	   {
		   this.router.navigate(["Accounts/login"]);
		   
	   }
	    this.products=[]
	   
    this.form = this.fb.group({
      libelle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
	  numChassi:    ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      dateAchat: ['', Validators.compose([Validators.required, CustomValidators.date])],
	  dateVente:'',
	  marque:0,
      year:'',
	  villeAchat:'',
	  color:'',	  
	  model:0,
	  numVoiture:'',
	  numeroLot:['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
	  state:'',
      newVoiture:true,
      prixAchatHT:0,
      taxFed:0,
      taxProv:0,
	  frais1:100,
      frais2:100,
	  prixVenteHT:'',
	  idLocalisation:0,
	  idEtatComercial:0,
	  marge:100,
      message:'',
	  prixVenteRef:0,
   taxFedFrais:0,
   allFrais:0,
   taxProvFrais:0,
   numBooking:'',
   fournisseur:'',
   fraisTwing:0,
   fraisTranspNKC:0
    });
	
	 this.sub = this.route.params.subscribe(params => {
       let idPrd = params['id']; // (+) converts string 'id' to a number
	   //let letVilleachat=''
	   //let letVilleachat=''
	   
	   this.carSer.getAllMarque().subscribe(data => { this.allMarque = data; });
	   if(idPrd ){
		  this.newVoiture=false; 
		   this.loadVoiture(idPrd);
		   }
	
  
       // In a real app: dispatch action to load the details here.
    });
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	
	 this.carSer.getAllModel().subscribe(data => {			   
			   this.allModel =data;
	 });
	
	this.carSer.getAllState().subscribe(data => { this.allState = data; });
	this.carSer.getAllLocalisation().subscribe(data => { this.allLocalisation = data;
	if(this.newVoiture){
	let	idLco=data[0]['idLocalisation'].toString();
	this.form.patchValue({idLocalisation: idLco});
	}

	});
	
	this.carSer.getAllEtatComm().subscribe(data => { this.allEtatComm = data;
	if(this.newVoiture){
	let	idLco=data[0]['idEtatComercial'].toString();
	this.form.patchValue({idEtatComercial: idLco});
	}

	});
	this.carSer.getAllFourn().subscribe(data => { this.allFourn = data;});
	
	
	
	
	
	
	
	
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
  
    doSaveVoiture() {
		
		
       let formData = this.form.value;
       let header = new Headers();
	   header.append('Content-Type', 'application/json');
	   let mar=formData['marque'];
	    let str=formData['state'];
	  this.lvoiyure=new Voiture(formData['numChassi'],formData['libelle'])
      this.lvoiyure.color=formData['color'];
	  this.lvoiyure.numVoiture=formData['numVoiture'];
      this.lvoiyure.setYear(formData['year']);
	  this.lvoiyure.setModel(formData['model']);
	  this.lvoiyure.dateAchat=formData['dateAchat'];
	  this.lvoiyure.dateVente=formData['dateVente'];
	  this.lvoiyure.villeAchat=formData['villeAchat'];
	   this.lvoiyure.setYear(formData['year']);
	    this.lvoiyure.prixAchatHT=formData['prixAchatHT'];
		//this.lvoiyure.tax1=formData['tax1'];
		//this.lvoiyure.tax2=formData['tax2'];
		this.lvoiyure.idLocalisation=formData['idLocalisation'];
		this.lvoiyure.taxFed=this.taxfed;
      this.lvoiyure.taxProv=formData['taxProv'];
	  this.lvoiyure.frais1=formData['frais1'];
      this.lvoiyure.frais2=formData['frais2'];
	  this.lvoiyure.prixVenteHT=formData['prixVenteHT'];
	  this.lvoiyure.marge=formData['marge'];
	  this.lvoiyure.prixAchatHT=formData['prixAchatHT'];
	  this.lvoiyure.numeroLot	=formData['numeroLot'];
	  this.lvoiyure.idEtatComercial	=formData['idEtatComercial'];
	  this.lvoiyure.prixVenteRef	=formData['prixVenteRef'];
	  this.lvoiyure.taxFedFrais	=formData['taxFedFrais'];
	  this.lvoiyure.allFrais	    =formData['allFrais'];
	  this.lvoiyure.taxProvFrais	=formData['taxProvFrais'];
	  this.lvoiyure.numBooking	=formData['numBooking'];
	  this.lvoiyure.fraisTwing	=formData['fraisTwing'];
	  this.lvoiyure.fraisTranspNKC	=formData['fraisTranspNKC'];
	   this.lvoiyure.fournisseur	=formData['fournisseur'];
	  
		
	this.carSer.saveVoiture(this.lvoiyure).subscribe(
        (data) => {
			
			 
			if(data['message']==''){
				 this.showSnackBarT(this.messageSave,'sb-success');	
                 let quntite=this.form.value['seuilMin'];
				
				//this.form.patchValue({numChassi: data['numChassi']});
				this.form.patchValue({newVoiture: false});
				 this.products.push({numChassi: data['numChassi'],libelle: data['libelle'],color: data['color'],year: data['year'],numVoiture: data['numVoiture'],dateAchat: data['dateAchat'],villeAchat: data['villeAchat'],marque:mar,state:str})
			  
				// let ctrl = this.form.get('numCompte');
				// ctrl.disabled();
				//this.form.controls['numCompte'].disabled();
	            // this.newProduct=true;
				 this.newVoiture=false;
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
	           this.form.patchValue({numChassi: data['numChassi']});
			   this.form.patchValue({libelle: data['libelle']});
			   // this.form.dateOperation: ['', Validators.compose([Validators.required, CustomValidators.date])],
			   this.form.patchValue({year: data['year']});
			   this.form.patchValue({color: data['color']});
			   this.form.patchValue({dateAchat: data['dateAchat']});
			   this.form.patchValue({dateVente: data['dateAchat']});
			   this.form.patchValue({numVoiture: data['numVoiture']});
			    this.form.patchValue({taxFed: data['taxFed']});
				this.form.patchValue({taxProv: data['taxProv']});
				this.form.patchValue({frais1: data['frais1']});
				this.form.patchValue({frais2: data['frais2']});
				this.form.patchValue({prixVenteHT: data['prixVenteHT']});
				this.form.patchValue({marge: data['marge']});
				this.form.patchValue({prixAchatHT: data['prixAchatHT']});
				this.form.patchValue({numeroLot: data['numeroLot']});
				this.form.patchValue({idEtatComercial: data['idEtatComercial']});
				this.form.patchValue({prixVenteHT: data['prixVenteHT']});
			   this.form.patchValue({allfrais: data['allfrais']});
			    this.form.patchValue({taxProvFrais: data['taxProvFrais']});
				 this.form.patchValue({taxFedFrais: data['taxFedFrais']});
				  this.form.patchValue({prixVenteRef: data['prixVenteRef']});
				  this.form.patchValue({numBooking: data['numBooking']});
				   this.form.patchValue({fraisTwing: data['fraisTwing']});
				    this.form.patchValue({fraisTranspNKC: data['fraisTranspNKC']});
					  this.form.patchValue({fournisseur: data['fournisseur']['code']});
				
			
			  // this.allModel=data['model'];
			 
			   this.form.patchValue({villeAchat: data['villeAchat']['codePostal']});
			   this.form.patchValue({state: data['state']});
			   this.form.patchValue({model: data['model']});
			   this.form.patchValue({marque: data['marque']});
			   this.form.patchValue({newVoiture: false});
			   this.newVoiture=false;
	  
  }
  onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }
	
	 
  doMFiltreModle(){
	   let formData = this.form.value;
	   let selctedV=formData['marque'];
	   this.carSer.getAllModelByMarque(selctedV).subscribe(data => {			   
			   this.allModel =data;
	 });
  }
	  doFiltreState(){
	   let formData = this.form.value;
	   let selctedV=formData['state'];
	   //if(this.prixAchatHT>0)
	 
	   //this.stateTax=formData['tax
	   
	  this.taxProvPourc=  this.allState.find(e => e.code === selctedV).tax;
	  if( selctedV =='QC' || selctedV == 'qc')
	  this.taxProvPourc=0;
	  
	   this.calculeTax();
	   
	   this.carSer.getAlVilleByState(selctedV).subscribe(data => {			   
			   this.allVile =data;
	 });
	 
  }
  
  calculeFrais(){
	   let formData = this.form.value;
	  let idSt=formData['state'];
	  let idComp=formData['fournisseur'];
	  let value=formData['prixAchatHT'];
	   this.localis=new Localisation(formData.idLocalisation,formData.libelle,formData.numorder);
	    let header = new Headers();
	   header.append('Content-Type', 'application/json');
	   this.localis.codeComp=idComp;
	   this.localis.codeState=idSt;
	   this.localis.value=value;
	  this.carSer.getFraisByComp(this.localis).subscribe(
        (data) => {
			
			 
			//if(data['value']''){
				// this.showSnackBarT(this.messageSave,'sb-success');	

				this.form.patchValue({allFrais: data['fairsHTv']});
				this.form.patchValue({taxFedFrais: data['tfed']});
				this.form.patchValue({taxProvFrais: data['tps']});
				this.allfrais=1*data['fairsHTv'];
				this.calculeTax();
				//this.form.patchValue({newMarque: false});
				//this.newMarque=true;
				//this.form.reset();
				//}
			//else {
	         
		      //this.showSnackBarT(data['message'],'sb-error');
			  
		    
			//}
          
        }
		//,err => alert('erreur los call from angular '+err)// complete
    );
	
	  
	  
  }
  
  
   voitureDetail(value){
	 this.router.navigate(["car/car-detail/"+value]);
	  
  }
  
  
  
  calculeTax(){
	  this.taxfed=this.prixAchatHT*5/100;	
	  this.taxProv= this.prixAchatHT*this.taxProvPourc/100;
	  this.prixVenteHT=+(this.prixAchatHT)+(1*this.allfrais)+(1*this.marge)+(1*this.fraisTwing);
	   this.prixVenteRef=+(this.prixVenteHT)+(this.taxProv)+(this.taxfed)+(1*this.taxProvFrais)+(1*this.taxFedFrais)+(1*this.fraisTranspNKC);;
	  
  }
  
  
  loadVoiture(idVoiture){
	  let modelV=0;
	   let marV=0;
	   let stV='';
	   let stC='';
	   let idLco='';
	  this.carSer.geVoitureDetail(idVoiture ).subscribe(data => {
			   
			   this.form.patchValue({numChassi: data['numChassi']});
			   this.form.patchValue({libelle: data['libelle']});
			   // this.form.dateOperation: ['', Validators.compose([Validators.required, CustomValidators.date])],
			   this.form.patchValue({year: data['year']});
			   this.form.patchValue({color: data['color']});
			   this.form.patchValue({dateAchat: data['dateAchat']});
			   this.form.patchValue({dateVente: data['dateVente']});
			   this.form.patchValue({numVoiture: data['numVoiture']});
			   this.form.patchValue({numeroLot: data['numeroLot']});
			   this.form.patchValue({prixAchatHT: data['prixAchatHT']});
			   this.form.patchValue({frais1: data['frais1']});
			   this.form.patchValue({frais2: data['frais1']});
			   this.form.patchValue({taxFed: data['taxFed']});
			   this.form.patchValue({taxProv: data['taxProv']}); 
			  this.form.patchValue({marge: data['marge']});
			  this.form.patchValue({prixVenteHT: data['prixVenteHT']});
			   this.form.patchValue({allFrais: data['allFrais']});
			   this.allfrais= data['allFrais'];
			 //  alert(this.allFrais)
			    this.form.patchValue({taxProvFrais: data['taxProvFrais']});
				 this.form.patchValue({taxFedFrais: data['taxFedFrais']});
				  this.form.patchValue({prixVenteRef: data['prixVenteRef']});
				  this.form.patchValue({numBooking: data['numBooking']});
				   this.form.patchValue({fraisTwing: data['fraisTwing']});
				    this.form.patchValue({fraisTranspNKC: data['fraisTranspNKC']});
					this.form.patchValue({fournisseur: data['fournisseur']['code']});
				
			 //  this.allVile=data['villeAchat'];
			   modelV=data['model']['code'].toString();
			   marV=data['model']['marque']['code'].toString();
			   idLco=data['localisation']['idLocalisation'].toString();
			    //alert(marV);
			   stV=data['villeAchat']['codePostal'];
			   stC=data['villeAchat']['state']['code']
			   this.form.patchValue({villeAchat: data['villeAchat']['codePostal']});
			   this.form.patchValue({state: stC});
			   this.form.patchValue({model: modelV});
			   this.form.patchValue({marque: marV});
			    this.form.patchValue({idLocalisation: idLco});
				 idLco=data['etatComercial']['idEtatComercial'].toString();
				  this.form.patchValue({idEtatComercial: idLco});
				
				
			   this.form.patchValue({newVoiture: false});
			   
			   this.newVoiture=false;
			     this.carSer.getAlVilleByState(stC).subscribe(data => {			   
			   this.allVile =data;
	            });
				 
		   });
  }

    onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
}