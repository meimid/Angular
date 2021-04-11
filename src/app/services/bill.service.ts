import {Injectable} from '@angular/core';
import {Bill} from './bill'


@Injectable()
export class BillService{

	constructor(){
		console.log("Bill Service created");
	}

	static bill = new Bill();

	getBill() : Bill {
		return BillService.bill;
	}
}