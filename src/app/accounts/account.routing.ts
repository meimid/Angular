
import { Routes } from '@angular/router';
import { AccountPupComponent } from './accounting/auto-account/accountPup.component';
import { AccountCreateCompComponent } from './accounting/account-create-comp.component';
import { ListAccountComponent } from './accounting/list-account/list-account.component';
import { EtatComponent  } from './accounting/etat-account/etat.component';
import { EtatPasseComponent  } from './accounting/etat-accountPasser/etatPasse.component';

import {InterditComponent} from 'app/error/interdit.component';
import { SigninComponent } from  'app/signin/signin.component';
import { ListAccountDebitComponent } from './accounting/list-account/list-accountDebit.component';
import {ListAccountCreditComponent } from './accounting/list-account/list-accountCredit.component';
import { SigninNewComponent } from  'app/signin/signinNew.component';
import { ListUserComponent } from  'app/signin/list-User.component';
import { SigninChangPassdComponent } from  'app/signin/signinChangPassd.component';

import {CompanyCreateCompComponent } from './accounting/company/company-create-comp.component';

import { SigninNewExtComponent } from  'app/signin/signinNewExt.component';
import { SigninChangUserPassdComponent } from  'app/signin/signinChangUserPassd.component';
import { SigninNewComponentOnline } from  'app/signin/signinNew.componentOnline';
import { EspeceNewComponent } from  'app/peche/EspeceNew.component';
import { ListEspeceComponent } from  'app/peche/list-espece/list-espece.component';





export const AccountsRoutes: Routes = [{
  path: '',
  children: [ 
  
  {
    path: 'accountnumcreate',
    component: AccountCreateCompComponent
  }
  ,
 {
    path: 'listAccount',
    component: ListAccountComponent
  },
  {
    path: 'etatCompte',
    component:   EtatComponent
  }
  
  ,
  {
    path: 'etatComptePassed',
    component:   EtatPasseComponent
  }  
    ,
	{ path: 'etatCompteLink/:id', component: EtatComponent }
  
  ,
  {
    path: 'listAcDebit',
    component:   ListAccountDebitComponent
  }
  ,
  
  {
    path: 'listAcCredit',
    component:   ListAccountCreditComponent
  }
  ,
 {
    path: 'login',
    component:   SigninComponent
  },
  {
    path: 'listUser',
    component:   ListUserComponent
  } ,
  {
    path: 'createExtUser',
    component:   SigninNewExtComponent
  }
 ,
  {
    path: 'getUser/:id',
    component: SigninChangUserPassdComponent
  } 
  ,
  {
    path: 'modPassUser',
    component:   SigninChangPassdComponent
  } ,
  {
    path: 'newUser',
    component:   SigninNewComponent
  }
  ,
  {
    path: 'signUp',
    component:   SigninNewComponentOnline
  }
,
  {
    path: 'interdit',
    component:   InterditComponent
  },
  {
    path: 'addEspece',
    component:   EspeceNewComponent
  },
   {
    path: 'listEsp',
    component:   ListEspeceComponent
  }
  
  ,
   {
    path: 'addCompany',
    component:   CompanyCreateCompComponent
  }
   
  
  ]
}];





  