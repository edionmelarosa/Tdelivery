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
		{prodCatid: "101", name: "Burger", img: "http://2.bp.blogspot.com/_Uq5nkc25IJA/SfOOEBK0QBI/AAAAAAAAABA/WSbXV0n0N7w/s200/burgers.jpg"},
		{prodCatid: "102", name: "Popcorn", img: "http://www.moviesatthemarion.com/images/popcorn.jpg"},
		{prodCatid: "103", name: "Chips",  img: "http://smallbites.andybellatti.com/wp-content/uploads/2009/08/potato_chips.jpg"},
		{prodCatid: "104", name: "Others",  img: "http://reciclaunicel.com.mx/web/products.nsf/files/BigDrinksUK.jpg/$FILE/BigDrinksUK.jpg"}
	];

	var prodVendor = [
		{prodVendorid: "201", name: 'McDonalds', img: "http://lifestyle.inquirer.net/files/2013/03/mcdo.jpg" class="img-responsive product-img"},
		{prodVendorid: "202", name: 'KFC', img: "http://brickit.com/images/clients/logo_KFC.png"},
		{prodVendorid: "203", name: 'Chowking', img: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p160x160/306754_448189585213118_445981934_n.jpg?oh=f7dfe3766527450eaa2a7288c0842f0f&oe=567BDB03&__gda__=1447500943_c8c5d4f076537d7c43ca88dbe3c083d3"},
		{prodVendorid: "203", name: 'Jollibee', img: "http://jollibeefoundation.org/wp-content/themes/jgf/images/jb_logo.gif"},
	];

	var products = [
		{prodID: "001", catId: "101", vendorId: "201", name: "Big N Tasty Ala Carte", desc: "Made only from choice ingredients: 100% pure beef patty, fresh tomato, crispy lettuce, onions, pickles, creamy cheese and a special smokey sauce. It has the right mix of tangy and creamy taste and the balance of soft, crunchy and chunky textures in every bite.", img: "https://mcdonalds.com.ph/userfiles/images/ourfood/main/bnt.png", price: "137.00"},
		{prodID: "002", catId: "101", vendorId: "201", name: "Big Mac Ala Carte", desc: "A double layer of sear-sizzled 100% pure beef mingled with special sauce on a sesame seed bun and topped with melty American cheese, crisp lettuce, minced onions and tangy pickles.", img: "http://www.mcdonalds.com/content/dam/McDonalds/item/mcdonalds-Big-Mac.png", price: "128.00"},
		{prodID: "003", catId: "101", vendorId: "201", name: "Filet O Fish Ala Carte", desc: "Fried fish fillet smothered with sauce and topped with a slice of melted cheese in between steamed buns.", img: "https://mcdonalds.com.ph/userfiles/images/ourfood/main/filet_o_fish.png", price: "99.00"},
		{prodID: "004", catId: "101", vendorId: "201", name: "CheeseBurger Ala Carte", desc: "100% Pure beef with real American cheese.", img: "https://mcdonalds.com.ph/userfiles/images/ourfood/main/cheeseburger.png", price: "41.00"},

		{prodID: "005", catId: "101", vendorId: "202", name: "ZINGER BURGER Ala-carte", desc: "100% breast fillet chicken coated in Zinger flavouring combined with lettuce and mayo for those seeking a full on hot and spicy flavour hit.", img: "https://kfc.com.au/media/339334/burger_zinger.jpg", price: "95.00"},
		{prodID: "006", catId: "101", vendorId: "202", name: "DOUBLE CRUNCH BURGER Ala-carte", desc: "A delicious Double Crunch Burger, with two 100% breast fillet chicken crispy strips, creamy pepper mayo, crisp lettuce on a warm sesame seed bun.", img: "https://kfc.com.au/media/339336/burger_doublecrunch.jpg", price: "95.00"},

		{prodID: "007", catId: "101", vendorId: "204", name: "Burger Yum", desc: "Burger Yum Solo", img: "https://kfc.com.au/media/339336/burger_doublecrunch.jpg", price: "30.00"},
		{prodID: "008", catId: "101", vendorId: "204", name: "Burger Yum with Cheese", desc: "Burger Yum with Cheese - Solo", img: "http://www.jollibee.com.ph/wp-content/uploads/2014/05/RYC-res.jpg", price: "40.00"},
		{prodID: "010", catId: "101", vendorId: "204", name: "Burger with TLC", desc: "Burger with TLC - Solo", img: "http://www.jollibee.com.ph/wp-content/uploads/2014/07/yum-with-tlc.jpg", price: "64.00"},

		{prodID: "011", catId: "104", vendorId: "203", name: "Chunky Asado Siopao", desc: "Siopao Asado can be enjoyed anytime of the day and any day of the week. You can serve this treat for breakfast, lunch , merienda , dinner or even as midnight snack", img: "https://assets.foodpanda.ph/dynamic/images/products/233/233491_1424164264_ma.jpg", price: "36.00"},
		{prodID: "012", catId: "104", vendorId: "203", name: "Buchi", desc: "Glutinous rice balls with rich lotus filling. Deep-fried and sprinkled with sesame seeds. Buchi Lotus Cream - 2pcs", img: "http://lutongpinas.com/wp-content/uploads/2012/02/buchi.jpg", price: "39.00"},
	];
});
