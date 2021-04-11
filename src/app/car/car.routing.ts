import { Routes } from '@angular/router';
import { MarqueCreateCompComponent } from './addVoiture/marque-create-comp.component';
import { VoitureCreateCompComponent } from './addVoiture/voiture-create-comp.component';
import { ModelCreateCompComponent } from './addVoiture/model-create-comp.component';
import { ListMarqueComponent } from './list-marque/list-marque.component';
import { ListModelComponent } from './list-model/list-model.component';
import { ListCarComponent } from './list-car/list-car.component';
import {StateCreateCompComponent } from './addState/state-create-comp';
import { VilleCreateCompComponent } from './addState/ville-create-comp';
import { ListVilleComponent } from './list-ville/list-ville.component';

import { LocalisationCompComponent } from './addState/localisation-create-comp.component';
import { ListLoclisationComponent } from './list-localisation/list-localisation.component';
import { ListStateComponent } from './list-state/list-state.component';
import { EtatCommCompComponent } from './addState/etatcomm-create-comp.component';
import { ListEtatCommComponent } from './list-etatcomm/list-etatcomm.component';
import { UploadFilesComponent } from './uploadfile/upload-files.component';









export const CarRoutes: Routes = [
  {
    path: '',
    children: [{
     path: 'car-add',
      component: VoitureCreateCompComponent
    }
	, {
      path: 'mar-add',
      component: MarqueCreateCompComponent
    }
	, {
      path: 'model-add',
      component: ModelCreateCompComponent
    }
	, {
      path: 'car-list',
      component: ListCarComponent
    }
	
	
	, {
      path: 'marque-list',
      component: ListMarqueComponent
    }
	, {
      path: 'model-list',
      component: ListModelComponent
    }, {
      path: 'model/:id',
      component: ModelCreateCompComponent
    }, {
      path: 'marque/:id',
      component: MarqueCreateCompComponent
    },
	{path: 'car-detail/:id',
      component: VoitureCreateCompComponent
    },
	
	 {
      path: 'state-add',
      component: StateCreateCompComponent
    }
	
	
	, {
      path: 'ville-add',
      component: VilleCreateCompComponent
    }, {
      path: 'ville-list',
      component: ListVilleComponent
    },
	
	 {
      path: 'local-add',
      component: LocalisationCompComponent
    }, 
	{path: 'local-add/:id',
      component: LocalisationCompComponent
    },
	
	{
      path: 'state-list',
      component: ListStateComponent
    },
	{path: 'state-detail/:id',
      component: StateCreateCompComponent
    },{
      path: 'local-list',
      component: ListLoclisationComponent
    },{
      path: 'etatCom-add',
      component: EtatCommCompComponent
    }, 
	{path: 'etatCom/:id',
      component: EtatCommCompComponent
    },
	
	{
      path: 'etatCom-list',
      component: ListEtatCommComponent
    },
	
	{
      path: 'upload-file',
      component: UploadFilesComponent
    }
	
   
    ]
  }
];
