import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'interdit-error',
  templateUrl: './interdit.component.html',
  styleUrls: ['./interdit.component.scss']
})
export class InterditComponent implements OnInit {

  constructor(translate: TranslateService) { }

  ngOnInit() {
  }

}
