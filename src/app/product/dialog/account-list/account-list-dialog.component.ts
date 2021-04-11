import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material';


@Component({
  selector : 'account-list-dialog',
  templateUrl : './account-list-dialog.component.html'
})
export class AccountListDialog{
	accountSearch = '';
	filterByAccount = function(){
		console.log(this.accountSearch);
	}
	accountNumberSearch = '';
	filterByAccountNumber = function(){
		console.log(this.accountNumberSearch);
	}
	qualityAccountSearch = '';
	filterByQualityAccount = function(){
		console.log(this.qualityAccountSearch);
	}

	constructor(public dialogInstance :MatDialogRef<AccountListDialog>){
		
	}

	rows = [
			{'account' : 'Jeevan','accountNumber' : '123456789','qualityAccount' : 'Customer'},
			{'account' : 'Rauf','accountNumber' : '123456788','qualityAccount' : 'Customer'},
			{'account' : 'Adil','accountNumber' : '123456787','qualityAccount' : 'Customer'},
			{'account' : 'Aijaz','accountNumber' : '123456786','qualityAccount' : 'Supplier'},
			{'account' : 'Shehrez','accountNumber' : '123456785','qualityAccount' : 'Customer'},
			{'account' : 'Shehrez','accountNumber' : '123456785','qualityAccount' : 'Customer'},
			{'account' : 'Shehrez','accountNumber' : '123456785','qualityAccount' : 'Customer'},
			{'account' : 'Shehrez','accountNumber' : '123456785','qualityAccount' : 'Customer'},
			{'account' : 'Shehrez','accountNumber' : '123456785','qualityAccount' : 'Customer'}
	];
	columns = [
		{prop : 'account'},
		{prop : 'accountNumber'},
		{prop : 'qualityAccount'}
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