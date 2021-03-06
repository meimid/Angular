import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { PecheService } from 'app/peche/pecheService';
import { CustomValidators } from 'ng2-validation';
import {ActivatedRoute} from "@angular/router";
import {Config}   from 'app/services/index';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
//import {Md5} from 'ts-md5/dist/md5';
import {md5} from 'app/services/index';

@Component({
  selector: 'app-especeNew',
  templateUrl: './EspeceNew.component.html',
  styleUrls: ['./Esepece.component.scss']
})
export class EspeceNewComponent implements OnInit {
 model: any = {};
    loading = false;
    error = '';
  public form: FormGroup;
   messageSave:string;
    messagePasswordDiff:string;
	  send:boolean=true;
   //,private accountSer,
   userLogin:string='';
     private sub: any;
  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute, private translate: TranslateService,private snackBar: MatSnackBar, private penchtSer:PecheService) {
	   this.sub = this.route.params.subscribe(params => {
      let idPrd = params['id'];
	  // alert('numcompte '+idPrd);
      // (+) converts string 'id' to a number
      if (idPrd) {
this.userLogin=idPrd;
//this.loadUser();

      }

      // In a real app: dispatch action to load the details here.
    })
	  
  }

  ngOnInit() {
    this.form = this.fb.group ( {
      code: [null , Validators.compose ( [ Validators.required ] )] ,
	  lable: [null , Validators.compose ( [ Validators.required ] )] ,
	  calibre: [null , Validators.compose ( [ Validators.required ] )] 
    } );
	this.messageSave=this.translate.instant('saveAvecSucces'); 
	this.messagePasswordDiff=this.translate.instant('passwordDiff'); 
	
	
	     
	
  }

  onSubmit() {
	 
	  this.loading = true;
	  let formData = this.form.value;
	if(this.send){
		this.send=false;
		 this.penchtSer.saveNewEspece(formData)
            .subscribe(result => {
				
				  let user = result;
               	if (user && user['message'] =='') {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
					
				this.messageSave
					this.showSnackBarWith(this.messageSave);
					this.form.patchValue({created: user['created']});
					
                }else {
						
							
							this.showSnackBarWith(user['message']);
						
					
					
					return false;
				}
					
					// this.router.navigate ( [ '/dashboard' ] );
                    this.send=true;
               
            },err => { this.send=true;alert('vlue  '+err)});
		
	}
	
       
	  
   
  }
  
  showSnackBarWith(elementText: string){
        let config = new MatSnackBarConfig();
        config.duration = Config.snackBarDurration; // Here is your change
		
        this.snackBar.open(elementText, '', config);
    }
	
	doSaveAccount(){}
	
	redirect() {
    this.router.navigate(['./']);
  }
  


  
  
  

}
