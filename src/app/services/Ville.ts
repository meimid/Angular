export class Ville {	
	  public code:string='';
       public libelle:string='';
	   public codePostal:string="";
	   public message:string='';
	   public tax:number;
	  
	   public constructor(refProduct:string ,lib:string,mdl:string) {
		  this.code=refProduct;
		   this.libelle=lib;
		  this.codePostal=mdl;
		  
		  
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
	 
	public getCodePostal():string{
	return this.codePostal;
	}
	
	public setCodePostal(mar:string){
	this.codePostal=mar;
	}
	 
}
