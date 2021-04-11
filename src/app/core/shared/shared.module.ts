import { NgModule } from '@angular/core';


import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { AccountPupComponent } from 'app/accounts/accounting/auto-account/accountPup.component';
import { AccountPupTierComponent } from 'app/accounts/accounting/auto-account-tier/accountPupTier.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
 
  MatCardModule,
  MatButtonModule,
   MatInputModule,
    MatAutocompleteModule,
	MatDatepickerModule,MatNativeDateModule,
	MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatDialogModule,
  MatListModule
  
  } from '@angular/material';
@NgModule({imports: [
	CommonModule,
    TranslateModule,
	MatCardModule,
	 MatInputModule,
	MatButtonModule,
	NgxDatatableModule,
	 MatAutocompleteModule
	 ,MatDatepickerModule,MatNativeDateModule,
	 MatFormFieldModule,
	  FormsModule,
        ReactiveFormsModule,
	 MatCheckboxModule,
	 MatSelectModule,
	 
	 MatTabsModule
	 ,
  MatDialogModule,

  MatListModule
  ],
  declarations: [
   	AccountPupComponent,
	AccountPupTierComponent
  ],
  exports: [    
	TranslateModule,
	MatCardModule,
	 MatAutocompleteModule,
	 MatInputModule,
	 MatFormFieldModule,
	 MatButtonModule,
	NgxDatatableModule
   ,MatDatepickerModule,
   MatNativeDateModule,	
    MatCheckboxModule,
	 FormsModule,
     ReactiveFormsModule,
	  MatSelectModule,
	  AccountPupComponent,
	  AccountPupTierComponent,
	MatTabsModule,	
	  MatDialogModule,
	 
	  MatListModule
   ],
 
})
export class SharedModule { }
