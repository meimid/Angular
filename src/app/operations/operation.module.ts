import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule, FormGroup, FormsModule,Validators, FormControl } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { OperationRoutes } from './operation.routing';

import { ListoperationComponent } from './operation/listoperation/listoperation.component';
import { ListoperationPassedComponent } from './operation/listoperation/listoperationPasse.component';
import { OperationComponent } from './operation/operation.component';
import { ListAccountComponent } from '../accounts/accounting/list-account/list-account.component';
import { AccountPupComponent } from '../accounts/accounting/auto-account/accountPup.component';
import { ListoperationArchivedComponent } from './operation/listoperation/listoperationArchive.component';
import { OperationDiverComponent } from './operation/operation.diver.component';

import { SharedModule } from '../core/shared/shared.module';


//import { DateTimePickerModule } from 'ng2-date-time-picker';

import 'hammerjs';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule
  
  
  
  } from '@angular/material';
@NgModule({
  imports: [
  
    CommonModule,
    SharedModule,
    RouterModule.forChild(OperationRoutes),
  
    MatToolbarModule, 
MatTooltipModule,	
    FlexLayoutModule,
   
	FormsModule,	
    ReactiveFormsModule,
	MatSelectModule,
	 MatIconModule
	
  ],
  declarations: [
    //ListAccountComponent,	
	//AccountPupComponent,
	OperationComponent,
	ListoperationComponent,
	ListoperationPassedComponent,
	ListoperationArchivedComponent,
	OperationDiverComponent
  ],
   
})

export class OperationsModule {}
