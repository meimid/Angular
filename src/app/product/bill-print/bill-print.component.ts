import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';

import { MatDialog, MatSnackBar } from '@angular/material';
// import {FormsModule} from '@angular/forms';
// import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AccountListDialog } from '../../product/dialog/account-list/account-list-dialog.component';
import { ProductListDialog } from '../../product/dialog/product-list/product-list-dialog.component';
import { SearchProgressDialog } from '../../product/dialog/search-progress/search-progress-dialog.component';
import { ConfirMatialog } from '../../product/dialog/confirm/confirm-dialog.component';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'bill-print',
  templateUrl: './bill-print.component.html',
  styleUrls: ['./bill-print.component.scss'],
  providers : [BillService]
})

export class BillPrintComponent implements OnInit {

  bill = null;
  netTotal : number = 0;
  tax : number = 0;
  grandTotal : number = 0;
  constructor(public translate: TranslateService, public dialog : MatDialog, public snackBar : MatSnackBar, public billService : BillService) {
    // console.log("constructor");
    // console.log(translate);
    // translate.use('ar');
    this.bill = billService.getBill();
    console.log(this.bill);
    for (var i = this.bill.products.length - 1; i >= 0; i--) {
      // console.log(this.netTotal + " " + this.bill.products[i].total);
      this.netTotal += this.bill.products[i].total;
    }
    this.grandTotal = this.netTotal;
  }


  ngOnInit() : void{
    // console.log("on init");
    // console.log(this.translate);
  }

  print(){
    window.print();
    // var prtContent = window.document.getElementById("printDoc");
    // var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    // WinPrint.document.write(prtContent.innerHTML);
    // WinPrint.document.close();
    // WinPrint.focus();
    // window.print();
    // WinPrint.close();
  }


}