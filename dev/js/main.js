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
		if($(window).width() > 1024 ) {
			event.preventDefault();
			var href = $(this).attr('href').substr(1);
			var elem = document.getElementById(href);
			if(elem) {
				TweenMax.to($(window), 1, {
					scrollTo:{
						y:elem, 
						autoKill: true
					}, 
					ease:Power3.easeOut 
				});
			}
		}
	});
	
	$('.main-menu__control').click(function(event) {
		event.preventDefault();
		$('.main-menu__wrapper, .protfolio-menu__wrapper').toggleClass('visible');
		$('.main-menu__close').toggleClass('visible');
		if($('.main-menu__wrapper').hasClass('visible')) {
			$('.callback-ico').removeClass('active');
		}
	});

	if($(window).width() > 1000) {
		$(document).scroll(function() {
			$('.main-menu__wrapper').toggleClass('active', $(document).scrollTop() >= 350);
			$('.callback-ico').toggleClass('active', $(document).scrollTop() >= 350 && !$('.main-menu__wrapper').hasClass('visible'));
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


	function isValidEmailAddress(emailAddress) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(emailAddress);
	};
	$('form').each(function() {
		var form = $(this);
		form.find('.send-btn').click(function() {
			form.find('.err').removeClass('err');
			var send = true;
			var fromBottom;
			if($(this).parents('#contacts')) {
				fromBottom = true;
			}
			form.find('input[type=email]').each(function() {
				var emailAddress = $(this).val();
				if(!isValidEmailAddress(emailAddress)) {
					$(this).parent('.contacts__form-row').addClass('err');
					send = false;
				}
			});
			form.find('input[type=text]').each(function() {
				var nameVal = $(this).val();
				if(!nameVal) {
					$(this).parent('.contacts__form-row').addClass('err');
					send = false;
				}
			});
			if (send === true) {
				$.ajax({
			        cache: false,
			        url: "/send.php",
			        type: "POST",
			        data: form.serialize(),
			        success: function(response){
			        	if(fromBottom) {
			        		form.trigger('reset');
							$('.hide-in-thank').addClass('hidden');
							$('.thank').addClass('visible');
							disableScroll();
							$('body').addClass('no-scroll');
							$('#big-popup').addClass('active');

						}else {
							form.trigger('reset');
							$('.hide-in-thank').addClass('hidden');
							$('.thank').addClass('visible');
						}
			        },
			    });
			}
			return false;
		});
	});


});//ready

$(window).load(function() {
	// $('img').css('display', 'none');
	$('.loader').fadeOut(500);
	$('body').removeClass('loading');
	setTimeout(function() {
		$('.promo__title span.animated').addClass('flipInX visible');
		$('.promo__subtitle').addClass('fadeInUp visible');
		$('.promo__menu').addClass('fadeInRight visible');
		$('.promo__logo').addClass('fadeInLeft visible');
		$('.promo__tabs').addClass('fadeInUp visible');
		//page
		$('.page__logo').addClass('fadeInLeft visible');
		$('.page__menu').addClass('fadeInRight visible');
		$('.page__title span.animated').addClass('flipInX visible');
		$('.page__description').addClass('fadeInUp visible');
		$('.page__heading').addClass('background-animated');
	}, 500);
	setTimeout(function() {
		$('.promo__title').addClass('visible');
		//page
		$('.page__title').addClass('visible');
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


var singleApp = new Vue({
	el: '#single-portfolio',
	data: {
		json: null,
		title: '',
		description: '',
		siteUrl: '',
		fullTags: '',
		fullImage: '',
	}
});

var singlePortfolio = document.getElementById('single-portfolio');
var portfolioID = window.location.hash.substr(1);

if(portfolioID && singlePortfolio) {
	$.getJSON('../portfolio.json', function(data) {
		$.each(data, function(i, obj) {
			if(i === portfolioID) {
				singleApp.json = obj;
				singleApp.title = obj.title;
				singleApp.description = obj.description;
				singleApp.siteUrl = obj.siteUrl;
				singleApp.fullTags = obj.fullTags;
				singleApp.fullImage = obj.fullImage;
			}
		});
		if(!singleApp.json) {
			window.location = '/portfolio';
		}
	});
}else if(singlePortfolio && !portfolioID) {
	window.location = '/portfolio';
}


var portfolioList = new Vue({
	el: '#portfolio-list',
	data: {
		portfolioItems: '',
	}
});

var portfolio = document.getElementById('portfolio-list');
if(portfolio) {
	$.getJSON('../portfolio.json', function(data) {
		portfolioList.portfolioItems = data;
	});
}










