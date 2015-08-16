Template.Categories.rendered = function() {
	var prodCats = ProductCategories.find({}).fetch();
	Session.set("prodCats", prodCats);
};

Template.Categories.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"keyup .input-search": function(e, t){
		e.preventDefault();

		var _this = $(e.currentTarget).val().trim();

		console.log(_this);
		var prodCats = ProductCategories.find({}).fetch();
		Session.set("prodCats", prodCats);
		if (_this != "") {
			var prodCats = ProductCategories.find("{\"name\": {$regex : '" + _this + "'} }").fetch();
			Session.set("prodCats", prodCats);
		};
		
	}

	
});

Template.Categories.helpers({
	prodCats: function(){
		return Session.get("prodCats");
	}
});
