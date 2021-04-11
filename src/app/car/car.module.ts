import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../core/shared/shared.module';

import { CarRoutes } from './car.routing';



import { MarqueCreateCompComponent } from './addVoiture/marque-create-comp.component';
import { VoitureCreateCompComponent } from './addVoiture/voiture-create-comp.component';
import { ModelCreateCompComponent } from './addVoiture/model-create-comp.component';
import { ListMarqueComponent } from './list-marque/list-marque.component';
import { ListModelComponent } from './list-model/list-model.component';
import { ListCarComponent } from './list-car/list-car.component';
import {StateCreateCompComponent } from './addState/state-create-comp';
import { VilleCreateCompComponent } from './addState/ville-create-comp';

import { ListVilleComponent } from './list-ville/list-ville.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalisationCompComponent } from './addState/localisation-create-comp.component';
import { ListLoclisationComponent } from './list-localisation/list-localisation.component';
import { ListStateComponent } from './list-state/list-state.component';
import { EtatCommCompComponent } from './addState/etatcomm-create-comp.component';
import { ListEtatCommComponent } from './list-etatcomm/list-etatcomm.component';
import { UploadFilesComponent } from './uploadfile/upload-files.component';




import {
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule
} from '@angular/material';
@NgModule({
    imports: [

        CommonModule,
        SharedModule,
        RouterModule.forChild(CarRoutes),

        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,

        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
		
        MatIconModule
		
	

    ],
    declarations: [
        
      //  ConfirMatialog		,
		MarqueCreateCompComponent,
		VoitureCreateCompComponent,
		ModelCreateCompComponent,
		ListMarqueComponent,
		ListModelComponent,
		ListCarComponent,
		StateCreateCompComponent,
		VilleCreateCompComponent,
		ListVilleComponent,
		LocalisationCompComponent,
        ListLoclisationComponent,
		ListStateComponent,
		EtatCommCompComponent,
		ListEtatCommComponent,
		UploadFilesComponent
    ],
    entryComponents: [
        
    ]
})

export class CarModule { }
