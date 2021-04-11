import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {AuthHttp } from 'app/services/index';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
	 constructor(private http: AuthHttp,private translate: TranslateService, private router: Router) {
	
}

 ngOnInit() {
	  
	   if(!this.http.isAuthentified())
	   {	

  
		   this.router.navigate(["Accounts/login"]);
		  return;
		   
	   }
    
  }
  
  
  moveOp(){
	   this.router.navigate(["opers/createOperation"]);
  }
}