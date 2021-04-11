import { Observable } from 'rxjs/Observable'
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ConfirmationDialogsService {

    constructor(private dialog: MatDialog,private translate: TranslateService) { }

    public confirm(title: string, message: string, viewContainerRef: ViewContainerRef, btnOkText: string ='Ok', btnCancelText: string ='Cancel'): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmationDialogComponent>;
        //let config = new MatDialogConfig();
		let config: MatDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        return dialogRef.afterClosed();
    }

     public confirmWithoutContainer(title: string, message: string, titleAlign: string='center', messageAlign: string='center', btnOkText: string ='Ok', btnCancelText: string ='Cancel' ): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmationDialogComponent>;
        //let config = new MatDialogConfig();
        // config.viewContainerRef = viewContainerRef;
		let config: MatDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

        dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.titleAlign = titleAlign;
        dialogRef.componentInstance.messageAlign = messageAlign;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        return dialogRef.afterClosed();
    }
	
	
	 public confirMNoYes(): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmationDialogComponent>;
        //let config = new MatDialogConfig();
        // config.viewContainerRef = viewContainerRef;
		let config: MatDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

        dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.componentInstance.title =this.translate.instant('DODELETE'); 
        dialogRef.componentInstance.message = this.translate.instant('DODELETE');
        dialogRef.componentInstance.titleAlign = 'center';
        dialogRef.componentInstance.messageAlign = 'center';
        dialogRef.componentInstance.btnOkText = this.translate.instant('YES'); ;
        dialogRef.componentInstance.btnCancelText = this.translate.instant('NON'); ;

        return dialogRef.afterClosed();
    }
	
	
}