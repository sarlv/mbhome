/**

"MbTooltip"

*/

;(function(global, $) {
	'use strict';

	var MbTooltip = function(el) {
		this.target = el;
	};

	MbTooltip.itOver = function(el) {
        el.find('.tooltip').stop().css('display', 'block');
	};

	MbTooltip.itOut = function(el) {
		el.find('.tooltip').stop().css('display', 'none');
	};

	MbTooltip.prototype = {
		cachEvt: function(e) {
			var evt = e.type,
			    targ = ($(e.target).get(0).tagName !== 'LI')
						? $(e.target).parents('li')
						: $(e.target);

			switch(evt) {
				case 'mouseover':
					MbTooltip.itOver(targ);
					break;
				case 'mouseout':
					MbTooltip.itOut(targ);
					break;
				default:
					return false;
			}
		},

		init: function() {
			var self = this;
			$(window).load(function(e) {
				
				self.target
					.on('mouseover mouseout', function(e) {
						self.cachEvt(e);
					});
			});
		}
	}

	var mbTooltip = new MbTooltip($('.tooltiptarg'));
	mbTooltip.init();

}(this, jQuery));