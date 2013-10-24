/**

"MbCards"

*/

;(function(global, $) {
	'use strict';

	var MbCards = function(el) {
		this.target = el;
	};

	MbCards.DELTA = 0;
	MbCards.RIGHT = 0;
	MbCards.WIDTH = 0;
	MbCards.HEIGHT = 0;

	MbCards.itOver = function(el) {
		MbCards.RIGHT = parseInt(el.css('right'), 10);
		MbCards.WIDTH = parseInt(el.css('width'), 10);
		MbCards.HEIGHT = parseInt(el.css('height'), 10);

		el.css({
			top: -MbCards.DELTA + 'px',
			width: MbCards.WIDTH + MbCards.DELTA + 'px',
			height: MbCards.HEIGHT + MbCards.DELTA + 'px',
			right: MbCards.RIGHT - MbCards.DELTA + 'px'
		});
	};

	MbCards.itOut = function(el) {
		el.css({
			top: 0,
			width: MbCards.WIDTH + 'px',
			height: MbCards.HEIGHT + 'px',
			right: MbCards.RIGHT + 'px'
		});
	};

	MbCards.prototype = {
		cachEvt: function(e) {
			var evt = e.type,
			    targ = ($(e.target).get(0).tagName !== 'A')
						? $(e.target).parents('A')
						: $(e.target);

			switch(evt) {
				case 'mouseover':
					MbCards.itOver(targ)
					break;
				case 'mouseout':
					MbCards.itOut(targ)
					break;
				default:
					return false;
			}
		},

		init: function() {
			var self = this, pos = 0, len = 0;
			$(window).load(function(e) {
				MbCards.DELTA = parseInt(self.target.attr('data-delta'), 10);
				$(self.target.find('A').get().reverse()).each(function(e) {
					$(this).css({
						'right': pos + 'px',
						zIndex: e
					});
					pos += 5;
				});
				self.target.stop()
					.on('mouseover mouseout', function(e) {
						self.cachEvt(e);
					});
			});
		}
	}

	var mbCards = new MbCards($('.cards_js'));
	mbCards.init();

}(this, jQuery));