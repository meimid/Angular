export class Marque {	
	   public code:string='';
       public libelle:string='';
	   public message:string='';
	   public idLocalisation:number;
	  
	   public constructor(refProduct:string ,lib:string) {
		  this.libelle=lib;
		  this.code=refProduct;		  
		  
	  }
	  
	 
	 public   getLibelle():string{
		 return this.libelle;
	 }
	 
	  public  setLibelle(libelle:string): void{
		 this.libelle=libelle;
	 }
	  public  getCode():string{
		 return this.code;
	 }
	 
	  public   setCode(refProduct:string): void{
		 this.code=refProduct;
	 }
	 
	 
	 
	  public  getMessage(){
		 return this.message;
	 }
	 
	 public  setMessage(code:string):void{
		 this.message=code;
	 }
	 
	
	 
}
