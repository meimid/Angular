import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../core/shared/shared.module';

import { ProductRoutes } from './product.routing';
import { SellGoodsComponent } from './sell-goods/sell-goods.component';
// import { InvoiceComponent } from './invoice/invoice.component';
// import { TimelineComponent } from './timeline/timeline.component';
// import { EditComponent } from './edit/edit.component';
// import { PricingComponent } from './pricing/pricing.component';
import { ListProductComponent } from './list-product/list-product.component';
import { BillPrintComponent } from './bill-print/bill-print.component';


import { BuyGoodsComponent } from './buy-goods/buy-goods.component';
import { AccountListDialog } from './dialog/account-list/account-list-dialog.component';
import { ProductListDialog } from './dialog/product-list/product-list-dialog.component';
import { SearchProgressDialog } from './dialog/search-progress/search-progress-dialog.component';
import { ConfirMatialog } from './dialog/confirm/confirm-dialog.component';
import { ProductCreateCompComponent } from './addProduct/product-create-comp.component';
import { ProductAutoComponent } from './auto-product/productAuto.component';
import { ProductPupComponent } from './auto-product/productPup.component';
import { ProductListComponent } from './auto-product/productPup.component';
//import { AccountPupComponent } from './auto-account/accountPup.component';
import { EtatProductComponent  } from './etat-product/etatProduct.component';
import { BuyGoodsGrosComponent } from './buy-goods/buy-goodsGros.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ListFactureNlivredComponent } from './list-facture/list-factureNlivred.component';
import { InGoodsGrosComponent } from './correct-goods/in-goodsGros.component';
import { BuyGoodsPrintComponent } from './buy-goods/buy-goods-print.component';
import { ListFactureFournComponent } from './list-facturefourn/list-factureFourn.component';
import { CategoryCreateCompComponent } from './addProduct/category-create-comp.component';
import { BordLivComponent } from './bord-liv/bordliv.component';
import { FactureAutoComponent } from './list-facture/factureAuto.component';
import { ListBordComponent } from './bord-liv/list-bord.component';
import { AutofocusDirective } from './auto-product/Autofocus.directive';
import { CartonCreateCompComponent } from './addCarton/carton-create-comp.component';
import { ListCartonComponent } from './list-carton/list-carton.component';
import { CartonAutoComponent } from './auto-carton/cartAuto';

import { MiseEnCartComponent  } from './mise-en-cart/bord.miseEnCart.component';

import { ListMiseEncartComponent } from './list-miseEncarton/list-MiseEncart.component';
import { InCartonGrosComponent } from './correct-carton/in-cartonGros.component';

import { OutCartonGrosComponent } from './correct-carton/out-cartonGros.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { RemoveProduitCompComponent } from './addProduct/removeProduit-comp.component';



import { FlexLayoutModule } from '@angular/flex-layout';
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
        RouterModule.forChild(ProductRoutes),

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
        SellGoodsComponent,
        AutofocusDirective,
        ListProductComponent,
        BuyGoodsComponent,
        AccountListDialog,
        ProductListDialog,
        BillPrintComponent,
        SearchProgressDialog,
        ProductCreateCompComponent,
        ConfirMatialog,
        ProductPupComponent,
        ProductListComponent,
        ProductAutoComponent,
	    EtatProductComponent,
		BuyGoodsGrosComponent,
		ListFactureComponent,
		ListFactureNlivredComponent,
		ListFactureFournComponent,
		InGoodsGrosComponent,
		BuyGoodsPrintComponent,
		BordLivComponent,
		CategoryCreateCompComponent,
		FactureAutoComponent,
		ListBordComponent,
		CartonCreateCompComponent,
		ListCartonComponent,
		CartonAutoComponent,
		MiseEnCartComponent,
		ListMiseEncartComponent,
		InCartonGrosComponent,
		OutCartonGrosComponent,
		ListCategorieComponent,
		RemoveProduitCompComponent
		
    ],
    entryComponents: [
        AccountListDialog,
        ProductListDialog,
        SearchProgressDialog,
        ConfirMatialog
    ]
})

export class ProductModule { }
