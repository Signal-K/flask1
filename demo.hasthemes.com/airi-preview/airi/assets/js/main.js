(function($){

	'use strict';

    // Check if element exists
    $.fn.elExists = function() {
        return this.length > 0;
    };

	// Variables
	var $html, window_width, pageUrl, header, headerInner, headerInnerPosition, topBarHeight, mainHeaderHeight, headerTotalHeight, mobileHeader, mobileHeaderInner, mobileHeaderInnerPosition,
	mobileHeaderHeight, $body, $galleryWithThumbs, $elementCarousel, $window, $instafeed;

	$body = $('body');
	$html = $('html');
	header = $('.header');
	headerInner = $('.header .header-inner');
	mobileHeader = $('.header-mobile');
	mobileHeaderInner = $('.header-mobile__inner');
	$window = $(window);
	window_width = $(window).width();
	pageUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	topBarHeight = ( $('header .top-bar').elExists() ) ? $('header .top-bar')[0].getBoundingClientRect().height : 0;
	mainHeaderHeight = ( $('.header-inner').elExists() ) ? $('.header-inner')[0].getBoundingClientRect().height : 0;
	headerInnerPosition = ( $('.header-inner').elExists() ) ? $('.header-inner').offset().top : '';
	headerTotalHeight = topBarHeight + mainHeaderHeight;
	mobileHeaderHeight = ($('.header-mobile__inner').elExists()) ? $('.header-mobile__inner')[0].getBoundingClientRect().height : 0;
	mobileHeaderInnerPosition = ( $('.header-mobile__inner').elExists() ) ? $('.header-mobile__inner').offset().top : '';
	$galleryWithThumbs = $('.gallery-with-thumbs');
	$elementCarousel = $('.airi-element-carousel');
	$instafeed = $('.instagram-feed-wrapper');



	/**********************
	*Mobile Menu Activatin
	***********************/ 
    $( '#dl-menu' ).dlmenu({
        animationClasses : { 
			classin: "dl-animate-in-2",
			classout: "dl-animate-out-2"
        }
    });
    

	$('.menu-btn').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('open');
		$('.mobile-navigation').toggleClass('open-mobile-menu');
		$('.dl-menu').toggleClass('dl-menuopen');
	});
    
    $(".main-navigation a").each(function() {
        if ($(this).attr("href") === pageUrl || $(this).attr("href") === '') {
            $(this).closest('li').addClass("active");
            $(this).parents('li.mainmenu__item').addClass('active');
        }
        else if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            $('.main-navigation a[href="index.html"]').parent('li').addClass('active');
        }
	});
	
	/**********************
	* Background Color
	***********************/

	var $bgcolor = $('.bg-color');
	$bgcolor.each(function(){
		var $this = $(this),
			$color = $this.data('bg-color');
		$this.css('background-color', $color);
	});
	
	/**********************
	* Background Image
	***********************/

	var $bgimage = $('.bg-image');
	$bgimage.each(function(){
		var $this = $(this),
			$image = $this.data('bg-image');
		$this.css({
			'background-image': 'url(' + $image + ')'
		});
	});


	/**********************
	* Countdown Activation
	***********************/
	
	$('[data-countdown]').each(function() {
		var $this = $(this), finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function(event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Minutes</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Seconds</span></div>'));
		});
	}); 

	/**********************
	*Header Toolbar Sidenav Expand
	***********************/

	function toolbarExpand(){
		$('.toolbar-btn').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var target = $(this).attr('href');
			// var prevTarget = $('.toolbar-btn').attr('href');
			var prevTarget = $(this).parent().siblings().children('.toolbar-btn').attr('href');
			$(target).addClass('open');
			$(prevTarget).removeClass('open');
			if(!$(this).is('.search-btn')){
				$('.ai-global-overlay').addClass('overlay-open');
			}
			$('.main-navigation').removeClass('open-mobile-menu');
			$('.dl-menu').removeClass('dl-menuopen');
			$('.menu-btn').removeClass('open');
		});
	}

	

	/**********************
	*Click on Documnet
	***********************/

	function clickDom(){
		$body.on('click', function (e){
		    var $target = e.target;
		    var dom = $('.wrapper').children();
		    
		    if (!$($target).is('.toolbar-btn') && !$($target).is('.product-filter-btn') && !$($target).parents().is('.open')) {
		        dom.removeClass('open');
		        dom.find('.open').removeClass('open');
		        $('.ai-global-overlay').removeClass('overlay-open');
		    }
		});
	};


	/**********************
	*Close Button Actions
	***********************/

	function closeItems(){
		$('.btn-close').on('click', function(e){
			e.preventDefault();
			$(this).parents('.open').removeClass('open');
			if($('.ai-global-overlay').hasClass('overlay-open')){
				$('.ai-global-overlay').removeClass('overlay-open');
			}
		});
	}

	/**********************
	* Overlay Menu
	***********************/
    
	var $offcanvasNav = $('.offcanvas-menu'),
		$offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu');

	/*Add Toggle Button With Off Canvas Sub Menu*/
	$offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fa fa-angle-right"></i></span>');

	/*Close Off Canvas Sub Menu*/
	$offcanvasNavSubMenu.slideUp();

	/*Category Sub Menu Toggle*/
	$offcanvasNav.on('click', 'li a, li .menu-expand', function (e) {
		var $this = $(this);
		if (
			$this.parent().hasClass('has-children') &&
			($this.attr('href') === '#' || $this.hasClass('menu-expand'))
		) {
			e.preventDefault();
			if ($this.siblings('ul:visible').length) {
				$this.siblings('ul').slideUp('slow');
			} else {
				$this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
				$this.closest('li').siblings('li').removeClass('menu-open');
				$this.siblings('ul').slideDown('slow');
			}
		}
		if ($this.is('a') || $this.is('span') || $this.attr('class').match(/\b(menu-expand)\b/)) {
			$this.parent().toggleClass('menu-open');
		} else if ($this.is('li') && $this.attr('class').match(/\b('has-children')\b/)) {
			$this.toggleClass('menu-open');
		}
	});
	

	/**********************
	* Sticky Header
	***********************/

	function stickyConditional(selector, height){
		$(window).on('scroll', function(){
			if ($(window).scrollTop() > height) {
				$(selector).addClass('sticky--pinned').css('top', 0);
				header.addClass('is-sticky');
				mobileHeader.addClass('is-sticky');
			}
			else {
				$(selector).removeClass('sticky--pinned');
				header.removeClass('is-sticky');
				mobileHeader.removeClass('is-sticky');
			}
		});
	}

	function stickyHeader(){
		if(window.innerWidth < 992){
			stickyConditional('.header-mobile .fixed-header', mobileHeaderInnerPosition);
		}else{
			stickyConditional('.header .fixed-header', headerInnerPosition);
		}
	}


	$('.mobile-sticky-header-height').css('height', mobileHeaderHeight);
	$('.main-sticky-header-height').css('height', mainHeaderHeight);



	function stickySocial(stickyArg){
		if($(stickyArg.selector).elExists()){
			var sticky = $(stickyArg.selector);
			var container = $(stickyArg.container);
			var topPosition = sticky.offset().top;
			var leftPosition = sticky.offset().left;
			var height = sticky.outerHeight();
			var containerHeight = container.outerHeight();
			var containerTop = container.offset().top;
			var stickyPosition =  topPosition - height;
			var topSpacing = stickyArg.topSpacing;
			var defaultTopSpacing = topPosition - containerTop;
			var columnWidth = parseInt(stickyArg.columnWidth, 10);
			var className = stickyArg.selector.substr(1);

			$(window).on('scroll', function(){
				var windowTop = $(window).scrollTop(); 
				if(windowTop >= stickyPosition && windowTop <= containerHeight){
					sticky.addClass('fixed').css({'left': leftPosition, 'top': topSpacing});
				} else{
					sticky.removeClass('fixed').css({'left': 'auto', 'top': defaultTopSpacing+'px'});
				}
			});

			$(window).on({
				load: function(){
					
					if(window_width < columnWidth){
						sticky.removeClass(className).addClass('no-sticky');
					}else{
						sticky.addClass(className).removeClass('no-sticky');
					}
				},
				resize: function(){
					var ww = $(window).width();
					if(ww < columnWidth){
						sticky.removeClass(className).addClass('no-sticky');
					}else{
						sticky.addClass(className).removeClass('no-sticky');
					}
				}
			});
		}

	}
	var SocialStickyArg = {
		"selector": ".sticky-social",
		"container": ".single-post",
		"topSpacing": "100px",
		"columnWidth": "992"
	}

	stickySocial(SocialStickyArg);

	/**********************
	*Close Notice
	***********************/

	function closeNotice(){
		$('.close-notice').on('click', function(e){
			e.preventDefault();
			$('.notice-text-wrapper').slideUp('500').addClass('notice-text-close');
		});
	}
	

	/**********************
	*Adding Slide effect to dropdown
	***********************/ 

	function dropdownAnimation(){
		$('.dropdown').on('show.bs.dropdown', function(e){
		  $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
		});

		$('.dropdown').on('hide.bs.dropdown', function(e){
		  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
		});		
	}


	/**********************
	*BootStrap Tab
	***********************/ 

	$('.product-tab__link').on('click', function(){
		var parent = $(this).parent('.product-tab__item');
		parent.addClass('active');
		parent.siblings().removeClass('active');
	});

	/**********************
	* Product Quantity
	***********************/

	function customQantity(){
	    $(".quantity").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');

	    $(".qtybutton").on("click", function () {
	        var $button = $(this);
			var oldValue = $button.parent().find("input").val();
			var newVal;
	        if ($button.hasClass("inc")) {
	            newVal = parseFloat(oldValue) + 1;
	        } else {
	            // Don't allow decrementing below zero
	            if (oldValue > 1) {
	                newVal = parseFloat(oldValue) - 1;
	            } else {
	                newVal = 1;
	            }
	        }
	        $button.parent().find("input").val(newVal);
	    });		
	}



	/**********************
	* Expand User Activation
	***********************/

	function expandAction(){
		$(".expand-btn").on('click', function(e){
			e.preventDefault();
			var target = $(this).attr('href');
			$(target).slideToggle('slow');
		});
	}

	/**********************
	*Expand new shipping info  
	***********************/

	function expandShippingInfo(){
		$("#shipdifferetads").on('change', function(){
			if(  $("#shipdifferetads").prop( "checked" ) ){
				$(".ship-box-info").slideToggle('slow');
			}else{
				$(".ship-box-info").slideToggle('slow');
			}
		})
	}


	/**********************
	* Expand payment Info
	***********************/

	function expandPaymentInfo(){
        $('input[name="payment-method"]').on('click', function () {

            var $value = $(this).attr('value');
            $(this).parents('.payment-group').siblings('.payment-group').children('.payment-info').slideUp('300');
            $('[data-method="' + $value + '"]').slideToggle('300');
        });
	}

	/**********************
	* Popup Close
	***********************/

	function popupClose(){
		$('.popup-close').on('click', function(e){
			e.preventDefault();
			$('#subscribe-popup').fadeOut('slow');
		});
		$('.ai-newsletter-popup-modal').on('click', function(e){
			e.stopPropagation();
		});
	}
	
	function productFilterExpand(){
		$('.product-filter-btn').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).toggleClass('open');
			$('.advanced-product-filters').slideToggle('slow');
		});
	}

	// User Changeable Access
	/*=====================================
	Instagram Feed JS
	======================================*/

	function airiInstaFeed(){
		if($instafeed.elExists()){
			$instafeed.each(function(index, element){
				var $this = $(this);
				var $settings = $this.data('insta-config');
				var activeId = $this.attr('id');
				if(activeId.length){
					var get = $settings.get ? $settings.get : '',
					template = $settings.template ? $settings.template : '',
					userid = $settings.userid ? $settings.userid : '',
					accesstoken = $settings.accesstoken ? $settings.accesstoken : '',
					sortBy = $settings.sortBy ? $settings.sortBy : '',
					resolution = $settings.resolution ? $settings.resolution : '',
					limit = $settings.limit ? $settings.limit : '',
					links = $settings.links ? $settings.links : false;
	 
					var userFeed = new Instafeed({
						get: get,
						userId: userid,
						accessToken: accesstoken,
						resolution: resolution,
						template: template,
						sortBy: sortBy,
						limit: limit,
						links: links,
						success: function () {    
							instaFeedCarousel();
							instaFeedCarousel2();
						}
					});
					userFeed.run();
				}
			});		
		}
	
	}

	/*=====================================
	Instagram Feed Carousel JS
	======================================*/

	function instaFeedCarousel(){
		var instagramFeed = $(".instagram-carousel");
		instagramFeed.imagesLoaded(function () {
			instagramFeed.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 1199,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}
			]
			});
		});		
	}

	function instaFeedCarousel2(){
		var instagramFeed = $(".instagram-carousel-2");
		instagramFeed.imagesLoaded(function () {
			instagramFeed.slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 1199,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}
			]
			});
		});		
	}	

	$(window).on('load', function(){
		airiInstaFeed();
	});


	/**********************
	*Magnific Popup Activation
	***********************/ 

	var imagePopup = $('.popup-btn');
	var videoPopup = $('.video-popup');

	imagePopup.magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	videoPopup.magnificPopup({
		type: 'iframe',
        closeMarkup: '<button type="button" class="custom-close mfp-close"><i class="dl-icon-close mfp-close"></i></button type="button">'
	});


	/**********************
	* Nice Select Activation
	***********************/

	$('.nice-select').niceSelect();

	/**********************
	*Product Image Carousel
	***********************/ 
	$('.product-gallery-image-carousel').slick({
		slidesToShow: 1,
		arrows: true,
		prevArrow: '<span class="slick-btn slick-prev"><i class="dl-icon-left"></i></span>',
		nextArrow: '<span class="slick-btn slick-next"><i class="dl-icon-right"></i></span>',
	});


	/**********************
	*Element Carousel
	***********************/ 

	function elementCarousel(){
		if($elementCarousel.elExists()){
			var slickInstances = [];
	
			/*For RTL*/
			if( $html.attr("dir") == "rtl" || $body.attr("dir") == "rtl" ){
				$elementCarousel.attr("dir", "rtl");
			}
		
	
			$elementCarousel.each(function(index, element){
				var $this = $(this);	
	
				// Carousel Options
				
				var $options = typeof $this.data('slick-options') !== 'undefined' ? $this.data('slick-options') : ''; 
	
				var $spaceBetween = $options.spaceBetween ? parseInt($options.spaceBetween, 10) : 0,
					$spaceBetween_xl = $options.spaceBetween_xl ? parseInt($options.spaceBetween_xl, 10) : 0,
					$spaceBetween_lg = $options.spaceBetween_lg ? parseInt($options.spaceBetween_lg, 10) : 0,
					$rowSpace = $options.rowSpace ? parseInt($options.rowSpace, 10) : 0,
					$vertical = $options.vertical ? $options.vertical : false,
					$focusOnSelect = $options.focusOnSelect ? $options.focusOnSelect : false,
					$asNavFor = $options.asNavFor ? $options.asNavFor : '',
					$fade = $options.fade ? $options.fade : false,
					$autoplay = $options.autoplay ? $options.autoplay : false,
					$autoplaySpeed = $options.autoplaySpeed ? parseInt($options.autoplaySpeed, 10) : 5000,
					$swipe = $options.swipe ? $options.swipe : true,
					$swipeToSlide = $options.swipeToSlide ? $options.swipeToSlide : true,
					$touchMove = $options.touchMove ? $options.touchMove : true,
					$verticalSwiping = $vertical ? ($options.verticalSwiping ? $options.verticalSwiping : true) : false,
					$draggable = $options.draggable ? $options.draggable : true,
					$arrows = $options.arrows ? $options.arrows : false,
					$dots = $options.dots ? $options.dots : false,
					$adaptiveHeight = $options.adaptiveHeight ? $options.adaptiveHeight : true,
					$infinite = $options.infinite ? $options.infinite : false,
					$variableWidth = $options.variableWidth ? $options.variableWidth : false,
					$centerMode = $options.centerMode ? $options.centerMode : false,
					$centerPadding = $options.centerPadding ? $options.centerPadding : '',
					$speed = $options.speed ? parseInt($options.speed, 10) : 500,
					$appendArrows = $options.appendArrows ? $options.appendArrows : $this,
					$prevArrow = $arrows === true ? ($options.prevArrow ? '<span class="'+ $options.prevArrow.buttonClass +'"><i class="'+ $options.prevArrow.iconClass +'"></i></span>' : '<button class="tty-slick-text-btn tty-slick-text-prev">previous</span>') : '',
					$nextArrow = $arrows === true ? ($options.nextArrow ? '<span class="'+ $options.nextArrow.buttonClass +'"><i class="'+ $options.nextArrow.iconClass +'"></i></span>' : '<button class="tty-slick-text-btn tty-slick-text-next">next</span>') : '',
					$rows = $options.rows ? parseInt($options.rows, 10) : 1,
					$rtl = $options.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"') ? true : false,
					$slidesToShow = $options.slidesToShow ? parseInt($options.slidesToShow, 10) : 1,
					$slidesToScroll = $options.slidesToScroll ? parseInt($options.slidesToScroll, 10) : 1;
	
				/*Responsive Variable, Array & Loops*/
				var $responsiveSetting = typeof $this.data('slick-responsive') !== 'undefined' ? $this.data('slick-responsive') : '',
					$responsiveSettingLength = $responsiveSetting.length,
					$responsiveArray = [];
					for (var i = 0; i < $responsiveSettingLength; i++) {
						$responsiveArray[i] = $responsiveSetting[i];
						
					}
	
				// Adding Class to instances
				$this.addClass('slick-carousel-'+index);		
				$this.parent().find('.slick-dots').addClass('dots-'+index);		
				$this.parent().find('.slick-btn').addClass('btn-'+index);
	
				if($spaceBetween != 0){
					$this.addClass('slick-gutter-'+$spaceBetween);
				}
				if($spaceBetween_xl != 0){
					$this.addClass('slick-gutter-xl-'+$spaceBetween_xl);
				}
				if($spaceBetween_lg != 0){
					$this.addClass('slick-gutter-lg-'+$spaceBetween_lg);
				}
				var $slideCount = null;
				$this.on('init', function(event, slick){
					$this.find('.slick-active').first().addClass('first-active');
					$this.find('.slick-active').last().addClass('last-active');
					$slideCount = slick.slideCount;
					if($slideCount <= $slidesToShow){
						$this.children('.slick-dots').hide();	
					}
					var $firstAnimatingElements = $('.slick-slide').find('[data-animation]');
					doAnimations($firstAnimatingElements);  
				});
	
				$this.slick({
					slidesToShow: $slidesToShow,
					slidesToScroll: $slidesToScroll,
					asNavFor: $asNavFor,
					autoplay: $autoplay,
					autoplaySpeed: $autoplaySpeed,
					speed: $speed,
					infinite: $infinite,
					arrows: $arrows,
					dots: $dots,
					adaptiveHeight: $adaptiveHeight,
					vertical: $vertical,
					focusOnSelect: $focusOnSelect,
					centerMode: $centerMode,
					centerPadding: $centerPadding,
					swipe: $swipe,
					swipeToSlide: $swipeToSlide,
					touchMove: $touchMove,
					draggable: $draggable,
					verticalSwiping: $verticalSwiping,
					variableWidth: $variableWidth,
					fade: $fade,
					appendArrows: $appendArrows,
					prevArrow: $prevArrow,
					nextArrow: $nextArrow,
					rtl: $rtl,
					responsive: $responsiveArray,
				});
	
				
	
				$this.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
					$this.find('.slick-active').first().removeClass('first-active');
					$this.find('.slick-active').last().removeClass('last-active');
					var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
					doAnimations($animatingElements);
				});
				function doAnimations(elements) {
					var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
					elements.each(function() {
						var $el = $(this);
						var $animationDelay = $el.data('delay');
						var $animationDuration = $el.data('duration');
						var $animationType = 'animated ' + $el.data('animation');
						$el.css({
							'animation-delay': $animationDelay,
							'animation-duration': $animationDuration,
						});
						$el.addClass($animationType).one(animationEndEvents, function() {
							$el.removeClass($animationType);
						});
					});
				}
	
				$this.on('afterChange', function(e, slick){
					$this.find('.slick-active').first().addClass('first-active');
					$this.find('.slick-active').last().addClass('last-active');
				});
	
				// Updating the sliders in tab
				$('body').on('shown.bs.tab', 'a[data-toggle="tab"], a[data-toggle="pill"]', function (e) {
					$this.slick('setPosition');
				});
			});
		}
	}


	// Button LightGallery JS
    var productThumb = $(".product-gallery__image img"),
        imageSrcLength = productThumb.length,
        images = [],
        indexNumbArray = [];

    for (var i = 0; i < productThumb.length; i++) {
        images[i] = {"src": productThumb[i].src};
    }
    $('.btn-zoom-popup').on('click', function (e) {
        $(this).lightGallery({
            thumbnail: false,
            dynamic: true,
            autoplayControls: false,
            download: false,
            actualSize: false,
            share: false,
            hash: true,
            index: 0,
            dynamicEl: images
        });
    });
    
	/**********************
	*Star Rating
	***********************/
	$('.stars a').on('click', function(e){
		e.preventDefault();
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	})


	/**********************
	*Tooltip
	***********************/

	$('[data-toggle="tooltip"]').tooltip();



	/* Masonary */
	function productMasonryActivation(){
		var $masonry = $('.masonry-produtct-layout');
		var $grid = $('.grid-item');
		$grid.hide();

		$masonry.imagesLoaded({
			background: true
		}, function () {
			$grid.fadeIn();
			$masonry.masonry({
				itemSelector: '.grid-item',
				layoutMode: 'fitRows',
				fitWidth: true,
				initLayout: true,
				stagger: 30,
			});
		});
	}

	function blogMasonryActivation(){
		var $masonry = $('.masonary-blog-layout');
		var $grid = $('.blog-item');
		$grid.hide();

		$masonry.imagesLoaded({
			background: true
		}, function () {
			$grid.fadeIn();
			$masonry.masonry({
				itemSelector: '.grid-item',
				columnWidth: '.grid-sizer',
				percentPosition: true
			});
		});
	}	

	

	/**********************
	*Price Slider
	***********************/
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 120,
		values: [ 0, 120 ],
		slide: function( event, ui ) {
			$("#amount").val("$" + ui.values[0] + "  $" + ui.values[1]);
		}
	});
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - " +
        "$" + $("#slider-range").slider("values", 1));


    $('.zoom').zoom();


	/**********************
	*Sticky Sidebar
	***********************/

    $('#sticky-sidebar').theiaStickySidebar({
      // Settings
      additionalMarginTop: 80
    });


    function productVariation(){
	    $('.variation-btn').on('click', function(e){
	    	e.preventDefault();
	    	var $attr = $(this).data('original-title');
	    	$(this).parents('.variation-wrapper').siblings().children().text($attr).css('opacity', '1');
	    	$('.reset_variations').css('display', 'block');
	    });

	    $('.reset_variations').on('click', function(e){
	    	e.preventDefault();
	    	$('.swatch-label strong').text('');
	    	$(this).css('display', 'none');
	    })
    }

    function airiAccordion(){
    	$('.accordion__link').on('click', function(e){
    		var $target =  $(this).data('target');
    		$($target).slideToggle(300);
    	});
    }


		/*================================
		    Newsletter Form JS
		==================================*/
        var subscribeUrl = $(".mc-form").attr('action');

        $('.mc-form').ajaxChimp({
            language: 'en',
            url: subscribeUrl,
            callback: mailChimpResponse
        });

        function mailChimpResponse(resp) {
            if (resp.result === 'success') {
                $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
                $('.mailchimp-error').fadeOut(400);
                $(".mc-form").trigger('reset');
            } else if (resp.result === 'error') {
                $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
                $('.mailchimp-success').fadeOut(400);
            }
        }




	/**********************
	*Initialization 
	***********************/

	$(window).on('load', function(){
		$('.ai-preloader').removeClass("active");
		productMasonryActivation();
		blogMasonryActivation();
	});

	$(document).ready(function(){
		elementCarousel();
		dropdownAnimation();
		customQantity();
		expandAction();
		expandShippingInfo();
		expandPaymentInfo();
		stickyHeader();
		popupClose();
		closeItems();
		toolbarExpand();
		closeNotice();
		clickDom();
		productVariation();
		airiAccordion();
		productFilterExpand()
	});



})(jQuery);
