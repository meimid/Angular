import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

const SMALL_WIDTH_BREAKPOINT = 960;
import {Config}   from 'app/services/index';
@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
	//dir: 'rtl'
  };

  @ViewChild('sidemenu') sidemenu;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
 showSettings:boolean=false;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private _element: ElementRef,
    private router: Router,
    zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => {
      this.mediaMatcher = mql;
    }));
	//let urlcode=localStorage.getItem("codeElkarna");
	//if(!urlocal)
		//if(urlcode === null){
		//Config.updateURL('test');
	//	}
		//else {
			//Config.updateURL(urlcode);
		//}
		
  }

  ngOnInit(): void {

    this.url = this.router.url;

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      document.querySelector('.app-inner > .mat-drawer-content > div').scrollTop = 0;
      this.url = event.url;
      this.runOnRouteChange();
    });
  }

  ngOnDestroy(): void  {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  isOver(): boolean {
    if (this.url === '/Accounts/accountnumcreate' ||
        this.url === '/Accounts/listAccount' ||
        this.url === '/Accounts/etatCompte' ||
        this.url === '/Accounts/etatComptePassed' ||
	    this.url === '/Accounts/login' ||
		this.url === '/Accounts/signUp' ||		
        this.url === '/Accounts' ||
		this.url === '/opers/createOperation'|| 
        this.url === '/opers/listOper' ||
        this.url === '/opers/listPassOper' ||
        this.url === '/opers/listArchiveOper' ||
        this.url === '/Accounts/listAcDebit' ||
	    this.url === '/Accounts/listAcCredit' ||
	    this.url === '/Accounts/listUser' ||
		this.url === '/Accounts/newUser' ||
		this.url === '/Accounts/modPassUser' ||		
		this.url === '/Accounts/societe' ||
	    this.url === '/product/buy-goods' ||
	    this.url === '/product/buy-goodsGros' ||
		this.url === '/product/sell-goods' ||
	    this.url === '/product/etatPrd' ||
		this.url === '/opers/listArchiveOper' ||
		this.url === '/product/product-add' ||
		this.url === '/opers/listArchiveOper' ||
		this.url === '/product/listFactNlivred' ||
	    this.url === '/product/listFact'||
	    this.url === '/product/listFactFourn'||
	    this.url === '/product/bord-add'||
	    this.url === '/product/bord-list'||
	    this.url === '/taskboard'||
	    this.url === '/taskboard') {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void  {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }
  
  receiveClose(){
	  
	  this.showSettings=false;
  }
  
 receiveOpen(){
	 
	 this.showSettings=true;
  }
}
