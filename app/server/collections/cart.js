Cart.allow({
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

Cart.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Cart.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Cart.before.remove(function(userId, doc) {
	
});

Cart.after.insert(function(userId, doc) {
	
});

Cart.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Cart.after.remove(function(userId, doc) {
	
});
