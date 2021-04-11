export class Localisation {	
	 
       public libelle:string='';
	   public message:string='';
	   public idLocalisation:number;
	   public numorder:number;
	   public idEtatComercial:number
	   public codeComp:string='';
	   public codeState:string='';
	   public value:number;
	  
	   public constructor(refProduct:number ,lib:string,numorder:number) {
		  this.libelle=lib;
		  this.idLocalisation=refProduct;
		  this.numorder=numorder;
		  
		  
		  
	  }
	  
	 
	 public   getLibelle():string{
		 return this.libelle;
	 }
	 
	  public  setLibelle(libelle:string): void{
		 this.libelle=libelle;
	 }
	  public  getIdLocalisation():number{
		 return this.idLocalisation;
	 }
	 
	  public   setIdLocalisation(refProduct:number): void{
		 this.idLocalisation=refProduct;
	 }
	 
	 
	 
	  public  getMessage(){
		 return this.message;
	 }
	 
	 public  setMessage(code:string):void{
		 this.message=code;
	 }
	 
	
	 
}
