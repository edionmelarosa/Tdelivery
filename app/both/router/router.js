Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

if(Meteor.isClient) {
	var publicRoutes = ["home_public", "orders", "products", "vendors", "cart"];
	var privateRoutes = ["home_private", "admin", "admin.products", "admin.products.details", "admin.products.insert", "admin.products.edit", "orders"];
	var zonelessRoutes = [];

	var roleMap = [
		{ route: "admin", roles: ["admin"] },
		{ route: "admin.products", roles: ["admin"] },
		{ route: "admin.products.details", roles: ["admin"] },
		{ route: "admin.products.insert", roles: ["admin"] },
		{ route: "admin.products.edit", roles: ["admin"] }
	];

	this.firstGrantedRoute = function() {
		var grantedRoute = "";
		_.every(privateRoutes, function(route) {
			if(routeGranted(route)) {
				grantedRoute = route;
				return false;
			}
			return true;
		});

		if(grantedRoute == "") {
			if(routeGranted("home_private")) {
				return "home_private";				
			} else {
				return "home_public";
			}
		}

		return grantedRoute;
	}

	// this function returns true if user is in role allowed to access given route
	this.routeGranted = function(routeName) {
		if(!routeName) {
			// route without name - enable access (?)
			return true;
		}

		if(!roleMap || roleMap.length === 0) {
			// this app don't have role map - enable access
			return true;
		}

		var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
		if(!roleMapItem) {
			// page is not restricted
			return true;
		}

		if(!Meteor.user() || !Meteor.user().roles) {
			// user is not logged in
			return false;
		}

		// this page is restricted to some role(s), check if user is in one of allowedRoles
		var allowedRoles = roleMapItem.roles;
		var granted = _.intersection(allowedRoles, Meteor.user().roles);
		if(!granted || granted.length === 0) {
			return false;
		}

		return true;
	};
	
	Meteor.subscribe("current_user_data");

	Router.ensureLogged = function() {
		if(!Meteor.user()) {
			// user is not logged in - redirect to public home
			this.redirect("home_public");
			return;
		} else {
			// user is logged in - check role
			if(!routeGranted(this.route.getName())) {
				// user is not in allowedRoles - redirect to private home
				var redirectRoute = firstGrantedRoute();
				this.redirect(redirectRoute);
				return;				
			}
			this.next();
		}
	};

	Router.ensureNotLogged = function() {
		if(Meteor.user()) {
			var redirectRoute = firstGrantedRoute();
			this.redirect(redirectRoute);
		}
		else
			this.next();
	};

	Router.onBeforeAction(function() {
		// loading indicator here
		if(!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});

	Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
	Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
}

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("orders", {path: "/orders", controller: "OrdersController"});
	this.route("products", {path: "/products", controller: "ProductsController"});
	this.route("categories", {path: "/categories", controller: "CategoriesController"});
	this.route("vendors", {path: "/vendors", controller: "VendorsController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.products", {path: "/admin/products", controller: "AdminProductsController"});
	this.route("admin.products.details", {path: "/admin/products/details/:productId", controller: "AdminProductsDetailsController"});
	this.route("admin.products.insert", {path: "/admin/products/insert", controller: "AdminProductsInsertController"});
	this.route("admin.products.edit", {path: "/admin/products/edit/:productId", controller: "AdminProductsEditController"});
	this.route("cart", {path: "/cart", controller: "CartController"});
	this.route("location", {path: "/location", controller: "LocationController"});
	this.route("prduct", {path: "/product", controller: "ProductController"});
	this.route("thankyou", {path: "/thankyou", controller: "ThankyouController"});
});