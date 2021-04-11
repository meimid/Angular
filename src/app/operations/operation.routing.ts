import { Routes } from '@angular/router';
import { ListoperationComponent } from './operation/listoperation/listoperation.component';
import { OperationComponent } from './operation/operation.component';
import { ListoperationPassedComponent } from './operation/listoperation/listoperationPasse.component';
import { ListoperationArchivedComponent } from './operation/listoperation/listoperationArchive.component';
import { OperationDiverComponent } from './operation/operation.diver.component';



export const OperationRoutes: Routes = [{
  path: '',
  children: [
   
  {
    path: 'createOperation',
    component:  OperationComponent
  },
  {
    path: 'listOper',
    component: ListoperationComponent  
  }
  ,
  {
    path: 'listPassOper',
    component: ListoperationPassedComponent  
  }
  ,
  {
    path: 'listArchiveOper',
    component: ListoperationArchivedComponent  
  }
  ,
  {
    path: 'operDiver',
    component: OperationDiverComponent  
  }
  ]
}];





  