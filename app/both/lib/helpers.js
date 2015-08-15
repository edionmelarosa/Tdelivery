this.getCart = function(){
	var cartCount = Cart.find({}).count();
	Session.set("cart", cartCount);
}