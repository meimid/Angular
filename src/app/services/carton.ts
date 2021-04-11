export class Carton {	
	  public libelle:string='';
       public numCartons:number=0;
	   public  poids:number;
	  public codeBare:string='';
	   public message:string='';	 
     
	  
     /* public constructor(refProduct:string ,lib:string,price:number,priceA:number,codeBare:string,qntInit:number,seuilMin:number,message:string) {
		  this.libelle=lib;
		  this.refProduct=refProduct;
		  
		  
	  }*/
	  
	   public constructor(refProduct:number ,lib:string,price:number) {
		  this.libelle=lib;
		  this.numCartons=refProduct;
		  this.poids=price;
		  
		  
	  }
	  
	  
	 
	 public   getLibelle():string{
		 return this.libelle;
	 }
	 
	  public  setLibelle(libelle:string): void{
		 this.libelle=libelle;
	 }
	  public  getNumCartons():number{
		 return this.numCartons;
	 }
	 
	  public   setNumCartons(refProduct:number): void{
		 this.numCartons=refProduct;
	 }
	  public  getPoids():number{
		 return this.poids;
	 }
	 
	 
	 public  setPoids(price:number): void{
		 this.poids=price;
	 }
	 
	 
	  public  getCodeBare():string{
		 return this.codeBare;
	 }
	  public  setCodeBare(code:string):void{
		 this.codeBare=code;
	 }
	  
	 
	  public  getMessage(){
		 return this.message;
	 }
	 
	 
	 
}
