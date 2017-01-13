$(document).ready(function() {

	$('.promo__tab').click(function(event) {
		var index = $(this).index();
		$('.promo__tab').removeClass('active-tab');
		$(this).addClass('active-tab');
		$('.tabs .tab').removeClass('is-visible');
		$('.tabs .tab').eq(index).addClass('is-visible');
		var topY = $(this).offset().top;
		TweenMax.to($(window), 1, {
			scrollTo:{
				y: topY, 
				autoKill: true
			}, 
			ease:Power3.easeOut 
		});
	});

	$('.js--scrollto__link').click(function(event) {
		event.preventDefault();
		var href = $(this).attr('href').substr(1);
		var elem = document.getElementById(href)
		if(elem) {
			TweenMax.to($(window), 1, {
				scrollTo:{
					y:elem, 
					autoKill: true
				}, 
				ease:Power3.easeOut 
			});
		}
		
	});
	// var scrollorama = $.scrollorama({ blocks:'.scrollblock'});

	// scrollorama.animate('#title1',{ duration: 300, property:'zoom', end: 1.2 });
	// scrollorama.animate('#title2',{ duration: 600, property:'rotate', delay: 500,start:0,end:180 });
	// scrollorama.animate('#title3',{ duration: 600, property:'left', start:-800,end: 0 });
	
	// var s = skrollr.init({
	// 	smoothScrolling: false
	// });
	// 1000,670,600,470
	$('.main-menu__control').click(function(event) {
		event.preventDefault();
		$('.main-menu__wrapper').toggleClass('visible');
		$('.main-menu__close').toggleClass('visible');
	});

	if($(window).width() > 1000) {
		$(document).scroll(function() {
			$('.main-menu__wrapper').toggleClass('active', $(document).scrollTop() >= 350);
		});
	}else {
		$('.main-menu__wrapper').addClass('active');
	}

	$('.promo__mobile--tabs').change(function(event) {
		var index = $(this).prop('selectedIndex');
		$('.tabs .tab').removeClass('is-visible');
		$('.tabs .tab').eq(index).addClass('is-visible');
		var topY = $(this).offset().top;
		TweenMax.to($(window), 1, {
			scrollTo:{
				y: '#services', 
				autoKill: true
			}, 
			ease:Power3.easeOut 
		});
	});

	if($(window).width() <= 670) {
		var tabOffset = $('#services').offset().top;
		$(document).scroll(function() {
			var scrolled = $(this).scrollTop();
			var tabsTopPosition = $('.tabs').offset().top;
			var scrollMax = $('.tabs').outerHeight();
			var tabUnstickPosition = tabsTopPosition + scrollMax;
			if(scrolled >= tabOffset && scrolled <= tabUnstickPosition) {
				if(!$('.promo__mobile--tabs-wrapper').hasClass('sticky')) {
					$('.promo__mobile--tabs-wrapper').addClass('sticky');
				}
			}else {
				if($('.promo__mobile--tabs-wrapper').hasClass('sticky')) {
					$('.promo__mobile--tabs-wrapper').removeClass('sticky');
				}
			}
		});
	}

	
	
	
});