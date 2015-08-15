UI.registerHelper("cart", function(){
	return Session.get("cart") || 0; 

});