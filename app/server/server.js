Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	
});

Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};		
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non admon user can change only own profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};		
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			userOptions.emails = [{ address: email }];
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	}
});

Accounts.onCreateUser(function (options, user) {
	user.roles = ["user"];

	if(options.profile) {
		user.profile = options.profile;
	}

	

	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Meteor.startup( function() {

	var prodCat = [
		{prodCatid: "101", name: "Burger", desc: 'A full half pound lean ground beef patty grilled to order & topped with grilled mushrooms and onions & served on a tasted bun, layered with mayo, lettuce, tomato, and pickle', img: "http://2.bp.blogspot.com/_Uq5nkc25IJA/SfOOEBK0QBI/AAAAAAAAABA/WSbXV0n0N7w/s200/burgers.jpg"},
		{prodCatid: "102", name: "Popcorn", desc: 'A full half pound lean ground beef patty grilled to order & topped with grilled mushrooms and onions & served on a tasted bun, layered with mayo, lettuce, tomato, and pickle', img: "http://www.moviesatthemarion.com/images/popcorn.jpg"},
		{prodCatid: "103", name: "Drinks", desc: 'A full half pound lean ground beef patty grilled to order & topped with grilled mushrooms and onions & served on a tasted bun, layered with mayo, lettuce, tomato, and pickle', img: "http://reciclaunicel.com.mx/web/products.nsf/files/BigDrinksUK.jpg/$FILE/BigDrinksUK.jpg"},
	];

	var products = [
		{prodID: "12", catId: "101", cat: "", name: "name", desc: "desc", img: "imgpath", price: "58"},
		{catId: "", name: "name", "desc", img: "imgpath", price: "58"}
	];

	var vendors = [
		
	];

	var vend
});
