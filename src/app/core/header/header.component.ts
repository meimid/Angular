import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as screenfull from 'screenfull';
import {AuthenticationService} from 'app/services/index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();
  @Output() openEvent = new EventEmitter();
 constructor(private router: Router, private auth:AuthenticationService) {
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

   signeOut(){
	  sessionStorage.removeItem('currentUser');
	    this.router.navigate(["Accounts/login"]);
		
  }
  
 isAuthenticated():boolean{
	 
	  return this.auth.isAuthenticated();
  }
  
  sendOpen(){
	    this.openEvent.emit();
  }
  isAllowedTogle()
  {  if(this.router.url == '/Accounts/signUp' )
	  return false;
	  else
       return true;		  
  }
  
}
