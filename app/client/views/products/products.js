Template.Products.rendered = function() {
	var products = Products.find({}).fetch();
	Session.set("products", products);
};

Template.Products.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Products.helpers({
	products: function(){
		return Session.get("products");
	}
});