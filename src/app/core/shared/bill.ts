export class Bill{
	customer = {
		libelle : '',
		refProduct : '',
    	name : '',
    	isDelivered : true,
		paid : true,
		typePaiement: true,
    	date : new Date(),
    	quality : 'Debit',
	    accountNumber : '',
    	detail : ''    
  	};
  	products = [];
}