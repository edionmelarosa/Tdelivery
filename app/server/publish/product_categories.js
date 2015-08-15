Meteor.publish("product_categories", function() {
	return ProductCategories.find({}, {});
});

Meteor.publish("product_categorry_empty", function() {
	return ProductCategories.find({_id:null}, {});
});

Meteor.publish("product_category", function(prodCatId) {
	return ProductCategories.find({_id:prodCatId}, {});
});

