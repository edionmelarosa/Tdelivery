Meteor.publish("cart", function(){
	return Cart.find({});
});