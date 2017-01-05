$(document).ready(function() {
	$(window).smoothWheel();
	$('.promo__tab').click(function(event) {
		var index = $(this).index();
		$('.promo__tab').removeClass('active-tab');
		$(this).addClass('active-tab');
		$('.tabs .tab').removeClass('is-visible');
		$('.tabs .tab').eq(index).addClass('is-visible');
	});
	// var scrollorama = $.scrollorama({ blocks:'.scrollblock'});

	// scrollorama.animate('#title1',{ duration: 300, property:'zoom', end: 1.2 });
	// scrollorama.animate('#title2',{ duration: 600, property:'rotate', delay: 500,start:0,end:180 });
	// scrollorama.animate('#title3',{ duration: 600, property:'left', start:-800,end: 0 });
	var s = skrollr.init();
	
});