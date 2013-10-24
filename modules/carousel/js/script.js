/**

"Carousel"

*/

;(function(global, $) {
	'use strict';

	var act,

	MbCarousel = function(el) {
		this.target = el;
		this.control = this.target.find('.carousel-control');
	};

	MbCarousel.ACTIVE = false;

	MbCarousel.active = function(el, derect) {
		act = el.find('.active');
		        act.removeClass('active');

		switch(derect !== 'undefined' && derect) {
			case false:
				act.next().addClass('active');
				break;
			case true:
				act.prev().addClass('active');
				break;
			default:
				return false;
		}
	};

	MbCarousel.buttons = function(derect) {

		// TO DO
	};

	MbCarousel.move = function(el, num, derect) {
		if(MbCarousel.ACTIVE) {
			MbCarousel.active(el, derect);
		}

		MbCarousel.buttons(derect);

		el.stop().animate({
			'left': num + 'px'
		});
		return false;
	};

	MbCarousel.itLeft = function(opt) {
		var param = opt,
		    ulPos =  parseInt(param.ul.css('left'), 10),
		    stepDelta = Math.abs(param.ulWidth + ulPos - param.stepLen);

		if(ulPos === 0) {
			return false;
		}

		if((ulPos + param.stepLen) > 0 && (ulPos + param.stepLen) < param.stepLen) {
			MbCarousel.move(param.ul, ulPos + param.lastStep, true);
		}

		if((ulPos + param.stepLen) <= 0) {
			MbCarousel.move(param.ul, ulPos + param.stepLen, true);
		}
		return false;

	};

	MbCarousel.itRight = function(opt) {
		var param = opt,
		    ulPos =  parseInt(param.ul.css('left'), 10),
		    stepDelta = param.ulWidth + ulPos - param.stepLen;

			if(stepDelta > param.lastStep) {
				MbCarousel.move(param.ul, ulPos - param.stepLen, false);
			}
			if(param.stepLen > stepDelta && stepDelta > 0) {
				MbCarousel.move(param.ul, ulPos - param.lastStep, false);
			}
			return false;

	};

	MbCarousel.prams = function(el) {

		var	param = {};

	        param.li = $(el.find('.carousel__item')
				            .get(0)).outerWidth(true);
			param.ul = el.find('ul');
			param.len = param.ul.find('.carousel__item')
			                .length;
			param.step = parseInt(el.attr('data-item-num'), 10);
			param.ulWidth = param.li * param.len;
			param.delta   = param.len % param.step;
			param.stepLen = param.li * param.step;
			param.lastStep= param.delta * param.li;

		return param;
	};

	MbCarousel.prototype = {

		normalize: function() {
			var self = this;
			this.target.each(function(e) {
				var param = MbCarousel.prams($(this));
				param.ul.css('width', param.ulWidth + 30 + 'px');
				//self.target.find('.left').css('opacity', '.3');
			});
			this.target.show();

		},

		init: function() {
			var self = this, but;
			$(window).load(function(e) {
				self.normalize();
				self.control.on('click', function(e) {
					e.preventDefault();
					but = MbCarousel.prams($(this).parent('.carousel'));
					MbCarousel.ACTIVE = (but.ul.find('li').hasClass('active'))
			                    ? true : false;
					switch($(this).hasClass('left')) {
						case true:
							MbCarousel.itLeft(but);
							break;
						case false:
							MbCarousel.itRight(but);
							break;
						default:
							return false;
					}
				});
			});
		}
	}

	var mbCarousel = new MbCarousel($('.carousel'));
	mbCarousel.init();

}(this, jQuery));