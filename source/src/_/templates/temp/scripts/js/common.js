$(document).ready(function() {


	var cls = {
		hidden   : '--hidden',
		toggle   : '--toggle',
		scroll   : '--scroll',
		unhover  : '--unhover',
		selected : '--selected',
		checked  : '--checked',
		show     : '--show',
		error    : '--error',
		hover    : '--hover'
	}

	var c = { // c - classes
		state: {
			active: 'active',
			filled: 'filled',
			valid: 'valid',
			error: 'error',
			focus: 'focus',
			checked: 'checked',
			required: 'required'
		},
		sElem: '__', // separator Element
		sMode: '_' // separator Modifier

	};
var input = {
		class: {
			block: 'input',
			area: 'area'
		},
		block: null,
		placeholder: null,
		area: null,
		value: null,
		Vars: function(block){
			this.block = block.parents('.' + this.class.block);
		},
		Filled: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				this.block.addClass(this.class.block + c.sMode + c.state.filled)
			}
			else {
				this.block.removeClass(this.class.block + c.sMode + c.state.filled)
			}
		},
		OnFocus: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.focus).removeClass(this.class.block + c.sMode + c.state.error);
		},
		UnFocus: function(block){
			this.block = block.parents('.' + this.class.block);
			this.block.removeClass(this.class.block + c.sMode + c.state.focus);
		},
		EventValid: function(block){
			this.Vars(block);
			this.block.removeClass(this.class.block + c.sMode + c.state.error);
			return 0;
		},
		EventValidError: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.error);
			return 1;
		},
		Validation: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				if (this.block.hasClass(this.class.block + '_phone')){
					if (this.value.length != 18){
						return this.EventValidError(block);
					}
					else{
						return this.EventValid(block);
					}
				}
				else{
					return this.EventValid(block);
				}
			}
			else {
				return this.EventValidError(block);
			}
		},
		Init: function () {
			this.area = '.' + input.class.block + c.sElem + input.class.area;
			$(window).on('load', function () {
				$('body').find(input.area).each(function () {
					input.Filled($(this));
				})
			});
			$(this.area).on('focusin', function () {
				input.OnFocus($(this));
			});
			$(this.area).on('focusout', function () {
				input.UnFocus($(this));
			});
			$(this.area).on('keyup', function () {
				input.Filled($(this));
			});
			$('.' + this.class.block + '_phone ' + this.area).mask('+7 (000) 000-00-00'); // phone mask
		}
	};

	var textarea = {
		class: {
			block: 'textarea',
			area: 'area'
		},
		block: null,
		placeholder: null,
		area: null,
		value: null,
		Vars: function(block){
			this.block = block.parents('.' + this.class.block);
		},
		Filled: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				this.block.addClass(this.class.block + c.sMode + c.state.filled)
			}
			else {
				this.block.removeClass(this.class.block + c.sMode + c.state.filled)
			}
		},
		OnFocus: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.focus).removeClass(this.class.block + c.sMode + c.state.error);
		},
		UnFocus: function(block){
			this.block = block.parents('.' + this.class.block);
			this.block.removeClass(this.class.block + c.sMode + c.state.focus);
		},
		EventValid: function(block){
			this.Vars(block);
			this.block.removeClass(this.class.block + c.sMode + c.state.error);
			return 0;
		},
		EventValidError: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.error);
			return 1;
		},
		Validation: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				return this.EventValid(block);
			}
			else {
				return this.EventValidError(block);
			}
		},
		Init: function () {
			this.area = '.' + textarea.class.block + c.sElem + textarea.class.area;
			$(window).on('load', function () {
				$('body').find(textarea.area).each(function () {
					textarea.Filled($(this));
				})
			});
			$(this.area).on('focusin', function () {
				textarea.OnFocus($(this));
			});
			$(this.area).on('focusout', function () {
				textarea.UnFocus($(this));
			});
			$(this.area).on('keyup', function () {
				textarea.Filled($(this));
			});
		}
	};


	var check = {
		class: {
			block: 'check',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('input');
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == 'checked'){
				this.block.addClass('--checked')
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.input.attr('checked', 'checked');
				this.block.addClass('--checked');
			}
			else {
				this.input.removeAttr('checked');
				this.block.removeClass('--checked');
			}

		},
		Init: function () {
			this.input = '.' + check.class.block + ' input';
			$(window).on('load', function () {
				$('body').find('.' + check.class.block).each(function () {
					check.Filled($(this));
				})
			});
			$('.' + check.class.block).on('click', function () {
				check.Click($(this));
			});
		}
	};


	check.Init();

	$('.input.--phone .input__area').mask('+7 (000) 000-00-00');

	function valueElementForm(nameElement, nameBlock) {
		var newNameElement = '.' + nameElement;
			element = $(newNameElement);
		element.each(function(index, el) {
			var elementInput = $(this).find($(nameBlock)),
				elementLabel = $(this).find($('label')),
				elementValue = index + 1;
			elementInput.attr('id', nameElement + '-' + elementValue);
			elementLabel.attr('for', nameElement + '-' + elementValue);
		});

	}
	valueElementForm('input', 'input');
	valueElementForm('textarea', 'textarea');


	var arrows = {
		prev: '<button type="button" class="slick-arrow slick-prev"><svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 180 180"><use xlink:href="upload/sprite.svg#icon-chevron-right-gray"></use></svg><svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 180 180"><use xlink:href="upload/sprite.svg#icon-chevron-right-white"></use></svg></button>',
		next: '<button type="button" class="slick-arrow slick-next"><svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 180 180"><use xlink:href="upload/sprite.svg#icon-chevron-right-gray"></use></svg><svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 180 180"><use xlink:href="upload/sprite.svg#icon-chevron-right-white"></use></svg></button>',
	}
	$('.r-videos__list').slick({
		fade: true,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,

	});

	$('.reviews__list').slick({
		slidesToShow: 3,
		adaptiveHeight: true,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					swipe: true
				}
			}
		]
	})

	$('.will-heal__list').slick({
		slidesToScroll: 2,
		slidesToShow: 2,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 1,
					swipe: false,
					touchMove: false,
				}
			}
		]
	});

	var imgs = {
		list: $('.imgs__list'),
		nav : $('.imgs__nav')
	}

	imgs.list.slick({
		fade: true,
		asNavFor: imgs.nav,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					fade: false,
					swipe: true,
			    arrows: false,
			    infinite: false,
			    variableWidth: true,
			    adaptiveHeight: true,
			    focusOnSelect: true,
				}
			}
		]
	});
	imgs.nav.slick({
		arrows: false,
		slidesToShow: 5,
		asNavFor: imgs.list,
		focusOnSelect: true,

	});


	var certificates = {
		list  : $('.certificates__list'),
		arrows: $('.certificates__chevrons')
	}

	certificates.list.slick({
		slidesToScroll: 2,
		slidesToShow: 2,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
		appendArrows: certificates.arrows,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 1
				}
			}
		]
	})


	$('.certs__list').slick({
		slidesToScroll: 4,
		slidesToShow: 4,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToScroll: 3,
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					infinite: false,
					slidesToScroll: 1,
					slidesToShow: 1,
					variableWidth: true
				}
			}
		]
	})

	$('.r-soc__list').slick({
		slidesToScroll: 4,
		slidesToShow: 4,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToScroll: 2,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 1,
					swipe: true,
				}
			}
		]
	})

	var portfolio = {
		list  : $('.portfolio__list'),
		arrows: $('.portfolio__arrows')
	}
	portfolio.list.slick({
		fade: true,
		appendArrows: portfolio.arrows,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
	})

	$('.tabs').each(function(index){
		var firstEl     = $(this).find('.tabs-nav li:first-of-type'),
				firstElItem = $(this).find('.tabs-item:first-of-type');

		firstEl.attr('data-tabs-group', index);
		firstEl.siblings().attr('data-tabs-group', index);
		firstEl.addClass(cls.selected);
		firstElItem.addClass(cls.selected);
		firstElItem.find('.price-list__body').slideDown(300);
	})


	$('.tabs-nav a').on('click', function(event) {
		event.preventDefault();
		var href = $(this).attr('href'),
				el = $(href),
				li = $(this).parents('li');
				group = li.attr('data-tabs-group');


		$('.tabs-nav li[data-tabs-group =  '+ group +']').removeClass(cls.selected);
		li.addClass(cls.selected);

		if (href.indexOf('price-list-item-all') >= 0) {
			var tabsItem = $(this).parents('.tabs').find('.tabs-item');
			tabsItem.addClass(cls.selected);
			tabsItem.find('.price-list__body').slideDown(300);

			var id  = '#price-list';
		} else{
			el.addClass(cls.selected);
			el.siblings().removeClass(cls.selected);
			el.find('.price-list__body').slideDown(300);
			el.siblings().find('.price-list__body').slideUp(300);
			var id  = href;
		}

		setTimeout(function () {
			if(id.charAt(0) == '#'){
				event.preventDefault();
				var top = $(id).offset().top;
				$('body,html').animate({scrollTop: top}, 500);
			}
		}, 350);

		
	});


	$('.price-list__head').on('click', function () {
		$(this).parents('.price-list__item').toggleClass(cls.selected);
		$(this).siblings('.price-list__body').slideToggle(300);
	})

	$('[data-show]').each(function(index, el) {
		var count = $(this).attr('data-show'),
				el    = $($(this).attr('data-el'));
		if (el > count) {
			el.each(function(itemIndex, el) {
				if (itemIndex > 3) {
					$(this).hide();
				}
			});
		}
	});

	$('.more-btn').on('click', function () {
		var list = $(this).siblings('[data-el]');
				el   = $(list.attr('data-el'));

		el.slideDown(300);
		$(this).hide();
	})

	$('.portfolio__show').on('click', function() {
		$(this).siblings('.portfolio__img').removeClass('--blur');
		$(this).toggleClass(cls.hidden);
	});





	function formElementError(el){
		el.addClass('--error');
		return 1;
	}

	$('body').on('click', 'form button', function(event) {
		event.preventDefault();
		var form          = $(this).parents('form'),
				requiredItems = form.find('.--required'),
				errorsCount   = 0,
				value         = null;

		requiredItems.each(function(index, el) {
			if ($(this).hasClass('input')) {
				value = $(this).find('input').val();
				if (value == '' || value == undefined)
					errorsCount += formElementError($(this));
				if ($(this).hasClass('--phone') && value.length < 18) {
					errorsCount += formElementError($(this));
				}
			}
			if ($(this).hasClass('textarea')) {
				value = $(this).find('textarea').val();
				if (value == '' || value == undefined)
					errorsCount += formElementError($(this));
			}
			if ($(this).hasClass('checkbox')) {
				value = $(this).find('input').attr('checked');
				if (value != 'checked')
					errorsCount += formElementError($(this));
			}
		});

		console.log(errorsCount);

		if (errorsCount == 0) {
			form.submit();
			window.location = 'thanks.html'
		}
	});


	const urlParams = new URLSearchParams(location.search);

	function getUtm(name){
		var href = location.search.slice(name, '&');
		return urlParams.get(name);
	}

	$('form').each(function(index, el) {
		var formName     = $(this).attr('data-form-name'),
				utm_source   = getUtm('utm_source'),
				utm_medium   = getUtm('utm_medium'),
				utm_campaign = getUtm('utm_campaign'),
				utm_term	   = getUtm('utm_term'),
				utm_content  = getUtm('utm_content');

		$(this).append('<input type="hidden" name="page" value="' + document.title + '">');
		$(this).append('<input type="hidden" name="url" value="' + location.origin + location.pathname + '">');

		if(formName)
			$(this).append('<input type="hidden" name="form" value="' + formName + '">');
		if(utm_source)
			$(this).append('<input type="hidden" name="utm_source" value="' +   utm_source + '">');
		if(utm_medium)
			$(this).append('<input type="hidden" name="utm_medium" value="' +   utm_medium + '">');
		if(utm_campaign)
			$(this).append('<input type="hidden" name="utm_campaign" value="' + utm_campaign + '">');
		if(utm_term)
			$(this).append('<input type="hidden" name="utm_term" value="' +     utm_term + '">');
		if(utm_content)
			$(this).append('<input type="hidden" name="utm_content" value="' +  utm_content + '">');
	});


	var mPanel = $('.m-panel');
	$(window).on('load resize scroll', function () {
		if ($(window).scrollTop() > 0) {
			mPanel.addClass(cls.scroll);
		} else{
			mPanel.removeClass(cls.scroll);
		}
	})

	var nav = $('.header'),
			hum = $('.m-panel__btn.--hum');

	hum.on('click', function () {
		hum.toggleClass(cls.toggle)
		nav.toggleClass(cls.toggle)
		mPanel.toggleClass(cls.toggle)
	})



  var swiper = {
  	desc: $('.desc__list'),
  	services: $('.services__list'),
  	rating: $('.rating__list'),
  	team: $('.team__list'),
  	priceList: $('.price-list__nav ul'),
  	rBook: $('.r-book__list'),
  	shares: $('.shares__list'),
  	problems: $('.problems__list'),
  	braces: $('.braces__list'),
  	implants: $('.implants__list'),
  	full: $('.full__list'),
  	solutions: $('.solutions__list'),
  	types: $('.types__list'),
  	process: $('.process__list'),
  	do: $('.do__list'),
  }
  var settings = {
    variableWidth: true,
    swipe: true,
    arrows: false,
    infinite: false
  }
  slick_on_mobile( swiper.desc, settings);
  slick_on_mobile( swiper.services, settings);
  slick_on_mobile( swiper.rating, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.team, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.rBook, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.problems, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  
  slick_on_mobile( swiper.braces, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.implants, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.full, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.solutions, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.types, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.process, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.do, {
  	swipe: true,
    arrows: false,
    infinite: false,
    adaptiveHeight: true
  });
  slick_on_mobile( swiper.shares, settings);
  slick_on_mobile( swiper.priceList, settings);

  function slick_on_mobile(slider, settings){
    $(window).on('load resize', function() {
      if ($(window).width() > 992) {
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        return
      }
      if (!slider.hasClass('slick-initialized')) {
        return slider.slick(settings);
      }
    });
  };

  $('.toltip').on('click', function () {
  	var text = $(this).find('.toltip__text');
  	text.slideToggle(300);
  	$(this).toggleClass(cls.toggle);
  })

  $(window).on('load resize', function() {
    if ($(window).width() > 992) {
    	$('.toltip').removeClass(cls.toggle);
    	$('.toltip__text').removeAttr('style');
    }
  });
});
