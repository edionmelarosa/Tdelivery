Template.Products.rendered = function() {
	
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
		return Products.find({}).fetch();
	}
});