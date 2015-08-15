ProductCategories.allow({
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

ProductCategories.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

ProductCategories.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductCategories.before.remove(function(userId, doc) {
	
});

ProductCategories.after.insert(function(userId, doc) {
	
});

ProductCategories.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductCategories.after.remove(function(userId, doc) {
	
});
