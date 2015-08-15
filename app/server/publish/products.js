Meteor.publish("products", function() {
	return Products.find({}, {});
});

Meteor.publish("product_empty", function() {
	return Products.find({_id:null}, {});
});

Meteor.publish("product", function(prodId) {
	return Products.find({_id:prodId}, {});
});

