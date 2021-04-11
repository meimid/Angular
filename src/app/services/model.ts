export class Model {	
	  public code:string='';
       public libelle:string='';
	   public marque:string="";
	   public message:string='';
	  
	   public constructor(refProduct:string ,lib:string,mdl:string) {
		  this.libelle=lib;
		  this.code=refProduct;
		  this.marque=mdl;
		  
		  
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
	 
	public getMarque():string{
	return this.marque;
	}
	
	public setMarque(mar:string){
	this.marque=mar;
	}
	 
}
