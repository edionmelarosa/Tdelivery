Meteor.publish("vendors", function() {
	return Vendors.find({}, {});
});

Meteor.publish("vendor_empty", function() {
	return Vendors.find({_id:null}, {});
});

Meteor.publish("vendor", function(prodId) {
	return Vendors.find({_id:vendId}, {});
});

