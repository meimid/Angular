import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { MatDialog, MatSnackBar } from '@angular/material';
// import {FormsModule} from '@angular/forms';
// import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AccountListDialog } from '../../product/dialog/account-list/account-list-dialog.component';
import { ProductListDialog } from '../../product/dialog/product-list/product-list-dialog.component';
import { SearchProgressDialog } from '../../product/dialog/search-progress/search-progress-dialog.component';
import { ConfirMatialog } from '../../product/dialog/confirm/confirm-dialog.component';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'buy-goods-bill-print',
  templateUrl: './buy-goods-print.component.html',
  styleUrls: ['./buy-goods-print.component.scss'],
  providers: [BillService]
})

export class BuyGoodsPrintComponent implements OnInit {

  bill = null;
  netTotal: number = 0;
  tax: number = 0;
  grandTotal: number = 0;
  constructor(public translate: TranslateService, public dialog: MatDialog, public snackBar: MatSnackBar, public billService: BillService) {
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


  ngOnInit(): void {
    // console.log("on init");
    // console.log(this.translate);
  }

  print() {
    //window.print();
    // var prtContent = window.document.getElementById("printDoc");
    // var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    // WinPrint.document.write(prtContent.innerHTML);
    // WinPrint.document.close();
    // WinPrint.focus();
    // window.print();
    // WinPrint.close();


    var htmlToPrint = '' +
      '<style type="text/css">' +
      '.table-row-border {' +
      'border-bottom:1px dashed #c9d0df;' +
      '}' +
      '</style>';

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head><title>' + document.title + '</title>' + htmlToPrint);
    mywindow.document.write('</head><body >');
    //mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById("ppp").innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
  }


}