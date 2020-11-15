
$(document).ready(function() {

	'use strict';
	var isMobile = false; 
	if( /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			$('html').addClass('touch');
			isMobile = true;
	}
	else {
			$('html').addClass('no-touch');
			isMobile = false;
	}
	anime({
			targets: 'body',
			opacity: 1,
			delay: 400,
			complete: function(anim) {
					progressBar(); //Init progress bar
			}
	});
	
	$('body, .js-img-load').imagesLoaded({ background: !0 }).always( function( instance ) {
		preloader(); //Init preloader
	});

	function preloader() {
			var tl = anime.timeline({}); 
			tl
			.add({
					targets: '.preloader',
					duration: 1,
					opacity: 1
			})
			.add({
					targets: '.circle-pulse',
					duration: 300,
					opacity: 1,
					zIndex: '-1',
					easing: 'easeInOutQuart'
			},'+=500')
			.add({
					targets: '.preloader__progress span',
					duration: 500,
					width: '100%',
		easing: 'easeInOutQuart'
			},'-=500')
			.add({
					targets: '.preloader',
					duration: 500,
					opacity: 0,
					zIndex: '-1',
					easing: 'easeInOutQuart'
			});
	};
	$('.hamburger').on('click', function() {
			$(this).toggleClass('is-active');
		$('.inner-menu').toggleClass('is-active');
	$('body').toggleClass('open-menu');
	});
	var sideNavOpen = $('.hamburger');
	var sideNavTl = anime.timeline({autoplay: false});

	if (window.matchMedia("(max-width: 580px)").matches) {
			$('.js-menu').each(function(i) {
					sideNavTl
					.add({
							targets: '.nav',
							duration: 1000,
							width: ['0', '100%'],
							opacity: [0, 1],
							easing: 'easeInOutBack'
					})
					.add({
							targets: '.nav__item',
							duration: 200,
							delay: anime.stagger(50),
							opacity: [0, 1],
							translateX: [70, 0],
							easing: 'easeInOutBack'
					},'-=500');
			}); 
	} else {
			$('.js-menu').each(function(i) {
					sideNavTl
					.add({
							targets: '.nav',
							duration: 1000,
							width: ['0', '100%'],
							easing: 'easeInOutBack'
					})
					.add({
							targets: '.nav__item',
							duration: 200,
							delay: anime.stagger(50),
							opacity: [0, 1],
							translateX: [70, 0],
							easing: 'easeInOutBack'
					},'-=500');
			});  
	}
	
	$(sideNavOpen).on('click', function(e) {
			e.preventDefault();
			if (sideNavTl.began) {
					sideNavTl.reverse()
		sideNavTl.completed = false;
			}
			if (sideNavTl.paused) {
					sideNavTl.play()
			}
	});
$('.js-carousel-review').each(function() {
	var carousel = new Swiper('.js-carousel-review', {
					slidesPerView: 2,
		spaceBetween: 30,
		speed: 300,
		grabCursor: true,
		watchOverflow: true,
					pagination: {
							el: '.swiper-pagination',
					clickable: true
					},
		autoplay: {
							delay: 5000,
					},
		breakpoints: {
							580: {
				slidesPerView: 1,
									spaceBetween: 20
							},
							991: {
									slidesPerView: 1
							}
					}
	});
});
$('.js-carousel-clients').each(function() {
	var carousel = new Swiper('.js-carousel-clients', {
					slidesPerView: 4,
		spaceBetween: 30,
		grabCursor: true,
		watchOverflow: true,
					pagination: {
							el: '.swiper-pagination',
					clickable: true
					},
		breakpoints: {
							320: {
									slidesPerView: 1,
									spaceBetween: 0
							},				
							580: {
									slidesPerView: 2,
									spaceBetween: 30
							},				
							991: {
									slidesPerView: 3,
									spaceBetween: 30
							}
					}
	});
});
	function activeStickyKit() {
			$('.sticky-column').stick_in_parent({
					parent: '.sticky-parent'
			});
			$('.sticky-column')
			.on('sticky_kit:bottom', function(e) {
					$(this).parent().css('position', 'static');
			})
			.on('sticky_kit:unbottom', function(e) {
					$(this).parent().css('position', 'relative');
			});
	};
	activeStickyKit();

	function detachStickyKit() {
			$('.sticky-column').trigger("sticky_kit:detach");
	};
	//  based on your window width

	var screen = 1200;

	var windowHeight, windowWidth;
	windowWidth = $(window).width();
	if ((windowWidth < screen)) {
			detachStickyKit();
	} else {
			activeStickyKit();
	}
	// window resize
	function windowSize() {
			windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
			windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
	}
	windowSize();

	function debounce(func, wait, immediate) {
			var timeout;
			return function() {
					var context = this, args = arguments;
					var later = function() {
							timeout = null;
							if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
			};
	};

	$(window).resize(debounce(function(){
			windowSize();
			$(document.body).trigger("sticky_kit:recalc");
			if (windowWidth < screen) {
					detachStickyKit();
			} else {
					activeStickyKit();
			}
	}, 250));
function progressBar() {
		$('.progress').each(function() {
			var ctrl = new ScrollMagic.Controller();
			new ScrollMagic.Scene({
							triggerElement: '.progress',
						triggerHook: 'onEnter',
						duration: 300
					})
					.addTo(ctrl)
			.on("enter", function (e) {
				var progressBar = $('.progress-bar');
							progressBar.each(function(indx){
									$(this).css({'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2'});
							});
			});
			});
	}
	function scrollIndicator() {
			$(window).on('scroll', function() {
					var wintop = $(window).scrollTop(), docheight = 
					$(document).height(), winheight = $(window).height();
				 var scrolled = (wintop/(docheight-winheight))*100;
					$('.scroll-line').css('width', (scrolled + '%'));
			});
	}

scrollIndicator(); //Init
	function scrollToTop() {
			var $backToTop = $('.back-to-top'),
					$showBackTotop = $(window).height();
		
			$backToTop.hide();


			$(window).scroll( function() {
					var windowScrollTop = $(window).scrollTop();
					if( windowScrollTop > $showBackTotop ) {
							$backToTop.fadeIn('slow');
					} else {
							$backToTop.fadeOut('slow');
					}
			});
			
	$backToTop.on('click', function (e) {
					e.preventDefault();
					$(' body, html ').animate( {scrollTop : 0}, 'slow' );
			});
	}

scrollToTop(); //Init
	$('.js-image').each(function(){
			var dataImage = $(this).attr('data-image');
			$(this).css('background-image', 'url(' + dataImage + ')');
	});
	$('textarea').each(function(){
			autosize(this);
	});
$('.js-tabs').each(function(){
		$('.content .tabcontent').hide();
			$('.content .tabcontent:first').show();
			$('.nav .nav__item a').on('click', function () {
					$('.nav .nav__item a').removeClass('active');
					$(this).addClass('active');
					var currentTab = $(this).attr('href');
					$('.content .tabcontent').hide();            
					$(currentTab).show();
					$portfolioMasonry.isotope ({
							columnWidth: '.gallery-grid__item',
							gutter: '.gutter-sizer',
							isAnimated: true
					});
		$('.js-scroll').getNiceScroll().resize()
					return false;
			});
		var screenMobile = 580;

		windowWidth = $(window).width();
			if ((windowWidth < screenMobile)) {	
					$('.nav .nav__item a').on('click', function (e) {
						e.preventDefault();
							$('.hamburger').removeClass('is-active');
					$('.inner-menu').removeClass('is-active');
					$('body').removeClass('open-menu');
		
							if (sideNavTl.began) {
									sideNavTl.reverse()
						sideNavTl.completed = false;
							}
							if (sideNavTl.paused) {
									sideNavTl.play()
							}
				});
					$(".nav__item a").click(function(e) {
					e.preventDefault();
					var offset = -35;
	
							$('html, body').animate({
									scrollTop: $("#content").offset().top + offset
							}, 0);
					});			
		} else {
	
		}
});
	$(function () {
			$('[data-toggle="tooltip"]').tooltip()
	});
	$('.select').on('click','.placeholder',function(){
		var parent = $(this).closest('.select');
		if ( ! parent.hasClass('is-open')){
				parent.addClass('is-open');
				$('.select.is-open').not(parent).removeClass('is-open');
		}else{
				parent.removeClass('is-open');
		}
	}).on('click','ul>li',function(){
			var parent = $(this).closest('.select');
			parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
			parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );

		$('.filter__item').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
	
		$('.js-filter-container').isotope({
				filter: selector
		});
		return false;	
	});
	var $portfolioMasonry = $('.js-masonry').isotope({
			itemSelector: '.gallery-grid__item',
		layoutMode: 'fitRows',
			percentPosition: true,
		transitionDuration: '0.5s',
			hiddenStyle: {
					opacity: 0,
					transform: 'scale(0.001)'
			},
			visibleStyle: {
					opacity: 1,
					transform: 'scale(1)'
			},
			fitRows: {
					gutter: '.gutter-sizer'
			},	
			masonry: {
				columnWidth: '.gallery-grid__item',
					gutter: '.gutter-sizer',
					isAnimated: true
			}
	});

	$portfolioMasonry.imagesLoaded().progress( function() {
			$portfolioMasonry.isotope ({
				columnWidth: '.gallery-grid__item',
					gutter: '.gutter-sizer',
					isAnimated: true,
				layoutMode: 'fitRows',
					fitRows: {
							gutter: '.gutter-sizer'
					}
		});
	});	
	$('textarea').niceScroll({
	horizrailenabled:false
});
	$(function() {
			$('.emoji-wrap img').on('click', function(){
					var emoji = $(this).attr('title');
					$('#commentForm').val($('#commentForm').val()+" "+emoji+" ");
			});
	});
	mediumZoom('[data-zoom]', {
			margin: 30
	});
	lazySizes.init();
	var $someImages = $('img.cover');
	objectFitImages($someImages);
	$("#contact-form").validator().on("submit", function (event) {
			if (event.isDefaultPrevented()) {
					formError();
					submitMSG(false, "Please fill in the form...");
			} else {
					event.preventDefault();
					submitForm();
			}
	});

	function submitForm(){
			var name = $("#nameContact").val(),
					email = $("#emailContact").val(),
					message = $("#messageContact").val();
		
			var url = "assets/php/form-contact.php";
	
			$.ajax({
					type: "POST",
					url: url,
					data: "name=" + name + "&email=" + email + "&message=" + message,
					success : function(text){
							if (text == "success"){
									formSuccess();
							} else {
									formError();
									submitMSG(false,text);
							}
					}
			});
	}

	function formSuccess(){
			$("#contact-form")[0].reset();
			submitMSG(true, "Thanks! Your message has been sent.");
	}

	function formError(){
			$("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass();
			});
	}  

	function submitMSG(valid, msg){
	var msgClasses;
			if(valid){
					msgClasses = "validation-success";
			} else {
				 msgClasses = "validation-danger";
			}
			$("#validator-contact").removeClass().addClass(msgClasses).text(msg);
	}
});