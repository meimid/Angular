 import { Injectable } from '@angular/core';


export class OperationDto {
	
	private  id:number;
	
	private  name:String;
	
	private  code :string;
	
	private  type :string;
	
	private remarqu :string;
	
	private  montantDebit :number;
	
	private  montantCredit :number;

	private dateOperation :Date ;;

	
	private valide :boolean ;

	private  montant :number;

	private  message :string;

	private  status :string;

	
	private  numCompte :string;
	
	private  numTransc :number;
	
	
	private  isFacture :boolean;
	
	
    
}