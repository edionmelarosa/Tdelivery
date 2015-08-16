Template.MenuTab.rendered = function() {
	$('.filter-list .btn-group a').on('click', function(){ 
		var t = $(this);
		t.siblings().removeClass('btn-primary active');
		t.addClass('btn-primary active');
	});

	$('.navbar-brand').on('click', function(){
		$('.filter-list .btn-group a').removeClass('btn-primary active');
		$('.filter-list .btn-group a:first-child').addClass('btn-primary active');
	});
};
	