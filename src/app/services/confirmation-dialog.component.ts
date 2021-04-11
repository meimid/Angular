import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
    public title: string;
    public message: string;
    public titleAlign?: string;
    public messageAlign?: string;
    public btnOkText?: string;
    public btnCancelText?: string;
    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,private translate: TranslateService) { }

    ngOnInit() {
    }

}