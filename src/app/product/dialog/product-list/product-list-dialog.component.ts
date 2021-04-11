import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material';


@Component({
  selector : 'product-list-dialog',
  templateUrl : './product-list-dialog.component.html'
})
export class ProductListDialog{

	constructor(public dialogInstance :MatDialogRef<ProductListDialog>){
		
	}

	rows = [
			{'refProduct' : '0111','libelle' : 'Product One','theExistingQuantity' : '2','price' : '1000'},
			{'refProduct' : '0112','libelle' : 'Product Two','theExistingQuantity' : '3','price' : '1100'},
			{'refProduct' : '0113','libelle' : 'Product Three','theExistingQuantity' : '4','price' : '2200'},
			{'refProduct' : '0114','libelle' : 'Product Four','theExistingQuantity' : '5','price' : '3000'},
			{'refProduct' : '0115','libelle' : 'Product Five','theExistingQuantity' : '6','price' : '4000'},
			{'refProduct' : '0116','libelle' : 'Product Six','theExistingQuantity' : '1','price' : '5000'},
	];

	selected = [];

	onSelect (){
		// console.log('selected event', this.selected);
		setTimeout(()=>this.dialogInstance.close(this.selected),500);
	}

	// onActivate (event){
	// 	console.log('Activate event',event);
	// }
}