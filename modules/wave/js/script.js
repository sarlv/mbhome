/**

"MbWave"

*/

;(function(global, $) {
	'use strict';

	var targ, el, sp, len, i = 0,
	
	MbWave = function(el) {
		this.el = el;
		this.target = el.find('ul');
	};

	MbWave.SPEED = 100;

	MbWave.itOver = function(t, e) {
		targ = t, el = e, sp = MbWave.SPEED;

		targ.stop().animate({
			top: '-8px'
		}, sp);

		el[0].stop().animate({
			top: '-5px'
		}, sp);

		el[1].stop().animate({
			top: '-5px'
		}, sp);
	};

	MbWave.itOut  = function(t, e) {
		var targ = t, el = e, i = 0, len = el.length, sp = MbWave.SPEED;

		targ.stop().animate({
				top: '0'
			}, sp);
		for(; i < len; i += 1) {
			el[i].stop().animate({
				top: '0'
			}, sp);
		}
	};

	MbWave.prototype = {
		cachEvt: function(e) {
			var evt = e.type,
			    targ = ($(e.target).get(0).tagName !== 'LI')
						? $(e.target).parents('li')
						: $(e.target),
			el = [targ.prev(), targ.next()];
			
			switch(evt) {
				case 'mouseover':
					MbWave.itOver(targ, el);
					break;
				case 'mouseout':
					MbWave.itOut(targ, el);
					break;
				default:
					return false;
			}

		},

		init: function() {
			var self = this;
			$(window).load(function(e) {
				MbWave.SPEED = parseInt(self.el.attr('data-speed'), 10)
				               || MbWave.SPEED;
				self.target
					.on('mouseover mouseout', function(e) {
						self.cachEvt(e);
					});
			});
		}
	}

	var mbWave = new MbWave($('.wave'));
	mbWave.init();

}(this, jQuery));