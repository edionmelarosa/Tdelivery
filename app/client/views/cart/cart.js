Template.Cart.rendered = function() {
	var carts = Cart.find({}).fetch();
	var prods = Products.find({}).fetch();
	var arr = [];
	var total=0;
	$.each(carts, function (cartIndex, cartItem){
		var obj = {
			quan: cartItem.quantity
		}

		$.each(prods, function (i, item){
			if (cartItem.prodId == item.prodId) {
				obj.name = item.name;
				obj.img = item.img;
				obj.price = item.price;
				obj.total = parseInt(item.price) * parseInt(cartItem.quantity);
				total+=obj.total;
			};
		});
		Session.set("total", total);
		arr.push(obj);
	});

	Session.set("carts", arr);
};

Template.Cart.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Cart.helpers({
	carts: function(){
		return Session.get("carts");
	},
	totalPlusCharge: function(){
		return parseInt(Session.get("total")) + parseInt(30);
	},
	total: function(){
		return Session.get("total");
	}
});