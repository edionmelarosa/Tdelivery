Vendors.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return true;
	},

	remove: function (userId, doc) {
		return true;
	}
});

Vendors.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Vendors.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Vendors.before.remove(function(userId, doc) {
	
});

Vendors.after.insert(function(userId, doc) {
	
});

Vendors.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Vendors.after.remove(function(userId, doc) {
	
});
