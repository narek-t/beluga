var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		// window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		// window.ontouchmove = null;  
		document.onkeydown = null;  
}

$(document).ready(function() {
	$('.promo__tab').click(function(event) {
		var index = $(this).index();
		$('.promo__tab').removeClass('active-tab');
		$(this).addClass('active-tab');
		$('.tabs .tab').removeClass('is-visible');
		$('.tabs .tab').find('.fadeInUp').removeClass('fadeInUp animated');
		$('.tabs .tab').find('.wow').removeClass('wow').removeAttr('style');
		$('.tabs .tab').eq(index).addClass('is-visible');
		$('.tabs .tab').eq(index).find('.tab-fade').addClass('fadeInUp animated');
		$('.tabs .tab').eq(index).find('.tab-fadeup').addClass('fadeInUp animated');
		var topY = $(this).offset().top;
		TweenMax.to($(window), 1, {
			scrollTo:{
				y: topY,
				autoKill: true
			}, 
			ease:Power3.easeOut 
		});
	});

	$('.tab__development .full-link, .tab__development .btn').click(function(event) {
		event.preventDefault();
		$('.tab__development').removeClass('active');
		$(this).parents('.tab__development').addClass('active');
	});
	$('.tab__development-full__close').click(function(event) {
		event.preventDefault();
		$(this).parents('.tab__development').removeClass('active');
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
	// 1830,1370,1200,1000,670,600,470
	$('.main-menu__control').click(function(event) {
		event.preventDefault();
		$('.main-menu__wrapper, .protfolio-menu__wrapper').toggleClass('visible');
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

	if($(window).width() <= 670 && document.getElementById('services')) {
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


	// if($(window).width() >= 600 && document.getElementById('single-portfolio')) {
	// 	var cloned = $('.single-portfolio__top').clone().addClass('cloned');
	// 	$(cloned).insertAfter('.single-portfolio__top');



	// 	$(document).on('DOMMouseScroll mousewheel', function (e) {
	// 		var scrolled = $(this).scrollTop();
	// 		var headingHeight = $('.single-portfolio__top').outerHeight();

	// 		if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0 && scrolled > headingHeight) {
	// 			$('.single-portfolio__top.cloned').removeClass('visible')
	// 		} else {
	// 			console.log('Up');
	// 			$('.single-portfolio__top.cloned').addClass('visible')
	// 		}
	// 	});

	// }
	$('.open-popup').click(function(event) {
		event.preventDefault();
		var open = $(this).data('open');
		disableScroll();
		$('body').addClass('no-scroll');
		$('#'+open).addClass('active');
	});

	$('.close-popup').click(function(event) {
		$('body').removeClass('no-scroll');
		$('.popup').removeClass('active');
		enableScroll();
	});
	var startNumber = 0;

	$('.load-more-reviews').click(function(event) {
		event.preventDefault();
		$.getJSON('../reviews.json', function(data) {
			var count = data.length;
			var html = [];
			var displayCount = 8;
			$.each(data, function (key, val) {
				html.push('<div class="reviews__list-item animated fadeInUp"><div class="reviewer-logo"><img src="'+val.logo+'" alt=""></div><p class="reviewer-name">'+val.name+'</p><p class="reviwere-text">'+val.text+'</p></div>');
			});
			var x = html.slice(startNumber, startNumber+displayCount);
			$('#reviews__list').append(x)
			startNumber+=displayCount;
			if(count < startNumber) {
				$('.load-more-reviews').remove();
			}
		});

	});





});//ready

$(window).load(function() {
	$('.loader').fadeOut(500);
	$('body').removeClass('loading');
	setTimeout(function() {
		$('.promo__title span.animated').addClass('flipInX visible');
		$('.promo__subtitle').addClass('fadeInUp visible');
		$('.promo__menu').addClass('fadeInRight visible');
		$('.promo__logo').addClass('fadeInLeft visible');
		$('.promo__tabs').addClass('fadeInUp visible');
	}, 500);
	setTimeout(function() {
		$('.promo__title').addClass('visible');
	}, 1000);

	if(!Cookies.get('popup')) {
		setTimeout(function() {
			disableScroll();
			$('body').addClass('no-scroll');
			$('#big-popup').addClass('active');
		}, 45000);
		Cookies.set('popup', 'opened', { expires: 7 });
		
	}
});

var wow = new WOW({
    offset: 100,
});
wow.init();