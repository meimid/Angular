export class Voiture {	
	  public numChassi:string='';
       public libelle:string='';
	   public color:string='';
      public  year:number;
	  public model:string='';
	  public message:string='';
	  public dateAchat:Date;
	   public dateVente:Date;
	    public villeAchat:string;
		public numVoiture:string='';
		public prixAchatHT:number;
		public tax1:number;
		public tax2:number;
		public idLocalisation:number;
		 public numeroLot:string='';
		 public taxFed:number;
      public taxProv:number;
	  public frais1:number;
      public frais2:number;
	  public prixVenteHT:number;
	  public marge:number;
	  public idEtatComercial:number;
	   public  prixVenteRef:number;
    public  taxFedFrais:number;
    public  allFrais:number;
    public  taxProvFrais:number;
    public  numBooking:number;
	   public fraisTwing:number;
	     public  fraisTranspNKC:number;
		 public fournisseur:string='';
	 
    
     /* public constructor(refProduct:string ,lib:string,price:number,priceA:number,codeBare:string,qntInit:number,seuilMin:number,message:string) {
		  this.libelle=lib;
		  this.refProduct=refProduct;
		  
		  
	  }*/ 
	  
	  
	   public constructor(refProduct:string ,lib:string) {
		  this.libelle=lib;
		  this.numChassi=refProduct;
		 
		  
		  
	  }
	  
	 
	 public   getLibelle():string{
		 return this.libelle;
	 }
	 
	  public  setLibelle(libelle:string): void{
		 this.libelle=libelle;
	 }
	  public  getNumChassi():string{
		 return this.numChassi;
	 }
	 
	  public   setNumChassi(refProduct:string): void{
		 this.numChassi=refProduct;
	 }
	  public  getYear():number{
		 return this.year;
	 }
	 
	 
	 public  setYear(price:number): void{
		 this.year=price;
	 }
	 
	  public  getColor():string{
		 return this.color;
	 }
	 
	  public  setColor(priceA:string): void{
		 this.color=priceA;
	 }
	  public  getModel():string{
		 return this.model;
	 }
	  public  setModel(code:string):void{
		 this.model=code;
	 }
	 
	 
	  public  getMessage(){
		 return this.message;
	 }
	 
	 public  setMessage(code:string):void{
		 this.message=code;
	 }
	 
	public setIdLocalisation(idLoc:number){
		this.idLocalisation=idLoc
		
	}
	 
}
