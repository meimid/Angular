export class Facture {	
	  public refFacture:string='';
       public total:number;
	
     /* public constructor(refProduct:string ,lib:string,price:number,priceA:number,codeBare:string,qntInit:number,seuilMin:number,message:string) {
		  this.libelle=lib;
		  this.refProduct=refProduct;
		  
		  
	  }*/
	  
	   public constructor(reffact:string ,price:number) {
		  this.refFacture=reffact;
		  this.total=price;
		  
		  
	  }
	  
	 
	 
}
