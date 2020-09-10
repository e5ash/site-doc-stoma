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
		nextArrow: arrows.next
	});

	$('.reviews__list').slick({
		slidesToShow: 3,
		prevArrow: arrows.prev,
		nextArrow: arrows.next
	})

	$('.will-heal__list').slick({
		slidesToScroll: 2,
		slidesToShow: 2,
		prevArrow: arrows.prev,
		nextArrow: arrows.next
	});

	var imgs = {
		list: $('.imgs__list'),
		nav : $('.imgs__nav')
	}

	imgs.list.slick({
		fade: true,
		asNavFor: imgs.nav,
		prevArrow: arrows.prev,
		nextArrow: arrows.next
	});
	imgs.nav.slick({
		arrows: false,
		slidesToShow: 5,
		asNavFor: imgs.list,
		focusOnSelect: true
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
		appendArrows: certificates.arrows
	})


	$('.certs__list').slick({
		slidesToScroll: 4,
		slidesToShow: 4,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
	})

	$('.r-soc__list').slick({
		slidesToScroll: 4,
		slidesToShow: 4,
		prevArrow: arrows.prev,
		nextArrow: arrows.next,
	})

	$('.tabs').each(function(){
		var firstEl     = $(this).find('.tabs-nav li:first-of-type'),
				firstElItem = $(this).find('.tabs-item:first-of-type');

		firstEl.addClass(cls.selected);
		firstElItem.addClass(cls.selected);
		firstElItem.find('.price-list__body').slideDown(300);
	})


	$('.tabs-nav a').on('click', function(event) {
		event.preventDefault();
		var href = $(this).attr('href'),
				el = $(href),
				li = $(this).parents('li');


		li.addClass(cls.selected);
		li.siblings().removeClass(cls.selected);

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
});
