import { Component, OnInit } from '@angular/core';
// import { } from '@angular/material';
import { MatDialogRef} from '@angular/material';


@Component({
  selector : 'confirm-dialog',
  templateUrl : './confirm-dialog.component.html'
})
export class ConfirMatialog{
	constructor(public dialogInstance :MatDialogRef<ConfirMatialog>){

	}
}