Meteor.publish("orders", function() {
	return Orders.find({}, {});
});

Meteor.publish("order_empty", function() {
	return Orders.find({_id:null}, {});
});

Meteor.publish("order", function(customerId) {
	return Orders.find({_id:orderId}, {});
});

