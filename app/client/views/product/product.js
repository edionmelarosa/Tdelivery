Template.Product.rendered = function() {
};

Template.Product.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"submit #prod-form": function(e, t){
		e.preventDefault();

		var prodId = t.find(".prodId").value.trim();
		var quantity = t.find(".quantity").value.trim();

		Meteor.call('addToCart', {prodId: prodId, quantity: parseInt(quantity)}, function (error, result) {
			if (error) {
				console.log(error);
				return false;
			}

			getCart();
			$(".quantity").val("");
		});
	}

	
});

Template.Product.helpers({
	product: function(){
		return Products.find({}).fetch();
	}
});