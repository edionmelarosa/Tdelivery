Meteor.methods({
	addToCart: function(val){

		var c = Cart.find({prodId: val.prodId}).count();

		if (c === 0) {
			Cart.insert(val);
		}else{
			var data = Cart.find({prodId: val.prodId}).fetch();
			console.log(val.quantity);
			console.log(data[0].quantity);
			Cart.update({prodId: val.prodId}, {$set: {quantity: parseInt(val.quantity)+parseInt(data[0].quantity)}});
		}
	}	
});