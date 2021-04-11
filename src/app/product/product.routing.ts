import { Routes } from '@angular/router';

import { SellGoodsComponent } from './sell-goods/sell-goods.component';
// import { InvoiceComponent } from './invoice/invoice.component';
// import { TimelineComponent } from './timeline/timeline.component';
// import { EditComponent } from './edit/edit.component';
// import { PricingComponent } from './pricing/pricing.component';
import { ListProductComponent } from './list-product/list-product.component';
import { BuyGoodsComponent } from './buy-goods/buy-goods.component';
import { BuyGoodsGrosComponent } from './buy-goods/buy-goodsGros.component';
import { InGoodsGrosComponent } from './correct-goods/in-goodsGros.component';
import { BillPrintComponent } from './bill-print/bill-print.component';
import { ProductCreateCompComponent } from './addProduct/product-create-comp.component';
import { EtatProductComponent  } from './etat-product/etatProduct.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ListFactureNlivredComponent } from './list-facture/list-factureNlivred.component';
import { BuyGoodsPrintComponent } from './buy-goods/buy-goods-print.component';
import { ListFactureFournComponent } from './list-facturefourn/list-factureFourn.component';
import { CategoryCreateCompComponent } from './addProduct/category-create-comp.component';
import { BordLivComponent } from './bord-liv/bordliv.component';
import { ListBordComponent } from './bord-liv/list-bord.component';

import { ListCartonComponent  } from './list-carton/list-carton.component';
import { MiseEnCartComponent  } from './mise-en-cart/bord.miseEnCart.component';

import { ListMiseEncartComponent } from './list-miseEncarton/list-MiseEncart.component';
import { InCartonGrosComponent } from './correct-carton/in-cartonGros.component';
import { OutCartonGrosComponent } from './correct-carton/out-cartonGros.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { RemoveProduitCompComponent } from './addProduct/removeProduit-comp.component';








export const ProductRoutes: Routes = [
  {
    path: '',
    children: [{
     path: 'sell-goods',
      component: SellGoodsComponent
    }
	, {
      path: 'buy-goods',
      component: BuyGoodsComponent
    }
	, {
      path: 'buy-goods-print',
      component: BuyGoodsPrintComponent
    }
	, {
      path: 'buy-goodsGros',
      component: BuyGoodsGrosComponent
    }
	
	, {
      path: 'in-goodsGros',
      component: InGoodsGrosComponent
    }
	 ,
	 {
       path: 'InGodds/:id',
      component: InGoodsGrosComponent
     }
	  ,
	 {
       path: 'out-goodsGros',
      redirectTo: 'InGodds/S'
     }
	
	, {
      path: 'listFactNlivred',
      component: ListFactureNlivredComponent
    }
	
	, {
      path: 'listFact',
      component: ListFactureComponent
    }
	, {
      path: 'listFactFourn',
      component: ListFactureFournComponent
    }
	  
	, {
       path: 'prdShotList',
       redirectTo: 'listPrdIn/a'
     },
	 {
       path: 'listPrd',
      component: ListProductComponent
     }
	 ,
	 {
       path: 'listPrdIn/:id',
      component: ListProductComponent
     }
	 , 
	
	 {
       path: 'etatPrd',
      component: EtatProductComponent
     },{
      path: 'bill-print',
      component: BillPrintComponent
    }
	, {
      path: 'product-add',
      component: ProductCreateCompComponent
    }
	, {
      path: 'cat-add',
      component: CategoryCreateCompComponent
    }
	
	
	, {
      path: 'bord-add',
      component: BordLivComponent
    },
	{
      path: 'bord-list',
      component: ListBordComponent
    }
	, {
      path: 'borddet/:id',
      component: BordLivComponent
    }
	,
	
	{ path: 'product-details/:id', component: ProductCreateCompComponent }	
	,
	{ path: 'facture-details/:id', component: BuyGoodsGrosComponent }
	,
	{ path: 'factureFourn-details/:id', component: SellGoodsComponent}
	, {
      path: 'listCat',
      component: ListCategorieComponent
    },{ path: 'remove-prd',component:  RemoveProduitCompComponent}
   
    ]
  }
];
