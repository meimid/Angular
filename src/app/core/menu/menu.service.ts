import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  }
  ,
  {
    state: 'Accounts',
    name: 'Accounts',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {type: 'purple', value: '1'}
    ],
	
	
    children: [
	 {state: 'accountnumcreate', name: 'ACCOUNTNUMCREATE'},
      {state: 'listAccount', name: 'AccountList'},
	 {state: 'etatCompte', name: 'ETATCOMPTE'},
	//  {state: 'etatComptePassed', name: 'ARCHIVECOMPTE'}  ,
	  {state: 'addCompany', name: 'SOCITE.INFO'}
    ]
	
	
	
  },
  
  
   {
    state: 'opers',
    name: 'MENUOPERATION',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {type: 'purple', value: '2'}
    ],
    children: [
       {state: 'createOperation', name: 'operationSaie'},
      {state: 'listOper', name: 'DAILY'},
	  {state: 'listPassOper', name: 'ACCCAISSEPasse'},
	  {state: 'listArchiveOper', name: 'ARCHIVEDIARY'},
	  {state: 'operDiver', name: 'operDiver'}
	  
	  
    ]
  },
  {
    state: 'Accounts',
    name: 'BLANTT',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {type: 'purple', value: '2'}
    ],
    children: [
       {state: 'listAcDebit', name: 'TIERD'},
      {state: 'listAcCredit', name: 'TIERC'}
	  
    ]
  }
  ,
  {
    state: 'Accounts',
    name: 'USERS',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {type: 'purple', value: '4'}
    ],
    children: [
      {state: 'listUser', name: 'LISTOFUSERS'},
	  {state: 'newUser', name: 'CREATEANEWUSER'},
	  {state: 'modPassUser', name: 'modifyPas'},
	//  {state: 'createExtUser', name: 'creteExternalUser'}
	   
	  
    
	]
  }
  
  
  
  ,
  {
    state: 'product',
    name: 'AchatVente',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {type: 'purple', value: '4'}
    ],
	
	  children: [
	 {state: 'sell-goods', name: 'BUYGOODS'},
     {state: 'buy-goods', name: 'SELLINGGOODS'},
     {state: 'listFact', name: 'Listfacture'},	
 	 {state: 'listFactFourn', name: 'ListfactureFOURN'}
	 ,{state: 'listFactNlivred', name: 'ListfactureNlivred'}
	,	 {state: 'bord-add', name: 'bordeauLivCreate'},
	  {state: 'bord-list', name: 'bordeauxLiv'}
	 
	 
	 
	   
	  
    ]
		}
  ,{
    state: 'product',
    name: 'PRODUCTS',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {type: 'purple', value: '4'}
    ],
    children: [
	
	 {state: 'product-add', name: 'ADDPRODUCTS'},
	  
	  {state: 'listPrd', name: 'prdList'},
	  {state: 'etatPrd', name: 'etatPrd'},	   
	  {state: 'prdShotList', name: 'prdShorList'},
	  {state: 'cat-add', name: 'ADDCAT'},
	   {state: 'listCat', name: 'listCategorie'},
	  {state: 'in-goodsGros', name: 'in.marchandise'},
	  {state: 'out-goodsGros', name: 'out.marchandise'},
	  //{state: 'codebarre', name: 'out.marchandise'},
	  {state: 'remove-prd', name: 'removePrd'}
	   
	  
    ]
  }
  
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
