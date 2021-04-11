export class Product {	
	  public libelle:string='';
       public refProduct:string='';
	   public price:number;
      public  priceA:number;
	  public codeBare:string='';
      public qntInit:number;
	  public seuilMin:number;  
      public message:string='';	  
	  public qnt:number;
	  
     /* public constructor(refProduct:string ,lib:string,price:number,priceA:number,codeBare:string,qntInit:number,seuilMin:number,message:string) {
		  this.libelle=lib;
		  this.refProduct=refProduct;
		  
		  
	  }*/
	  
	   public constructor(refProduct:string ,lib:string,price:number) {
		  this.libelle=lib;
		  this.refProduct=refProduct;
		  this.price=price;
		  
		  
	  }
	  
	 
	 public   getLibelle():string{
		 return this.libelle;
	 }
	 
	  public  setLibelle(libelle:string): void{
		 this.libelle=libelle;
	 }
	  public  getRefProduct():string{
		 return this.refProduct;
	 }
	 
	  public   setRefProduct(refProduct:string): void{
		 this.refProduct=refProduct;
	 }
	  public  getPrice():number{
		 return this.price;
	 }
	 
	 
	 public  setPrice(price:number): void{
		 this.price=price;
	 }
	 
	  public  getPriceA(){
		 return this.priceA;
	 }
	 
	  public  setPriceA(priceA:number): void{
		 this.priceA=priceA;
	 }
	  public  getCodeBare():string{
		 return this.codeBare;
	 }
	  public  setCodeBare(code:string):void{
		 this.codeBare=code;
	 }
	   public  getQntInit(){
		 return this.qntInit;
	 }
	  public  setQntInit(qntInit:number){
		 this.qntInit=qntInit;
	 }
	  public  getSeuilMin(){
		 return this.seuilMin;
	 }
	 
	  public  getMessage(){
		 return this.message;
	 }
	 
	 
	 
	   public  setQnt(qnt:number): void{
		 this.qnt=qnt;
	 }
	  public  getQnt():number{
		 return this.qnt;
	 }
	
	 
}
