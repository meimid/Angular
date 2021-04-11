import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule, FormGroup, FormsModule,Validators, FormControl } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccountsRoutes } from './account.routing';

import { SharedModule } from '../core/shared/shared.module';
//import { ListAccountComponent } from './accounting/list-account/list-account.component';
import { AccountPupComponent } from './accounting/auto-account/accountPup.component';
import { AccountCreateCompComponent } from './accounting/account-create-comp.component';
import { EtatComponent  } from './accounting/etat-account/etat.component';
import { ListAccountComponent } from './accounting/list-account/list-account.component';
import {EtatPasseComponent } from './accounting/etat-accountPasser/etatPasse.component';
//import {CanActivateViaAuthGuard} from 'app/services/index';
import {InterditComponent} from 'app/error/interdit.component';
import { SigninComponent } from  'app/signin/signin.component';
import { ErrorComponent } from 'app/error/error.component';
import { ListAccountDebitComponent } from './accounting/list-account/list-accountDebit.component';
import {ListAccountCreditComponent } from './accounting/list-account/list-accountCredit.component';
import { SigninNewComponent } from  'app/signin/signinNew.component';
import { ListUserComponent } from  'app/signin/list-User.component';
import { SigninChangPassdComponent } from  'app/signin/signinChangPassd.component';
import { SigninChangUserPassdComponent } from  'app/signin/signinChangUserPassd.component';
import {CompanyCreateCompComponent } from './accounting/company/company-create-comp.component';

import { SigninNewExtComponent } from  'app/signin/signinNewExt.component';
import { SigninNewComponentOnline } from  'app/signin/signinNew.componentOnline';
import { EspeceNewComponent } from  'app/peche/EspeceNew.component';
import { ListEspeceComponent } from  'app/peche/list-espece/list-espece.component';

import 'hammerjs';
import {
  MatToolbarModule,
 
  MatIconModule
  
  
  
  } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
   
	CommonModule,
    SharedModule,
    RouterModule.forChild(AccountsRoutes),
    MatToolbarModule,    
    FlexLayoutModule,
  
	MatIconModule
  ],
  declarations: [
    AccountCreateCompComponent,		
	//AccountPupComponent,
	EtatComponent,
	ListAccountComponent,
	InterditComponent,
	SigninComponent,
	EtatPasseComponent,
	ErrorComponent,
	ListAccountDebitComponent,
	ListAccountCreditComponent,
	SigninNewComponent,
	ListUserComponent,
	SigninChangPassdComponent,
	CompanyCreateCompComponent,
	SigninNewExtComponent,
	SigninChangUserPassdComponent,
	SigninNewComponentOnline,
	EspeceNewComponent,
	ListEspeceComponent
	
  ],
})

export class AcountsModule {}
